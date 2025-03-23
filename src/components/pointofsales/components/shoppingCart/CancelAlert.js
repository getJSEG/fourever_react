import React, { useEffect, Component, useState, Fragment } from "react";

import { connect } from "react-redux";

const CancelAlert = ({ handleClearCart, handleCancelWindow }) => {

    
    return (
        <div className="cancel-trans-wrapper">
            <div className="cancel-trans-container">
                <div className="cancel-trans questions-text"> 
                    <h3> ¿Quieres Cancelar esta Transacción? </h3>
                </div>
                
                <div className="cancel-trans btn-container">
                    <button className="cancel-trans-btn yes-btn"  
                            onClick={ (e) => { handleClearCart(e, true);
                                               handleCancelWindow(e, false); } }> Si </button>
                    <button className="cancel-trans-btn no-btn"   
                            onClick={ (e) => { handleCancelWindow(e, false) }}> No </button>
                </div>
            </div>
        </div>
    );
}

export default CancelAlert;