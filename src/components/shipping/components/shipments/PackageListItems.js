import React, { useState, useEffect, useRef }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";

// Api's
import { useUpdateParcelMutation } from "../../../../features/shipping/shippingApiSlice.js";
import { useUpdatePersonalizePackageMutation } from "../../../../features/shipping/shippingApiSlice.js";
// data
import { packageStatusType } from '../../../../utils/utilsdata.js';

const PackageListItems = ({customerName, address, totalAmount, dateCreated, status, packageId, index, shippingType,
    id, packageDetails, isRecentlyCreatedView, singleSelectCheckboxHandler, selectedRecentlyCreatedPackageList, deletePackageHandler}) => {

    const navigate = useNavigate();

    const [ parcelShipping ] = useUpdateParcelMutation();
    const [ personalShipping ] = useUpdatePersonalizePackageMutation();

    const [statusVisible, setStatusVisible] = useState(false);

    const statusVisibleHandler = () => {
        setStatusVisible(!statusVisible)
    }

    // This redirects to packageDetail with all of the package info ad an object
    const redirectHandler = () => {
        navigate('/package/details', { state: {packageId: packageId, shippingType:shippingType }});
    }

    // Submitting data to the back end when user changes the status
    const submit = async (e) => {
        e.preventDefault();
        const {name, value} =  e.target;
        if(shippingType === "parcel"){
            try{
                // send all information here
                const update = await parcelShipping({id:packageId, data:{ 
                                                                        "status": value,
                                                                        // "ShippingOrder": {
                                                                        //     "status": status
                                                                        // }
                                                                    
                                                                    }}).unwrap();
                // variant.current = update.data;
                console.log(update)
                setStatusVisible(false)
            }catch (err){
                console.log(err);
                // if(err?.originalStatus)
            }

        }else{
            try{
                const update = await personalShipping({id:packageId, data:{ "status": value }}).unwrap();
                // variant.current = update.data;
                console.log(update)
                setStatusVisible(false)
            }catch (err){
                console.log(err);
            }
        }
    }


    // const deletePackage = async () => {

    //     if(shippingType === "custom"){
    //         try{
    //             await deletePersonal(id).unwrap();
    //         } catch( err ) {
    //             console.log(err)
    //         }
    //     }else{
    //         try{
    //             await deleteParcel(id).unwrap();
    //         } catch( err ) {
    //             console.log(err)
    //         }
    //     }
    // }
        
    return(
        <ul className="package-list-item">
            <li className={`shipping-list-item p1 ${index === 0 ? '': 'mt1'}`}> 

                {
                    isRecentlyCreatedView
                    ?<div className="text-align-center package-spacing"> 
                        <input 
                            id={ id } 
                            type="checkbox"
                            value = { id }
                            onChange={ e => singleSelectCheckboxHandler(e) }
                            checked={ selectedRecentlyCreatedPackageList?.some( item =>  Number(item?.ORDEN) === Number(id)) }
                        />
                    </div>
                    : null
                }
                

                <div onClick={redirectHandler} className="pdl1 text-align-center color-txt-blue pointer package-spacing text-align-left"> <p className="overlap-text">{ customerName } </p> </div>
                <div className="text-align-center package-spacing justify-content-center"> { address }</div>
                <div className="text-align-center package-spacing justify-content-center"> { totalAmount } </div>
                <div className="text-align-center package-spacing justify-content-center"> { dateCreated }</div>

                <div className="text-align-center package-spacing justify-content-center justify-content-right" >
                    <div className="pdr1">
                        <select name="status" 
                            onChange= { (e) => submit(e) }
                            value = { status }  
                            className="shipping-status pointer" >
                            {
                                packageStatusType?.map( (obj) => {
                                    return Object.entries(obj).map( ([key, value]) => (
                                        <option 
                                        className="status-option-items pointer"
                                        value = {key} 
                                        key={key}> {value} </option>
                                    ))
                                })
                            }
                        </select>
                    </div>  
                </div>

                <div onClick={ () => { deletePackageHandler(shippingType, id); } }  className="text-align-center pointer ml3 justify-content-center justify-content-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill pointer" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg> 
                </div>

            </li>
        </ul>
    );
}

export default PackageListItems;