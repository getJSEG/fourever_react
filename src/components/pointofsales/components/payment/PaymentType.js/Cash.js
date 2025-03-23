import React, { useEffect, useState } from "react";

import NumberPad from "./NumberPad";

import { formatCurrecy } from "../../../../../utils/currencyFormatter";

const Cash = ({ grandTotal, handlePaymentDetail }) => { 

    const [payAmount, setPayAmount] = useState(0);
    
    const handlePaymentAmount = (amount) => {
        setPayAmount(amount)
    }

    useEffect( () => {
        handlePaymentDetail( {
            'payment_type': 'cash',
            'TotalReceived': Number(payAmount).toFixed(2)
        })
    }, [payAmount])
    
    // unmounts component
    useEffect( ()=> {
        return( () => { setPayAmount(0) })
    }, [])

    return (  
        <section>
            <div className="amount-received-cont"> 
                <p className="amount-received"> { formatCurrecy(payAmount) } </p>
            </div>

            <NumberPad 
                handlePaymentAmount={ handlePaymentAmount }
            />

            <div className={`pos-change-due`}> 
                <h6 >{ payAmount <= grandTotal  ? null : `CAMBIO: ${ formatCurrecy(payAmount -grandTotal) }`} </h6>
            </div>
        </section>
    );
}


export default Cash;