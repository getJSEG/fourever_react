import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

// Style
import "../../static/css/components/cofirmationWindow.css";

const ConfirmationWindow  = ({ message, handleCloseWindow, handleConfirmartion }) => {

    return(
        <div className="alert-msg-box container">
            <div className="alert-msg-box-wrapper rounded-lg">
                <p className="text-color-dark-gray pt15"> ¿{message}? </p>

                <div className="alert-msg-btn-container">
                    <button onClick={ () => handleConfirmartion() } className="alert-msg-btn delete"> 
                        <p className="pt12"> Aceptar </p>
                    </button>
                    <button onClick={ () => handleCloseWindow(false) } className="alert-msg-btn cancel"> 
                        <p className="pt12"> Cancelar </p> 
                    </button>
                </div>     
            </div>
        </div>
    )
}

export default ConfirmationWindow;