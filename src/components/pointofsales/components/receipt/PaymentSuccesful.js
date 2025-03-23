// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink, useNavigate, Navigate} from "react-router-dom";
import { connect } from "react-redux";

const PaymentSuccesful = ({}) => {

    return (
        <div className="receipt-message background-container receipt-containers">
            <div className="icon-container">
                <div className="p-check-icon-outer success">
                    <div className="p-check-icon-inner success-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" className="p-check-icon" width="50" height="50" fill="#fff"  viewBox="1 1 15 15">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <h5 className="trans-procces"> Pago {'Éxitoso!'}</h5>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(PaymentSuccesful);
