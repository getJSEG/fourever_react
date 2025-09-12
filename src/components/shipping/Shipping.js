import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// Style
import "../../static/css/pages/shipping/shippingPage.css";

import { useGetAllPackagesQuery } from "../../features/shipping/shippingApiSlice";
import { useGetRecentlyCreatedQuery } from "../../features/shipping/shippingApiSlice";
import { getLocations } from "../../utils/utilsdata";

// Components
import ShippingOption from "./components/ShippingOption";
import AllShipments from "./components/shipments/AllShipmets";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";


const Shipping  = ({}) => {

    const { data: allPackageData, isLoading: PackagesIsLoading, isError: packagesIsError, error: shippingError} = useGetAllPackagesQuery();
    const { data: recentlyCreatedData, isLoading: recentlyCreatedIsLoading, isError: recentlyCreatedIsError, error:recentlyCreatedError } = useGetRecentlyCreatedQuery();
    
    const { state } = useLocation();

    // Display Recent or all packeges
    const [isRecentlyCreatedDisplayed, setIsRecentCreadtedDisplayed] = useState(true);
    const [shippingOption, setShippingOption] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    
    const handleShippingOption = (option) => {
        setShippingOption(option);
    }

    const displayRecentHandler = () => {
        setIsRecentCreadtedDisplayed(!isRecentlyCreatedDisplayed)
    }

    const successMesageHandler = (message) => {
        setSuccessMessage(message);
    }
    const errorMessageHandler = (message) => {
        setErrorMessage(message);
    }

    // getting the state when redirected and adding the message fron it
    useEffect( () => {
        if(state?.successMessage !== null && state?.successMessage !== undefined){
            successMesageHandler(state?.successMessage);
        }
        if(state?.errorMessage !== null && state?.errorMessage !== undefined){
            successMesageHandler(state?.errorMessage);
        }
    }, [location]);

    // ??
    useEffect( () => {
        if(packagesIsError){
            if(shippingError?.status === 400){
                console.log(shippingError)
                errorMessageHandler("Algo salio mal, porfavor intenta otra ves, si sigue pasando comunicate con administrador")
            }
        }

    }, [packagesIsError, shippingError]);


    // when mounting component retriving the cities and departments
    useEffect( () => {
        getLocations();
    }, [])

    return (
        shippingOption 
            ? <ShippingOption handleShippingOption={ handleShippingOption } /> 
            :
                <div className="main-container">
                    {
                        errorMessage && <ErrorMessage  message={errorMessage}
                                                       errorMessageHandler={errorMessageHandler} />

                    }
                    { successMessage && <SuccessMessage  message={successMessage}
                                                         successMesageHandler = { successMesageHandler } /> 
                    }

                    <p className="page-title"> Paquetes </p>

                    <div className="background-container drk-gy-text-color">
                        <div className="create-btn pt10 rounded-lg pointer remove-underline" onClick={() =>  handleShippingOption(true) }> Crear Paquetes </div>
                    </div>
                    
                    <div className="shipping-button-cont mt1">
                        <div className="create-btn pt10 rounded-lg pointer remove-underline" onClick={() =>  displayRecentHandler(true) }> { `${ isRecentlyCreatedDisplayed ? 'Ver Todos': 'Ver Recientes'}`} </div>
                    </div>
                    
                    {
                    isRecentlyCreatedDisplayed 
                    ?
                        // <RecentlyCreated />
                        <AllShipments  packageData = { recentlyCreatedData } 
                                       isRecentlyCreatedDisplayed = { isRecentlyCreatedDisplayed } 
                                       successMesageHandler = {successMesageHandler}
                                       errorMessageHandler={errorMessageHandler}
                                       />
                    :
                        <AllShipments  packageData={ allPackageData } 
                                       isRecentlyCreatedDisplayed = { isRecentlyCreatedDisplayed } 
                                       successMesageHandler = {successMesageHandler}
                                       errorMessageHandler={errorMessageHandler}
                                       />
                    }
                </div>  
    );
}

export default Shipping;