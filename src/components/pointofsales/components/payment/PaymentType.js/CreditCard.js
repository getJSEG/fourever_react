import React, { useEffect, useState } from "react";

import { formatCurrecy } from "../../../../../utils/currencyFormatter";

import CustomerDetails from "./CustomerDetails";

const CreditCard = ({ grandTotal, handlePaymentDetail, handleCustomerDetails, amountReceived }) => { 

    const [lastDigits, setLastDigits] = useState("");
    const [transactionCode, seTransCode] = useState("");
    const [payAmount, setPayAmount] = useState(grandTotal);

    // Handle card trans Code
    const handleTranCode = (e) => {
        e.preventDefault();
        const value = e.target.value
        // handleTransInfo(e.target.name, value);
        seTransCode(value);
    }
    
    // Handle CC last digits input
    const onchangeLastDigits = (e) => {
        e.preventDefault();
        const value = e.target.value;

        if(/^\d*$/.test(value)){
            if( value.length <= 4 ){
                setLastDigits(value);
                // handleTransInfo(e.target.name, value);
            }
        }else{
            // handleAlertMessage("por favor ingrese solo números", true);
        }
    }

    useEffect( () => {
        handlePaymentDetail({
                "transactionType": "credit_card",
                "amount": Number(payAmount).toFixed(2),
                "lastDigits": lastDigits,
                "transactionID": transactionCode
            })
        amountReceived(Number(payAmount).toFixed(2))
    }, [lastDigits, transactionCode, payAmount])


    // When Unmount reset state
    useEffect( () => {
       return()=> {
            // handleAlertMessage("", false);
            setLastDigits("");
            seTransCode("");
       }
    }, []);

  

    return (  
        <div className="payment-inputs-container"> 
            
            <div className="cc-payment-wrapper">
                <p>Monto del pago:</p>
                <h1 className="pymtn-amount"> { formatCurrecy(payAmount) } </h1>
            </div>

            <div className="lastdgt-wrapper cc-payment-wrapper">
                <label className="pymt-label" htmlFor="lastDigits">Últimos 4 dígitos de la tarjeta:</label>
                <input className="pymt-input"
                        autoComplete="off"
                        name="lastDigits"
                        onChange={e => onchangeLastDigits(e)}
                        required
                        value={lastDigits}
                        type="text"
                        placeholder="1234"
                />
            </div>

            <div className="trandcode-wrapper cc-payment-wrapper">
                <label className="pymt-label" htmlFor="transactionCode">Código de transacción: </label>
                <input  className="pymt-input"
                        autoComplete="off"
                        type="text"
                        name="transactionCode"
                        value={transactionCode}
                        onChange={e => handleTranCode(e)}
                        placeholder="0009123"
                />
            </div>

            {/* Payment Above 200 USD Will Require extra information */}
            {
                payAmount > 200 ?  <CustomerDetails handleCustomerDetails={handleCustomerDetails}/>: null
            }
            
            
         </div>
    );
}

export default CreditCard;