// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

// API CALLS
import  { checkout } from '../../actions/POSSystem/POSCheckout.js'; 
// TODO: ALLOW ONLY NUMBERS IN THE NIPUT FIELD 
// TODO: ALLOW ONLY FULL DIGITS FOR THE INFOR FIELD
// TOOD: ALLOW ONLY 2 DECIMAL PLACES FOR SUBTOTAL
// TODO: CHECK IF SUBTOTTAL IS NULL AND REPLACE IT TO (0.00)

const Payment = ({ checkout, checkoutInfo, handleCheckout, subtotal, grandTotal, discount, itemsTax, shoppingCartItems }) => {

    const [amountPaid, setamountPaid] = useState(0)
    const [change, setChange] = useState(0)
    const [paymentType, setPaymentType] = useState("")
    const [authCode, setAuthcode] = useState("")
    const [CashInput, setCashInput] = useState("")
    const [authCodeDisplay, setAuthCodeDisplay] = useState("")
    

    const handlePaymentType = (e) => {
        setPaymentType(e.target.value)

        if(e.target.value === "CASH"){
            setCashInput("display-cash-input")
        }else{
            setCashInput("undisplay-cash-input")
            setamountPaid(0)
        }

        if(e.target.value === "EFT" || e.target.value === "CREDIT"){
            setAuthCodeDisplay("display-auth-code-input")
        }else{
            setAuthCodeDisplay("undisplay-auth-code-input")
        }
    }

    const handleAuthCode = (e) => {
        setAuthcode(e.target.value)
    }

    const handlePayment = (e) => {
        setamountPaid(e.target.value)
        console.log(shoppingCartItems)
        // checkout()
    }
   
    useEffect( () => {
        if(paymentType === "" || paymentType === "default" ){
            setAuthCodeDisplay("undisplay-auth-code-input")
            setCashInput("undisplay-cash-input")
            setamountPaid(0)
        }
        
    }, [paymentType])

    useEffect( () => {
        setChange(parseFloat(amountPaid - grandTotal).toFixed(2))
    },[amountPaid]);




    const onSubmitPayment= (e) => {
        e.preventDefault()

        if(amountPaid >= grandTotal ) {
            const data = {
                "items":shoppingCartItems,
                "payment_type": paymentType,
                "discount": discount,
                "taxes":itemsTax,
                "subtotal": subtotal,
                "order_total_price": grandTotal,
                "order_total_paid": amountPaid,
                "location_id":"bb3a10e7-c0da-4f0e-8bbb-4b8ddc017506",
                "currency":"USD",
                "customer_email": "elmergonzalez712@gmail.com"
            }

            console.log("this submits the payment as JSON")

        }
        else{
            console.log("please enter amount")
        }
    }

    return (
        <div className="payment-box">
            <div className="payment-form-wrapper">
                <div onClick={ handleCheckout } className="payment-pop-form-close-btn">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </div>
                <h4 className="payment-form-title"> Terminal de Pago </h4>

                <form onSubmit={ e => onSubmitPayment(e) }  className="payment-form">
                    
                    <label htmlFor="payment-selector">Metodo de Pago:</label>
                    
                    <select name="payment-type" 
                            className="payment-selector"
                            value={paymentType}
                            onChange={handlePaymentType}
                        >
                        <option value="default"> </option>
                        <option value="CASH"> Efectivo </option>
                        <option value="EFT"> Transferencia Bancaria </option>
                        <option value="CREDIT"> Tarjeta de Credito (DESCONECTADA) </option>
                    </select>
                   
                    <label htmlFor="total-price">Total a Pagar:</label>
                    <input  className="total-price" 
                            defaultValue = { `$${ parseFloat(grandTotal).toFixed(2)}` } 
                            autoComplete="off"
                            placeholder="$0.00"
                            />

                    <label className={` ${CashInput}` } htmlFor="total-price">Cantidad Recibida</label>
                    <input id="pos-cash-input" className={`total-price ${CashInput}` } 
                            value= {amountPaid}
                            onChange = { e => handlePayment(e)  }
                            autoComplete="off"
                            placeholder="$0.00"
                    />

                    <div className={`pos-change-due ${CashInput}`}> 
                        <h6 >{ change < 0 ? null : `CAMBIO: $ ${change}`} </h6>
                    </div>

                    {/* This is going to be name for the auth code */}

                    {/* Transferecia o CC */}
                    <label className={`${authCodeDisplay}`} htmlFor="total-price">Código de Autorización:</label>
                    <input className={`Auth-code ${authCodeDisplay}`} 
                            value= {authCode}
                            onChange={ e => { handleAuthCode(e) }}
                            autoComplete="off"
                            placeholder="Codigo de oagi Final"
                    />

                    <button className="finalize-transaction" type='submit'>
                        PAGAR 
                    </button>
                </form>

            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    checkoutInfo: state.posSystem.checkoutInfo,
});

export default connect(mapStateToProps, {checkout})(Payment);