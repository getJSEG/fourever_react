// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment, useRef} from "react";
import { Link, useNavigate} from "react-router-dom";

import { formatCurrecy } from "../../../../utils/currencyFormatter";

// components
import PaymentSuccesful from "./PaymentSuccesful";
import PaymentFail from "./PaymentFail";

// Style
import "../../../../static/css/pages/receipt.css"

const PaymentTemplate = ({ receiptInfo }) => {

    const navigate = useNavigate();

    const handlePrintReceipt = () => {
        if(receiptInfo?.receipt?.status === 'successful')
            navigate('/print-receipt', { state: {receiptInfo} });
    }

    return (
        <div className="main-container receipt-container-window">
            { receiptInfo?.receipt?.status === 'successful'? <PaymentSuccesful />: <PaymentFail /> }
            
            <div className="receipt-info-container background-container receipt-containers">
                <div className="payment-detail-title">
                    <h5 className="secondary-title"> Detalles de Pago </h5>
                </div>

                <div className="payment-info">
                    <div className="aformation payment-details">
                        <p className="p-detail"> Numero de Ref. </p>
                        <p className="p-detail"> Estado de pago </p>
                        <p className="p-detail"> Tiempo de compra </p>
                    </div>

                    <div className="detail payment-details">
                        <p className="p-detail-info"> { receiptInfo?.receipt?.order } </p>
                        {/* <div className="p-detail-info s-suc-infor">  */}
                            { receiptInfo?.receipt?.status === 'successful' ? 
                            (
                            <div className="p-detail-info s-suc-infor">
                                <div className="sm-message-cont"> <p className="sm-message"> {'Éxitoso!'}  </p></div>
                                <div className="sm-icon-container"> 
                                    <div className="p-check-icon-outer-sm success">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="p-check-icon" width="30" height="30" fill="#fff" viewBox="1 1 17 17">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            ):
                            <div className="p-detail-info s-suc-infor">
                                <div className="sm-message-cont"> <p className="sm-message"> {'Fallido!'}  </p></div>
                                <div className="sm-icon-container"> 
                                    <div className="p-check-icon-outer-sm fail">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" className="bi bi-x" viewBox="1 1 17 17">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            }
                        {/* </div> */}
                        <p className="p-detail-info"> { receiptInfo?.receipt?.date_created}</p>
                    </div>
                </div>

                <span  className="divider-container"> </span>

                <div className="total-payment-container">
                    <div className="total-payment-info"> Pago Total </div>
                    <div className="total-amount"> { formatCurrecy(receiptInfo?.receipt?.grandTotal || 0) }</div>
                </div>
            </div>

            <div onClick={ (e) => { handlePrintReceipt() }} className="receipt-print background-container receipt-containers">
                <div> <p> Imprimir </p> </div>
            </div>

            <Link to="/point-of-sales" className="receipt-print background-container receipt-containers back-h-r-btn">
                <div>  <p> Regresar </p> </div>
            </Link>
        </div>
    );
}

export default PaymentTemplate;
