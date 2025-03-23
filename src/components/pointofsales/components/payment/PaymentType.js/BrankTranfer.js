import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { formatCurrecy } from "../../../../../utils/currencyFormatter";

const BrankTranfer = ({ grandTotal, handlePaymentDetail, handleCustomerDetails  }) => { 
          
    const [customerName, setCustomername] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [payAmount, setPayAmount] = useState(grandTotal);

    const [isEmpty, setIsEmpty] = useState("");

    useEffect( () => {
        if(customerName.length <= 2 && transactionID.length <= 4){ setIsEmpty(false); }
     }, [customerName, transactionID]);

    const handleName = (e) => {
        e.preventDefault();
        const value = e.target.value
        // handleTransInfo(e.target.name, value)
        setCustomername(value);
    }

    const handleTransactionID = (e) => {
        e.preventDefault();
        const value = e.target.value
        // handleTransInfo(e.target.name, value)
        setTransactionID(value);
    }

    useEffect( () => {
        handlePaymentDetail({
            'payment_type': 'bank_transfer',
            'bank_transfer_code': transactionID,
            'TotalReceived':  Number(payAmount).toFixed(2)
        });

        handleCustomerDetails({ "name": customerName });

    }, [payAmount, transactionID, customerName])
    


    useEffect(() => {
        return( () => {
            setCustomername('');
            handleCustomerDetails({ "name": ''});
        })
    }, [])
    return (  
        <div className="payment-inputs-container"> 
            <div className="cc-payment-wrapper">
                <p>Monto del pago:</p>
                <h1 className="pymtn-amount"> { formatCurrecy(payAmount) } </h1>
            </div>

            <div className="cc-payment-wrapper">
                <label className="pymt-label" htmlFor="trans-code">Nombre Del Cliente: </label>
                <input className="pymt-input"
                        autoComplete="off"
                        type="text"
                        required
                        name="customerName"
                        onChange= { (e) => handleName(e) }
                        value={customerName}
                        placeholder="John Smith"
                />

            </div>

            <div className="cc-payment-wrapper">
                <label className="pymt-label" htmlFor="last-digits">Id de Tranferencia:</label>
                <input className="pymt-input"
                        autoComplete="off" type="text"
                        name="transactionID"
                        required
                        value= {transactionID}
                        onChange= { (e) => handleTransactionID(e) }
                        placeholder="235298"
                />
            </div>
            
        </div>
    );
}


export default BrankTranfer;