import React, { useEffect, useState } from "react";

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
                <p className="ftw-600 pt18"> Aplica Un Descuento Personalizado </p>

                <div className="popup-window-input-container">
                    <div className="discount-input-wrapper">
                        <label className="popup-window-label" htmlFor="discount"> Descuento: </label>  
                        <span className="discount-percet-input center-v-content"> 
                            <input  className="form-inputs p1 rounded-lg width-100"
                                    name="discount-input"
                                    id="discount"
                                    value={discountInput}
                                    onChange={ e => handleInput(e)}
                            /> 
                            <svg width="25" height="25" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                                <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                        </span>
                            
                    </div>


                    <div className="discount-btn-container">
                        <button onClick={(e) => { customDiscountWindow(false); }} className="rounded-lg btn-danger p1 pointer"  type="submit" value="Submit">
                            Cancelar 
                        </button>

                        <button className="rounded-lg btn-primary p1 pointer"  value="Submit" onClick={ handleSubmit } >
                            Aplicar 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discount;