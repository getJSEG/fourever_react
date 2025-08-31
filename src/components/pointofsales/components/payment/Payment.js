// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { formatCurrecy } from "../../../../utils/currencyFormatter";
import { useCheckoutMutation } from "../../../../features/pos/posApiSlice";

import PaymentTypeSelectors from "./PaymentTypeSelectors";
import Cash from "./PaymentType.js/Cash";
import CreditCard from "./PaymentType.js/CreditCard";
import BrankTranfer from "./PaymentType.js/BrankTranfer";

// API CALLS
// orderSummary
const Payment = ({ order, shoppingCart, grandTotal, paymentWindowHandler, errorMessageHandler}) => {

    const navigate = useNavigate();
    
    const [paymentTabs, setPaymentTabs] = useState([{"cash":"EFECTIVO"},  {"bank_transfer":"TRANSFERENCIA"}, {"credit_card":"TARGETA CC"}]);
    const [paymentData, setPaymentData] = useState({});
    const [paymentType, setPaymentType] = useState('cash');

    const [paymentDetails, setPaymentDetails] = useState({});
    const [amountReceived, setAmountReceived] = useState({});
    const [customerDetails, setCustomerDetails] = useState({});
    const [isDisable, setIsDisable] = useState(true);

    const [checkout, { isLoading }] = useCheckoutMutation();

    useEffect( () => {
        setPaymentData({...order, "OrderLine":shoppingCart})
    }, [order]);


    // Updating payment details
    useEffect( () => {
        
        setPaymentData(prevObject => {
            let objectCopy = prevObject

            if(paymentType === "cash") {
                const fieldsToRemove = ['ccPayment', 'btPayment'];
                fieldsToRemove.forEach(field => { delete objectCopy[field]; });
                
                objectCopy.cashPayment = paymentDetails
            }else if (paymentType === "credit_card") {

                const fieldsToRemove = ['cashPayment', 'btPayment'];
                fieldsToRemove.forEach(field => { delete objectCopy[field]; });
                objectCopy.ccPayment = paymentDetails

            }else if (paymentType === "bank_transfer") {

                const fieldsToRemove = ['cashPayment', 'ccPayment'];
                fieldsToRemove.forEach(field => { delete objectCopy[field]; });

                objectCopy.btPayment = paymentDetails
            }

            return objectCopy
        });

        console.log(paymentData)
    }, [paymentDetails]);

    // Updating cutomer details
    useEffect( () => {
        if(customerDetails?.name !== null || customerDetails?.name !== "")
            setPaymentData(prevObject => ({...prevObject, "customerInfo":customerDetails}));
            // setPaymentData({...orderSummary, "customerInfo":customerDetails})
    }, [customerDetails]);


    const handlePaymentType = (e,type) => {
        setPaymentType(type)
    }

    const handlePaymentDetail= (paymentDetail) => {
        setPaymentDetails({...paymentDetail})
    }

    const handleCustomerDetails = (customerDetail) => {
        setCustomerDetails({...customerDetail})
    }

    const amountReceivedHandler = ( amount) => {
        setAmountReceived(amount)
    }

    // TODO: if the number is 12 o any number is does not validte
    const onSubmitPayment = async (e) => {
        e.preventDefault();
        // submit payment here
        console.log(paymentData)
        try{
            const receiptData = await checkout(paymentData).unwrap()
            navigate('/receipt', { state: {receiptData}});
        }catch(error) {
            const err = error?.data?.message
            
            if(err) {
                errorMessageHandler(err);
            }else{
                errorMessageHandler(JSON.stringify(error?.data));
            }
        }
    }

    // When unmounting
    useEffect( () => {
        return( () => {
            setPaymentDetails({});
            setPaymentData({});
            setCustomerDetails({});
            setAmountReceived(0);
        })
    }, []);

    useEffect( () => {
        parseFloat(amountReceived) >= parseFloat(order?.totalAmount)
        ? setIsDisable(false) 
        : setIsDisable(true) 

    }, [amountReceived]);

    
    return (
        <div className="payment-box">

            <div className="payment-form-wrapper">
                <div onClick={ () => paymentWindowHandler(false) } className="payment-pop-form-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <div>
                    <label htmlFor="total-price">Total a Pagar:</label>
                    <h2  className="total-price"> { formatCurrecy(order?.totalAmount) } </h2>
                </div>
                    
                <div className="payment-selector">
                    <div className="payment-selector title">
                        <p> Metodo de Pago: </p>
                    </div>

                    <div className="payment-btn-selector"> 
                        {
                            paymentTabs?.map( (value, index) => (
                                <PaymentTypeSelectors 
                                    handlePaymentType={ handlePaymentType } 
                                    key={index} 
                                    spa={Object.values(value)[0]}
                                    engl={Object.keys(value)[[0]]}
                                    paymenType={paymentType}
                                />
                            ) )
                        }
                    </div>
                </div>

                <form onSubmit={ e => onSubmitPayment(e) }  className="payment-form">

                    {
                        paymentType === 'cash' && <Cash  grandTotal={ order?.totalAmount } 
                                                         amountReceived={amountReceivedHandler}
                                                         handlePaymentDetail = { handlePaymentDetail } />
                    }

                    { paymentType === "credit_card" && <CreditCard  grandTotal = { order?.totalAmount }
                                                                    handlePaymentDetail = { handlePaymentDetail }
                                                                    handleCustomerDetails = { handleCustomerDetails }
                                                                    amountReceived={amountReceivedHandler}/>     
                    }

                    { paymentType === "bank_transfer" &&  <BrankTranfer grandTotal = { order?.totalAmount }
                                                                        handlePaymentDetail = { handlePaymentDetail }
                                                                        handleCustomerDetails = { handleCustomerDetails }
                                                                        amountReceived={amountReceivedHandler}  /> 
                           
                    }


                    <button className="finalize-transaction" disabled={ isDisable } type='submit'>
                        PAGAR 
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Payment;
