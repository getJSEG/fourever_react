import React, { useEffect, useState} from "react";
import { connect } from "react-redux";

// API CALLS
// import { getDiscount } from "../../actions/discounts/discount.js"
// import { clearDiscountAlert } from "../../actions/inventory/clear";
import { useGetDiscountQuery } from "../../../../features/discount/discountApiSlice";

// Components
// import AlertMessage from "../../../common/AlertMessage.js";
import ErrorMessage from "../../../AlertMessage/ErrorMessage.js";
// getDiscount, handlePromoCodeWindow, clearDiscountAlert,
// discountAmount, message, isError, handleDiscountCode
const PromotionalCodes = ({handlePromoCodeWindow }) => {

    const [promoCode, setPromoCode] =  useState("");
    const [trigger, setTrigger] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const [alertMessage, setAlertMessage] = useState("");
    // const [isErr, setIsErr] = useState(false);

    const { data:  discountData, isLoading, isSuccess, isError, refetch, error } = useGetDiscountQuery(promoCode, {skip: !trigger});


    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }


    useEffect( () => {
        if(isError){
            setErrorMessage(JSON.stringify(error))
        }
    }, [isError])

    const handlePromotionalCode = (e) => {
        setPromoCode(e.target.value)   
    }

    // this just sets the trigget to refetch the data
    const submitForm = (e) => {
        e.preventDefault();
        setTrigger(true);
    }


    // this resets the riggers if the loading is false and trigger is true. so the user can retry the code
    useEffect(() => {
        if(isLoading == false && trigger == true)
            setTrigger(false);
    }, [trigger]);

    return (
        <div className="pop-window-container">

            {
                errorMessage && <ErrorMessage message={errorMessage} errorMessageHandler={errorMessageHandler}/>
            }
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