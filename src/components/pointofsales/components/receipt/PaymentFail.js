// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink, useNavigate, Navigate} from "react-router-dom";
import { connect } from "react-redux";


const PaymentFail = ({ }) => {

    return (
        <div className="receipt-message background-container receipt-containers">
            <div className="icon-container">
                <div className="p-check-icon-outer fail">
                    <div className="p-check-icon-inner fail-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#fff" className="bi bi-x" viewBox="1 0 15 17">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </div>
                </div>
            </div>
            <h5 className="trans-procces"> Pago {'Fallido!'}</h5>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(PaymentFail);
