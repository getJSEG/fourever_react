import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useGetCustomerQuery } from "../../../../features/customer/customerApiSlice";

import ConfirmationWindow from "../../../cofirmationWindow/ConfirmationWindow";
import ErrorMessage from "../../../AlertMessage/ErrorMessage";

const SearchCustomer  = ({handleCustomerSearch, handlePhoneNumber, phoneNumber, savedCustomerDataHandler}) => {
    
    const navigate = useNavigate();

    // todo: Make sure this field is not empty
    // Submit the data to back end
    const [skip, setSkip] = useState(true);
    // search for phone number to see if cutomer exist in the backend
    const {  data: customerData, isLoading, isFetching, isSuccess, isError, error
    } = useGetCustomerQuery(phoneNumber, { skip });

    // const [showPopToContinue, setShowPopToContinue ] = useState(false);
    const [isBlackListed, setIsBlacklisted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const errorMessageHandler = ( message ) => {
        setErrorMessage(message)
    }

    // Submits phone number to search to a existing cutomer
    const handleSubmit = () => {
        if(phoneNumber !== "") {
            setSkip((prev) => !prev);
        }else{
            errorMessageHandler("Por favor introduzca un número de teléfono")
        }
    }

    const redirectToShippingPage = () => {
        navigate("/shipping", {replace: true})
    }

    // if customer data was found move on with the customer data for autofill
    const MovetoNextStepWithCustomerdata = async () => {
        handleCustomerSearch(false);
        savedCustomerDataHandler(customerData?.data)
    }

    // this moves on to create cutomer if no data was affiliated with the phone
    const moveToNextStep = () => {
        handleCustomerSearch(false);
    }

    // ErrorHandling 
    useEffect(() => {
        if(isError) {
            if(error?.status === 404) {
                // if no customer data found move on to fill the NEW CUSTOMER
                moveToNextStep();
            }else if( error?.status == 401) {
                errorMessageHandler(Object.keys(error?.data).map(key => error?.data[key]))
                navigate("/login", {replace: true});
            } else{
                errorMessageHandler(JSON.stringify(error))
            }
        }
    }, [isError, error])



    // SuccessMessage
    useEffect(() => {
        if(isSuccess) {
            const blacklisted = customerData?.data?.blacklist
            if(blacklisted) {
                // if customer is found and if black listed the let the use decide if the want to move forward
                setIsBlacklisted(blacklisted)
            }else{
                // if Customer was found the auto fill the data and move to next window
                MovetoNextStepWithCustomerdata();
            }
        }
    }, [isSuccess]);



    return (
        <div className="main-container">  
            {
                errorMessage && <ErrorMessage  message = { errorMessage }
                                               errorMessageHandler = { errorMessageHandler } />
            }

            {
                isBlackListed && 
                <ConfirmationWindow 
                    message = { "Este Cliente esta en la lista negra, Quires continuar"}
                    handleCloseWindow = { () => { redirectToShippingPage(); } }
                    handleConfirmartion = { () => { MovetoNextStepWithCustomerdata(); } }
                />
            }

            <p className="page-title"> Envio </p>
            {/* <form className="" onSubmit={ (e) => onSubmit(e)}> */}


            <div className="background-container mt3 shipping-inputs-container">
                <label htmlFor="phoneNumber"> Numero de telefono </label>
                <input
                    className="form-inputs p1 rounded-lg "
                    name="phoneNumber"
                    placeholder="Numero"
                    type="text" 
                    autoComplete="off"
                    onChange={e => handlePhoneNumber(e)}
                    value={phoneNumber}
                ></input>
            </div>

            <div className="shipping-button-cont">
                <button 
                onClick={ (e) => handleSubmit() }
                className="btn-primary rounded-lg p1 mt1 pointer">
                    Siguente
                </button>
            </div>

            {/* </form> */}
      </div>  
    );
}

export default SearchCustomer;