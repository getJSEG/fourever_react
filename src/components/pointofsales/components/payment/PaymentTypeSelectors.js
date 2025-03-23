// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

const PaymentTypeSelectors = ({ handlePaymentType, spa, engl, paymenType}) => {

    const [isSelected, setIsSelected] = useState(paymenType === engl);

    const handleSelected = (e) => {
        setIsSelected(!isSelected)
    }

    useEffect(() => {
        if(paymenType !== engl)
            setIsSelected(false)
    }, [paymenType])


    return (
        <div className="payment-btn-selector"> 
            <button className={`button-selector ${ isSelected ? 'selected' : ''}`} onClick= { (e) => {
                handleSelected();
                handlePaymentType(e, engl);
            } }>
                {spa}
            </button>
        </div>
    );
}

export default PaymentTypeSelectors;