import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AlertMessage from "../../../common/AlertMessage";

const Discount = ({ customDiscountWindow, handleDiscount}) => {

    const [discountInput, setdiscountInput] =  useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [isDCError, setIsDCError] = useState(false);

    const handleMessage = (massageAlert, isErr) => {
        setAlertMessage(massageAlert);
        setIsDCError(isErr);
    }

    const clearMessage = () => {
        setAlertMessage("");
        setIsDCError(false);
    }

    const handleInput = (e) => {
        const  discount = e.target.value

        if(!isNaN(discount)){
            if(discount <= 99) { setdiscountInput(e.target.value); }
            if(discount > 99){ handleMessage("No puedes ingresar un valor mayor que 99%" , true); }
        }else{
                handleMessage("Debe ser un número, sin letras ni caracteres especiales." , true);
        }
    }

    const handleSubmit = () => {
        if(!isNaN(discountInput)) {
            handleDiscount(discountInput);
            customDiscountWindow(false);
        }
        if(isNaN(discountInput)){
            handleMessage("Debe ser un número, sin letras ni caracteres especiales." , true);
        }
    }

    // Resets any messages after 3 sec.
    useEffect( () => {
        if(alertMessage !== '' ){
            const timeoutId = setTimeout(() => {
                clearMessage();
            }, 3000);
            return () => clearTimeout(timeoutId);
        }

    }, [alertMessage])
    
    return (
        <div className="pop-window-container">
            { alertMessage !== "" ? <AlertMessage message={alertMessage} isError={isDCError} /> : null }

            <div className="pop-window">
                <div  onClick={(e) => { customDiscountWindow(false); }} className="popup-window-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h2 className="popup-window-title"> Aplica Un Descuento </h2>

                <div className="popup-window-input-container">
                    <div className="popup-window-input-wrapper">
                        <label className="popup-window-label" htmlFor="discount-input">Descuento:</label>  
                        <span className="span-input-perc-cont"> 
                            <input  className="popup-window-input"
                                    name="discount-input"
                                    id=""
                                    value={discountInput}
                                    onChange={ e => handleInput(e)}
                            /> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                        </span>
                            
                    </div>

                    <button className="popup-window-submit-btn" value="Submit" onClick={ handleSubmit } >
                        Aplicar Descuento 
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Discount);