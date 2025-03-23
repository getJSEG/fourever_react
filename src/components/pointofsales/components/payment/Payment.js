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

const Payment = ({ handlePaymentWindow, orderSummary, shoppingCart, grandTotal}) => {

    const navigate = useNavigate();
    
    const [paymentTabs, setPaymentTabs] = useState([{"cash":"EFECTIVO"},  {"bank_transfer":"TRANSFERENCIA"}, {"credit_card":"TARGETA CC"}]);
    const [paymentData, setPaymentData] = useState({});
    const [paymentType, setPaymentType] = useState('cash');

    const [paymentDetails, setPaymentDetails] = useState({});
    const [customerDetails, setCustomerDetails] = useState({});
    const [isDisable, setIsDisable] = useState(true);

    const [checkout, { isLoading }] = useCheckoutMutation();

    useEffect( () => {
        setPaymentData({...orderSummary, "items":shoppingCart})
    }, [orderSummary]);

    // Updating payment details
    useEffect( () => {
        setPaymentData(prevObject => ({...prevObject, "paymentInfo":paymentDetails}));
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

    // console.log(customerDetails)

    // Check paymane Type
    // sent the 
    // const [paymentAmount, setPaymentAmount] = useState(0);
    // const [paymentInfo, setPaymentInfo] = useState({});
    // const [paymentType, setPaymentType] = useState("");
    // const [mainPaymentOption, setMainPainmentOption] = useState("");

    // const [paymentData, setPaymentData] = useState({}); // payment Data
    // const [customerInfo, setCustomerInfo] = useState({}); // transfer and credit card

    // // This variable set an amonut limit before axtra inforrmation is required when customer uses a Craedit or debit card
    // const [totalAmountLimit, setTotalAmountLimit] =  useState(200)

    // // AlertMessages
    // const [message, setMessage] = useState("");
    // const [isError, setIsError] = useState(false);

    // // cash information required
    // const [change, setChange] = useState(0);

    // // cc and tranfer info required
    // const [formData, setFormData] = useState({ lastDigits: "", transactionCode: "", customerName: "", transId: "", dui: ""});
    // const {lastDigits, transactionCode, customerName, transId, dui} = formData;
    // // Set the form info
    // const handleTransInfo = (name, value) => { setFormData({...formData, [name]: value});}
    // // Clear form if the user changes tabs
    // const ClearForm = (name) => { name?.map( item => setFormData({[item]: ""}) ); }

    // // This Enbles or Disables Payment Button
    // const [isDisabled, setIsDisabled] = useState(false);

    // // This handles payment Tabs
    // const handlePaymentType = (event, value) => {
    //     event.preventDefault();

    //     const itemSelected = value.trim().toLowerCase().replace(' ', '')

    //     setMainPainmentOption(value);

    //     if(itemSelected !== "efectivo"){
    //         setPaymentAmount(grandTotal);   
    //         setChange(0);
    //     }

    //     switch(itemSelected) {
    //         case 'efectivo':
    //             setPaymentType("cash");
    //             ClearForm(["lastDigits", "transactionCode", "customerName", "transId", "dui"])
    //             break;
    //         case 'targetacc':
    //             setPaymentType("credit_card");
    //             ClearForm([ "customerName", "transId"]);
    //             break;
    //         case 'transferencia':
    //             setPaymentType("bank_transfer");
    //             ClearForm(["lastDigits", "transactionCode"]);
    //             break;
    //     }
    // }
    // // Get num pad input and display it in the UI
    // const handlePaymentAmount = (amount) => { setPaymentAmount(amount); }
   
    // // calculate change
    // useEffect( () => { setChange(paymentAmount - grandTotal); }, [paymentAmount, change])

    // // This handle if variable state is empty or undefine dont added to the object for final payment
    // const handleAddingObjItem = (item) => {
    //     if(item === "" || item === undefined )
    //         return false;
    //     return true
    // }
    // // This handles the Object creation for payment Info and Customer information
    // const handlePaymentDetails = () => {
    //     setPaymentInfo({
    //         ...( handleAddingObjItem(paymentType) && {"payment_type": paymentType.toLowerCase()}),
    //         "currency": "USD",
    //         ...(handleAddingObjItem(lastDigits) && { "cc_last_digits": lastDigits }),
    //         ...(handleAddingObjItem(transactionCode)  && { "transaction_id": transactionCode}),
    //         "TotalReceived": parseFloat(paymentAmount) || 0,
    //         ...(handleAddingObjItem(transId) && { "bank_transfer_code": transId})
    //     })

    //     setCustomerInfo({
    //         ...( handleAddingObjItem(customerName) && { "name": customerName }),
    //         ...( handleAddingObjItem(dui) && { "dui": dui }),
    //     })
    // }
    // // This Handles the object creation for the product list and value
    // const handletransactionInformation = () => {

    //     setPaymentData({
    //         ...( Object.keys(paymentInfo).length !== 0 && { "paymentInfo": paymentInfo }),
    //         ...( Object.keys(customerInfo).length !== 0 && { "customerInfo":customerInfo }),
    //         "discount": Number(discount.toFixed(2)),
    //         "taxes": Number(itemsTax.toFixed(2)),
    //         "includeTaxes": isPreTaxed,
    //         "includeDiscount": discount >= 0 ? true : false,
    //         "subtotal": subtotal,
    //         "grandTotal": grandTotal,
    //         "items": shoppingCartItems,
    //     })
    // }

    // // Update the Payment Details 
    // useEffect( () => {
    //     handlePaymentDetails();
    // },[paymentAmount, paymentType, customerName, lastDigits, transId, transactionCode]);

    // // Update the Transaction 
    // useEffect( ()=> {
    //     handletransactionInformation();
    // }, [paymentInfo, customerInfo, paymentAmount, grandTotal, discount,
    //     subtotal, shoppingCartItems, isPreTaxed, itemsTax ])

    
    // // When  payment is submitted this i double checking the if rmation before sending to back end
    // const handleSubmitPayment = () => {
    //     if(paymentAmount === undefined) return false;
    //     if(paymentAmount < grandTotal ){
    //         handleAlertMessage("Por favor ingrese el monto a pagar", true);
    //         return false;
    //     }
        
    //     // if credit card
    //     if(paymentType.toLocaleLowerCase() === "credit_card"){
    //         if(lastDigits.length !== 4){
    //             handleAlertMessage("Porfavor Entra los ultimos 4 digitos de la targeta", true);
    //             return false;
    //         }
    //         if(transactionCode.length <= 4){
    //             handleAlertMessage("Porfavor Entra condigo de Transaction, min 6 digitos", true);
    //             return false;
    //         }
    //         if(grandTotal > 200) {
    //             if(dui === ""){
    //                 handleAlertMessage(`Tienes que entrar el DUI O Documento de ID con vetas mayor de $${totalAmountLimit}`, true);
    //                 return false;
    //             }
    //             if(customerName  === ""){
    //                 handleAlertMessage(`Nombre del Cliente requerido con ventar mayor a $${totalAmountLimit}`, true);
    //                 return false;
    //             }
    //         }
    //     }

    //     if(paymentType.toLocaleLowerCase() === "bank_transfer") {
    //         if(transId === ""){
    //             handleAlertMessage("ID de transaccion requerido", true);
    //             return false;
    //         }
    //         if(customerName === ""){
    //             handleAlertMessage("Nombre del cliente requerido", true);
    //             return false;
    //         }

    //     }
    //     return true
    // }
    // // Submits the payment

    // TODO: if the number is 12 o any number is does not validte
    const onSubmitPayment = async (e) => {
        e.preventDefault();
        // submit payment
        console.log(paymentData)
        try{
            const receiptData = await checkout(paymentData).unwrap()

            navigate('/receipt', { state: {receiptData}});

        }catch(error) {
            const err = error?.data?.message
            
            if(error?.data?.message) {
                console.log(err)
            }else{
                console.log('something went wrong')
            }
        }
    }

    // When unmounting
    useEffect( () => {
        return( () => {
            setPaymentDetails({});
            setPaymentData({});
            setCustomerDetails({})
        })
    }, []);

    // // Handle Alert messages
    // const handleAlertMessage = (msg, isErr) => {
    //     setMessage(msg);
    //     setIsError(isErr);
    // }

    // // Redirects if payment is successful
    // useEffect( ()=> {
    //     if(paymentSuccess) { navigate("/receipt"); }
    // }, [paymentSuccess]);


    // // Remove Alert After a time
    // useEffect( ()=> {
    //     if(message !== ""){
    //         const timeout = setTimeout(() => {
    //             handleAlertMessage("", false);
    //         }, 5000); // 5 seconds
    //         return () => clearTimeout(timeout);
    //     }
    // }, [message]);


    // // When Unmount reset state
    // useEffect( () => {
    //     return()=> {
    //          handleAlertMessage("", false);
    //          setPaymentData({});
    //          setPaymentInfo({});
    //          setCustomerInfo({});
    //          setPaymentAmount(0);
    //     }
    //  }, []);

    useEffect( () => {
        Number(paymentDetails?.TotalReceived) >= Number(orderSummary?.grandTotal)
        ? setIsDisable(false) 
        : setIsDisable(true) 
    }, [isDisable, orderSummary?.grandTotal, paymentDetails?.TotalReceived])

    return (
        <div className="payment-box">

            <div className="payment-form-wrapper">
                <div onClick={ () => handlePaymentWindow(false) } className="payment-pop-form-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <div>
                    <label htmlFor="total-price">Total a Pagar:</label>
                    <h2  className="total-price"> { formatCurrecy(orderSummary?.grandTotal) } </h2>
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
                        paymentType === 'cash' 
                        ? <Cash 
                            grandTotal={grandTotal} 
                            handlePaymentDetail = { handlePaymentDetail }
                        />
                        : null
                    }

                    { paymentType === "credit_card" 
                            ? <CreditCard 
                                grandTotal = { orderSummary?.grandTotal }
                                handlePaymentDetail = { handlePaymentDetail }
                                handleCustomerDetails = { handleCustomerDetails }
                            />     
                            : null 
                    }

                    { paymentType === "bank_transfer" 
                        ? ( <BrankTranfer 
                                grandTotal = { orderSummary?.grandTotal }
                                handlePaymentDetail = { handlePaymentDetail }
                                handleCustomerDetails = { handleCustomerDetails }
                            /> 
                          ) 
                        : null 
                    }


                    <button className="finalize-transaction" disabled={isDisable} type='submit'>
                        PAGAR 
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Payment;
