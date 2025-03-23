// import React, { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentTemplate from "./components/receipt/PaymentTemplate";
import Loading from "../common/Loading";

const ReceiptPage = () => {

    const { state } = useLocation();
    const receiptData = state;

    const navigate = useNavigate();

    const [isFail, setIsFail] = useState(true);

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
            <PaymentTemplate receiptInfo={receiptData?.receiptData} />
        </div>);

    return content;
}

export default ReceiptPage;
