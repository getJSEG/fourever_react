import React, { useEffect, useState } from "react";

import NumberPad from "./NumberPad";

import { formatCurrecy } from "../../../../../utils/currencyFormatter";

const Cash = ({ grandTotal, handlePaymentDetail, amountReceived }) => { 

    const [payAmount, setPayAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [isChange, setIsChange] = useState(false);
    
    const handlePaymentAmount = (amount) => {
        setPayAmount(amount)
    }

    useEffect( () => {
        let setChangeAmount = 0;
        amountReceived(payAmount);
        if(parseFloat(payAmount) >= parseFloat(grandTotal)){
            setChangeAmount = (Number(payAmount) - Number(grandTotal)).toFixed(2)
            setChange(setChangeAmount);
            setIsChange(true);
        }else{
            setChangeAmount = 0;
            setChange(0);
            setIsChange(false);
        }
     
        handlePaymentDetail({
                "transactionType": "cash",
                "amount": Number(payAmount).toFixed(2),
                "changeDue": setChangeAmount
        });
    }, [grandTotal, payAmount])
    


    // useEffect(()=> {  
    //     if(parseFloat(payAmount) >= parseFloat(grandTotal)){
    //         const setChangeAmount = (Number(payAmount) - Number(grandTotal)).toFixed(2)
    //         setChange(setChangeAmount);
    //         setIsChange(true);
    //     }else{
    //         setChange(0);
    //         setIsChange(false);
    //     }
    // }, [grandTotal, payAmount])

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
                <h6 >{ isChange && `CAMBIO: ${ formatCurrecy(change) }`} </h6>
            </div>
        </section>
    );
}


export default Cash;