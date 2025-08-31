import React, { useState, useEffect }from "react";

// componets
import PackageList from "./PackageList";
import SelectAllPackagesButton from "../elements/SelectAllPackagesButton";

// functiosn
import { useDeleteParcelMutation } from "../../../../features/shipping/shippingApiSlice";
import { useDeletePersonalizePackageMutation } from "../../../../features/shipping/shippingApiSlice";

// Todo: get all packages from here
const AllShipments = ({packageData, isRecentlyCreatedDisplayed, errorMessageHandler, successMesageHandler}) => {

    const [ viewtoggle, setViewToggle] = useState(true);
    // redux delete to back end
    const [ deleteParcel ] = useDeleteParcelMutation();
    const [ deletePersonal ] = useDeletePersonalizePackageMutation();
    // 
    const [isAllRecentlyCreatedSelected, setIsAllRecentlyCreatedSelected] = useState(false);
    const [selectedRecentlyCreatedPackageList, setSelectedRecentlyCreatedPackageList] = useState([]);

    // This handles the adding and removing of the items selected
    const selectedrecentlyCreatedPackageHandler = (packageItem) => {
        setSelectedRecentlyCreatedPackageList([...selectedRecentlyCreatedPackageList, ...packageItem])
    }


    const selectAllRecentlyCreated = (objList) => {
        // Clear all of the current selected items before adding all of the objects
        // this helps to not duplicated the object and clears different types of shipping
        setSelectedRecentlyCreatedPackageList([]);
        // loop through all of the object and add it to the array
        setSelectedRecentlyCreatedPackageList(objList?.map( item => {
            return { 
                "ORDEN": item?.id,
                "NOMBRE": `${item?.customer.firstName} ${item?.customer.lastName}`,
                "TELEFONO": item?.customer?.phoneNumber,
                "EMAIL": item?.customer?.email,
                "DIRECCION": item?.customer?.address,
                "MUNICIPIO": item?.customer?.municipality,
                "DEPARTAMENTO": item?.customer?.department,
                "PAIS":item?.customer?.country,
                "CODIGO POSTAL": item?.customer?.zip_code,
                "DESCRIPCION": item?.customer?.extraDetails,
                "PESO": item?.weight,
                "PRECIO": item?.ShippingOrder?.totalAmount,
                "OBSERVACIONES": item?.details
            }
        })); 
        
    }
    // this adds all of the package data to the selected packages array for download
    const selectAllRecentlyCreatedHandler = () => {
        if(!isAllRecentlyCreatedSelected){
            if(viewtoggle){
                selectAllRecentlyCreated(packageData?.custom);
                setIsAllRecentlyCreatedSelected(true);
            }else{
                selectAllRecentlyCreated(packageData?.parsel);
                setIsAllRecentlyCreatedSelected(true);
            }
        }else{
            selectAllRecentlyCreated([]);
            setIsAllRecentlyCreatedSelected(false);
        }
    }

    const viewHandler = (view) => {
        setViewToggle(view);
    }

    // this is a 
    const submitDelete = async (deleteFunction, id) => {
        try{
            await deleteFunction({id: id}).unwrap();
            successMesageHandler("Paquete fue eliminado exitosamente")
        } catch( err ) {
            errorMessageHandler(JSON.stringify(err))
        }
    }

    const deletePackageHandler = async(packageType, id) => {
        // console.log(id)
        if(packageType === "parcel") {
            submitDelete(deleteParcel, id);
        }else if (packageType === "custom"){
            submitDelete(deletePersonal, id);
        }
    }


    // When component unmounts
    useEffect(() => {
        return () => {
            setSelectedRecentlyCreatedPackageList([]);
            setIsAllRecentlyCreatedSelected(false);
        };
    }, []);


    return(
        <div>
            
            <div className="background-container mt1 pdl0 pdr0 pb1">
                
                <div className="shipping-view">
                    <div onClick={() => viewHandler(true) }  className={`p1 ml1 shipping-view-btn pointer ${ viewtoggle? 'shipping-view-active' : ''}`}>
                        <p className="">  Personalisados </p>
                    </div>

                    <div onClick={() => viewHandler(false) } className={`p1 ml1 shipping-view-btn pointer ${ !viewtoggle? 'shipping-view-active' : ''}`}>
                        <p className="">  Encomiendas</p>
                    </div>
                    
                    {
                        isRecentlyCreatedDisplayed 
                        ? <SelectAllPackagesButton
                                selectedPackages = { selectedRecentlyCreatedPackageList }
                                selectAllRecentlyCreatedHandler = { selectAllRecentlyCreatedHandler }
                            />
                        : null
                    }
                </div>

                {
                    viewtoggle ?
                        <PackageList 
                            packageList = { packageData?.custom }
                            shippingType = { "custom" }
                            selectedRecentlyCreatedPackageList = { selectedRecentlyCreatedPackageList }
                            isRecentlyCreatedView = { isRecentlyCreatedDisplayed }
                            selectedrecentlyCreatedPackageHandler = { selectedrecentlyCreatedPackageHandler }
                            deletePackageHandler = { deletePackageHandler }
                        />
                    :
                        <PackageList 
                            packageList = { packageData?.parsel }
                            shippingType = { "parcel" }
                            selectedRecentlyCreatedPackageList = { selectedRecentlyCreatedPackageList }
                            isRecentlyCreatedView = { isRecentlyCreatedDisplayed }
                            selectedrecentlyCreatedPackageHandler = { selectedrecentlyCreatedPackageHandler }
                            deletePackageHandler = { deletePackageHandler }
                        />
                }
            </div>
        </div>
    );
}

export default AllShipments;