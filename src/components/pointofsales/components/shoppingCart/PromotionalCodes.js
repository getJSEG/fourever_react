import React, { useEffect, useState} from "react";
import { connect } from "react-redux";

// API CALLS
// import { getDiscount } from "../../actions/discounts/discount.js"
// import { clearDiscountAlert } from "../../actions/inventory/clear";
import { useGetDiscountQuery } from "../../../../features/discount/discountApiSlice";

// Components
import AlertMessage from "../../../common/AlertMessage.js";
// getDiscount, handlePromoCodeWindow, clearDiscountAlert,
// discountAmount, message, isError, handleDiscountCode
const PromotionalCodes = ({handlePromoCodeWindow }) => {

    const [promoCode, setPromoCode] =  useState("");
    const [trigger, setTrigger] = useState(false);
    // const [alertMessage, setAlertMessage] = useState("");
    // const [isErr, setIsErr] = useState(false);

    const {
        data:
        discountData,
        isLoading,
        isSuccess,
        isError,
        refetch
    } = useGetDiscountQuery(promoCode, {enabled: trigger});

    // Get value here an pass up to parent
    console.log(discountData);

    // const handleMessage = (msg, err) => {
    //     setAlertMessage(msg);
    //     setIsErr(err);
    // }
    // const clearMsgAlert = () => {
    //     setAlertMessage("");
    //     setIsErr(false);
    // }

    // const handleDiscountInput = (e) => {
    //     setdiscountInput(e.target.value)
    // }
    
    // const submitForm = (e) => {
    //     e.preventDefault();

    //     if(discountInput.trim() !== ""){
    //         getDiscount(discountInput);
    //     }
    // }
    // Handling the api call when var change
    // useEffect( () => {
    //     handleMessage(message, isError);
    // } ,[message, isError]);
    
    // useEffect( () => {
    //     if(discountAmount > 0 && message === "" && isError === false ){
    //         handleDiscountCode(discountAmount);
    //         handlePromoCodeWindow(false);
    //     }
    // }, [isErr, discountAmount]);

    //clear alert message after 3 seconds
    // useEffect( () => {
    //     if(alertMessage !== '' ){
    //         const timeoutId = setTimeout(() => {
    //             // Clear Message
    //             clearMsgAlert();
    //             clearDiscountAlert();
    //         }, 3000);
    //         return () => clearTimeout(timeoutId);
    //     }
    // }, [alertMessage]);

    // //clear data when unmounting
    // useEffect( () => {
    //     return() => {
    //         clearMsgAlert();
    //         clearDiscountAlert();
    //     }
    // }, []);

    const handlePromotionalCode = (e) => {
        setPromoCode(e.target.value)
        
    }

    const submitForm = (e) => {
        e.preventDefault();
        setTrigger(true);
        refetch({ newParam: 'new value' });
    }


    return (
        <div className="pop-window-container">
            {/* {
                alertMessage !== "" ? <AlertMessage message={alertMessage} isError={isErr} /> : null
            } */}
            <div className="pop-window">

                <div  onClick={ (e) =>{ handlePromoCodeWindow(e, false); }} className="popup-window-close-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h2 className="popup-window-title">Aplica Código de Oferta</h2>

                <form onSubmit={ (e) => { submitForm(e); }} className="popup-window-input-container">
                    <div className="popup-window-input-wrapper">
                        <label className="popup-window-label" htmlFor="discount-input">Codigo:</label>
                        <input  className="popup-window-input"
                                name="discount-input"
                                value={promoCode}
                                onChange={ (e) => { handlePromotionalCode(e); }}
                        />  
                    </div>

                    <button className="popup-window-submit-btn"  type="submit" value="Submit"> Aplicar Codigo  </button>
                </form>
            </div>
        </div>
    );
}

export default PromotionalCodes;