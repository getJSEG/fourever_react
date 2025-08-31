// import React, { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentTemplate from "./components/receipt/PaymentTemplate";
import Loading from "../common/Loading";

import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";

const ReceiptPage = () => {

    const { state } = useLocation();
    const receiptData = state;

    const navigate = useNavigate();

    const [isFail, setIsFail] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }

    // if receiptData is null or empty redirect to Point of sales data
    useEffect( () => {
        if(receiptData === null || receiptData === undefined) {
            navigate('/point-of-sales', { replace: true });
        }else{
            setIsFail(false);
        }
    }, []);

    // Unmount evrything here
    useEffect( () => {
        return () => {  
            setIsFail(true) 
        }
    }, [])

    let content = isFail 
    ? <Loading /> 
    :(<div>
            {
                errorMessage &&
                <ErrorMessage  message ={ errorMessage }
                               errorMessageHandler = { errorMessageHandler } />
            }

            <PaymentTemplate receiptInfo={receiptData?.receiptData} />
        </div>);

    return content;
}

export default ReceiptPage;
