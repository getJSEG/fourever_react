// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

//Style css
import '../../static/css/pages/POSSystem/discount.css'

// API CALLS
import { getDiscount } from "../../actions/discounts/discount.js"

const DicountCodes = ({ getDiscount, handleDiscountCodeDisplay, discountFail, discountInfo, discountErrMessage, handleDiscountCode, isLoading}) => {

    let [discountInput, setdiscountInput] =  useState("")
    let [closeWindow, setCloseWindow] = useState(false)

    const handleDiscountInput = (e) => {
        setdiscountInput(e.target.value)
    }
    
    const submitForm = (e) => {
        e.preventDefault();
        // TODO: IF STRING IS EMPTY Thwo err Message
        if(discountInput.trim() !== ""){
            getDiscount(discountInput)
            if(closeWindow){
                setCloseWindow(!closeWindow) 
                handleDiscountCodeDisplay(); 
            }
        }
    }

    useEffect( () => {
        if(!discountFail){
            handleDiscountCode(discountFail, discountErrMessage, discountInfo)
            setCloseWindow(!closeWindow)
        }
    }, [discountErrMessage, discountInfo])

    return (
        <div className="pop-window-container">
            <div className="pop-window">

                <div  onClick={handleDiscountCodeDisplay} className="discount-pop-form-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h4 className="discount-title">Aplica Codigo De Descuento</h4>
                <h3> {discountErrMessage} </h3>

                <form onSubmit={ e => submitForm(e) } className="discount-form">
                    <label htmlFor="payment-selector">Codigo:</label>
                    <input  className="discount-input"
                            name="discount-input"
                            value={discountInput}
                            onChange={ e => handleDiscountInput(e)}
                    />  

                    <button className="button-two" 
                        type="submit"
                        value="Submit">
                        Aplicar Descuento 
                    </button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    discountInfo: state.discount.discountInfo,
    discountFail: state.discount.discountFail,
    isLoading: state.discount.isLoading
});

export default connect(mapStateToProps, {getDiscount})(DicountCodes);