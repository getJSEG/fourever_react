import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";

// redux Api call
import PackageEditForm from "./components/packageInformation/PackageEditForm";

// APIS Calls
import { useGetPersonalizePackageQuery } from "../../features/shipping/shippingApiSlice";
import { useGetParcelPackageQuery } from "../../features/shipping/shippingApiSlice";
import { useDeleteParcelMutation } from "../../features/shipping/shippingApiSlice";
import { useDeletePersonalizePackageMutation } from "../../features/shipping/shippingApiSlice";

// components
import PackageInformation from "./components/packageInformation/PackageInformation";
import Loading from "../common/Loading";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";


const PackageDetails = ({}) => {

    // this gets the package details from the redirect
    const navigate = useNavigate();
    const { state } = useLocation();

    const [ deleteParcel ] = useDeleteParcelMutation();
    const [ deletePersonal ] = useDeletePersonalizePackageMutation();

    // useStates
    const [shouldPersonalizePackageFetch, setShouldPersonalizePackageFetch] = useState(false); 
    const [shouldParcelPackageFetch, setShouldParcelPackageFetch] = useState(false); 
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {data: personalizePackageData, isLoading: personalizePackageIsLoading, isSuccess:personalizeIsSuccess} = useGetPersonalizePackageQuery(state?.packageId, {
        skip: !shouldPersonalizePackageFetch
    });
    const {data: parcelPackageData, isLoading: parcelPackageIsLoading, isSuccess:parcelRefetchIsSuccess } = useGetParcelPackageQuery(state?.packageId, {
        skip: !shouldParcelPackageFetch
    });


    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }
    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }

    // Handlers
    const deleteConfirmationHandler = (confirmation) => {
        setDeleteConfirmation(confirmation);
    }
    // this is the refetch boole handler fo the Persolized package handler
    const personalizePackageFetchHandler = (bool) => {
        setShouldPersonalizePackageFetch(bool);
    }
    // this is the reftech boolean handler for the parce Packages
    const parcelPackageFetchHandler = (bool) => {
        setShouldParcelPackageFetch(bool);
    }
    // this delete function  deletes the whole package
    const deleteHandlers = async (deleteFunction) => {
        // TODO: Add a confirmation. if confimation is true delete
        try{
            await deleteFunction({id:state?.packageId}).unwrap();
            navigate("/shipping", { state: {  successMessage: "Paquete fue borrado exitosamente" }});

        } catch( err ) {
            // TODO: THROW ERROR
            setDeleteConfirmation(false);
            errorMessageHandler(JSON.stringify(err?.data));
        }
    }
  

    // UseEffects
    // check if theirs and id or
    useEffect( () => {
        if(state?.packageId === null || state?.packageId === undefined) {
            navigate('/shipping', { replace: true });
        }else{
            // check for shipping type
            if(state?.shippingType === "custom"){
                personalizePackageFetchHandler(true);
            }
            if(state?.shippingType === "parcel") {
                parcelPackageFetchHandler(true);
            }
        }
    }, [location, navigate]);


    return(
        <div>
            {
                errorMessage && <ErrorMessage message={ errorMessage } 
                                              errorMessageHandler={errorMessageHandler}/>
            }
            {
                successMessage && <SuccessMessage message={ successMessage } 
                                                  successMesageHandler = { successMessageHandler } />
            }
           {
            state?.shippingType === "custom"
           ? 
                personalizePackageIsLoading
                ? <Loading />
                : <PackageInformation 
                    packageDetails = { personalizePackageData }
                    shippingType = { state?.shippingType }
                    refetch = { personalizePackageFetchHandler }
                    isRefetch = { shouldPersonalizePackageFetch }
                    deletePackage = { async () => deleteHandlers(deletePersonal) }
                    deleteConfirmation = { deleteConfirmation }
                    deletePackageMutation = { deletePersonal }
                    deleteConfirmationHandler = { deleteConfirmationHandler }
                    errorMessageHandler = { errorMessageHandler }
                />
            :
                parcelPackageIsLoading
                ? <Loading />
                :  <PackageInformation 
                        packageDetails = { parcelPackageData }
                        shippingType = { state?.shippingType }
                        refetch = { parcelPackageFetchHandler }
                        isRefetch = { shouldParcelPackageFetch }
                        deletePackage = { async () => deleteHandlers(deleteParcel) }
                        deleteConfirmation = { deleteConfirmation }
                        deletePackageMutation = { deleteParcel }
                        deleteConfirmationHandler = { deleteConfirmationHandler }
                        errorMessageHandler = { errorMessageHandler }
                        successMessageHandler = { successMessageHandler }
                    />
            }
        </div>
    );
}

export default PackageDetails;