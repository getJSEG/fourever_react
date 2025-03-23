// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

// Components
import PaymentTypeSelectors from "./PaymentTypeSelectors.js";

// Utils
import { formatCurrecy } from "../../../../utils/currencyFormatter.js";
// Components
// import PaymetButtonSelector from "./PaymetButtonSelector.js";
// import CCInput from "./CCInput.js";
// import BKTransfer from "./BKTransfer.js";

// handleCheckoutWindow,  handlePaymentType, mainPaymentOption, onSubmitPayment, handlePaymentAmount, paymentAmount,
//                             grandTotal, isDisabled, change, paymentType, handleTransInfo, handleAlertMessage
const FinalizePayment = ({ handlePaymentWindow }) => { 
    
    const [paymentTabs, setPaymentTabs] = useState([{"cash":"EFECTIVO"}, 
                                                    {"credit_card":"TRANSFERENCIA"}, 
                                                    {"bank_transfer":"TARGETA CC"}]);      
    const [paymentType, setPaymentType] = useState('cash');

    const handlePaymentType = (e,type) => {
        setPaymentType(type)
    }

    const handlePaymentAmount = () => {
        console.log('')
    }

    // Check input
    return (
        <div className="payment-form-wrapper">
            <div onClick={ () => handlePaymentWindow(false) } className="payment-pop-form-close-btn">
                <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </div>

            <div>
                <label htmlFor="total-price">Total a Pagar:</label>
                {/* <h2  className="total-price"> { formatCurrecy(grandTotal) } </h2> */}
            </div>
                
                <div className="payment-selector">
                    <div className="payment-selector title">
                        <p> Metodo de Pago: </p>
                    </div>

                    <div className="payment-btn-selector"> 
                        {
                            paymentTabs?.map( (value, index) => (
                                <PaymentTypeSelectors 
                                    handlePaymentType={ handlePaymentType } 
                                    key={index} 
                                    spa={Object.values(value)[0]}
                                    engl={Object.keys(value)[[0]]}
                                    paymenType={paymentType}
                                />
                            ) )
                        }
                    </div>
                </div>

            <form onSubmit={ e => onSubmitPayment(e) }  className="payment-form">

                {
                    // This is for cash input only 
                    paymentType === 'cash' ? (
                        <div>

                            <div className="amount-received-cont"> 
                                <p className="amount-received"> { formatCurrecy(0) } </p>
                            </div>

                            {/* <NumberPad 
                                handlePaymentAmount = {handlePaymentAmount}
                            /> */}

                            <div className={`pos-change-due`}> 
                                <h6 >{ 0 <= 0 ? null : `CAMBIO: ${ formatCurrecy(0) }`} </h6>
                            </div>
                        </div>

                    ) : null
                }

                {/* { paymentType === "credit_card" ? ( <CCInput paymentAmount={ paymentAmount } handleTransInfo={handleTransInfo} handleAlertMessage={handleAlertMessage} />) : null }

                { paymentType === "bank_transfer" ? ( <BKTransfer paymentAmount={ paymentAmount } handleTransInfo={handleTransInfo}/> ) : null } */}


                <button className="finalize-transaction" disabled={true} type='submit'>
                    PAGAR 
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(FinalizePayment);