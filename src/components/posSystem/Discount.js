// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Discount = ({handleDiscountDisplay, handleDiscount}) => {

    let [discountInput, setdiscountInput] =  useState("")

    const handleInput = (e) => {
        const  discount = e.target.value

        if(!isNaN(discount)){
            if(discount <= 90) {
                setdiscountInput(e.target.value)
            }else{
                // Add Message
                console.log("your cant enter a value grater that 90 percent")
            }
        }else{
            console.log("you need to enter a number")
        }
    }


    const handleSubmit = () => {
        if(!isNaN(discountInput)) {
            handleDiscount(discountInput);
            handleDiscountDisplay();
        }else{
            console.log("you need to enter a number")
        }
    }
    
    
    return (
        <div className="pop-window-container">
            <div className="pop-window">

                <div  onClick={handleDiscountDisplay} className="discount-pop-form-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h4 className="discount-title"> Aplica Descuento </h4>
                <label htmlFor="payment-selector">Descuento:</label>
                <div>
                    <input  className="discount-input"
                            name="discount-input"
                            value={discountInput}
                            onChange={ e => handleInput(e)}
                    />  
                    <span> % </span>
                </div>

                <button className="button-two" 
                    value="Submit"
                    onClick={ handleSubmit }
                    >
                    Aplicar Descuento 
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Discount);