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
        discountData, isLoading,
        isSuccess, isError, refetch
    } = useGetDiscountQuery(promoCode, {enabled: trigger});


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
            <div className="pop-window">
                <p className="ftw-600 pt18">Aplica Código de Oferta</p>

                <form onSubmit={ (e) => { submitForm(e); }} className="popup-window-input-container">
                    <div className="discount-input-wrapper">
                        <label className="popup-window-label" htmlFor="discount">Codigo:</label>
                        <input  className="form-inputs p1 rounded-lg"
                                id="discount"
                                name="discount"
                                value={promoCode}
                                onChange={ (e) => { handlePromotionalCode(e); }}
                        />  
                    </div>
                    

                    <div className="discount-btn-container">
                        <button onClick={ (e) =>{ handlePromoCodeWindow(e, false); }}  className="rounded-lg btn-danger p1 pointer"  type="submit" value="Submit">
                            Cancelar 
                        </button>

                        <button className="rounded-lg btn-primary p1 pointer"  type="submit" value="Submit">
                            Aplicar 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PromotionalCodes;