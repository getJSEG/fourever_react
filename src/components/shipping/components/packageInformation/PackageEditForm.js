import React, { useState, useEffect, useRef }from "react";
import { useNavigate, useParams, useLocation, Link} from "react-router-dom";

// imported data
import { packageStatusType } from '../../../../utils/utilsdata.js';
import { orderStatusType } from '../../../../utils/utilsdata.js'
import { allLocations } from "../../../../utils/utilsdata.js";

import CompanyDropDown from "./companyDropdown.js";
import PackageItems from "./PackageItems.js";

const PackageEditForm  = ({packageDetails, isEditable, customerDataHandler, customerData, shippingType, storeInventory,
                           shoppingCart, removeItemFromCart, shoppingCarthandler, addOneQtyHandler, removeOneQtyHandler, shippingOrderHandler, shippingOrder}) => {

    const packageStatusRef = useRef(null);
    const orderStatusRef = useRef(null);

    const [isPackageStatusVisable, setIsPackageStatusVisable] = useState(false);
    const [isOrderStatusVisable, setIsOrderStatusVisable] = useState(false);
    const [isOrderPaid, setIsOrderPaid] = useState(false);
    const [municipalities, setMunicipalities] = useState([]);

    // // handle package status handler
    // const packageStatusVisibleHandler = () => {
    //     setIsPackageStatusVisable(!isPackageStatusVisable);
    // }

    // // handler order status handler
    // const orderStatusVisibleHandler = () => {
    //     setIsOrderStatusVisable(!isOrderStatusVisable);
    // }

    // this is for remove the focus package order
//    const handlePackageStatusClickOutside = (event) => {
//         if (packageStatusRef.current && !packageStatusRef.current.contains(event.target)) {
//             setIsPackageStatusVisable(false);
//         }
//     }
    // this is for the order status click outside its button
    // const handleOrderStatusClickOutside = (event) => {
    //     if (orderStatusRef.current && !orderStatusRef.current.contains(event.target)) {
    //         setIsOrderStatusVisable(false);
    //     }
    // }


    // This filters out all municipalities from the deprtment that is selected.,
    const getMunicipalityList = () => {
        const filteredDepartment = allLocations?.filter( item => item?.nombre === customerData?.department)
        setMunicipalities(filteredDepartment[0]?.municipios)
    }

    // when the components loads run function
    useEffect( () => {
        getMunicipalityList();
    }, [])
    // listens for change in department and run function
    useEffect( () => {
        getMunicipalityList();
    }, [customerData?.department])

    // //UseEffect
    // useEffect(() => {
    //         // when component is mounted
    //         document.addEventListener('mousedown', handlePackageStatusClickOutside);
    //         document.addEventListener('mousedown', handleOrderStatusClickOutside);
    //         setIsOrderPaid(packageDetails?.ShippingOrder?.status === "PAID");
    //         // unmounting
    //         return () => { 
    //             document.removeEventListener('mousedown', handlePackageStatusClickOutside); 
    //             document.removeEventListener('mousedown', handleOrderStatusClickOutside); 
    //         };
    // }, []);





    return (
        <div >  
            <div className="background-container mt1">
                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Compania: </p>
                    {
                        isEditable
                        ? <CompanyDropDown 
                            shippingType = { shippingType } 
                            packageDetails = { packageDetails }
                        />
                        :<p> { packageDetails?.companyName } </p>
                    }
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Detalles: </p>
                    <p> { packageDetails?.details } </p>
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Peso: </p>
                    <p> { packageDetails?.weight } </p>
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Estado: </p>
                    {
                        isEditable 
                        ?  ( <div className="pdr1">
                                <select name="status" 
                                    onChange= { (e) => customerDataHandler(e) }
                                    value = { customerData?.status }  
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
                        )
                        :
                        <p> { packageDetails?.status } </p>
                    }
                    
                </div>
            </div>


            <div className="background-container mt1">
                <h3>  Informacion del Cliente </h3>
                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Nombre: </p>
                    
                    {
                        isEditable
                        ? <div className="width-50">
                            <input
                                className="form-inputs p1 width-100 rounded-lg"
                                id="firstName"
                                name="firstName"
                                required
                                placeholder="John"
                                type="text" 
                                autoComplete="off"
                                onChange={e => customerDataHandler(e)}
                                value={customerData.firstName}></input>
                        </div>
                        : <p> { customerData?.firstName } </p>
                    }
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Apellido: </p>
                    {
                        isEditable
                        ? <div className="width-50">
                                <input
                                    className="form-inputs p1 width-100 rounded-lg"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Smith"
                                    type="text" 
                                    autoComplete="off"
                                    onChange={e => customerDataHandler(e)}
                                    value={customerData.lastName}></input>
                            </div>
                        : <p> { customerData?.lastName } </p>
                    }
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Numbero: </p>
                    <p>+{ customerData?.countryCode }&nbsp;</p>
                    {
                        isEditable
                        ? <div className="width-50">
                                <input
                                    className="form-inputs p1 width-100 rounded-lg"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="123-123"
                                    type="text" 
                                    autoComplete="off"
                                    onChange={e => customerDataHandler(e)}
                                    value={customerData?.phoneNumber}></input>
                            </div>
                        : <p> { customerData?.phoneNumber } </p>
                    }
                </div>
            </div>

            <div className="background-container mt1">
                <h3>  Dirreccion: </h3>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Pais: </p>
                    <p> { customerData?.country } </p>
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Direccion: </p>
                    {
                        isEditable
                        ? <div className="width-50">
                                <input
                                    className="form-inputs p1 width-100 rounded-lg"
                                    id="streetAddress"
                                    name="streetAddress"
                                    required
                                    placeholder="Casa 3"
                                    type="text" 
                                    autoComplete="off"
                                    onChange={e => customerDataHandler(e)}
                                    value={ customerData?.streetAddress}></input>
                            </div>
                        : <p> { customerData?.streetAddress } </p>
                    }
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Detalles: </p>
    
                    {
                        isEditable
                        ? <div className="width-50">
                                <input
                                    className="form-inputs p1 width-100 rounded-lg"
                                    id="extraDetails"
                                    name="extraDetails"
                                    placeholder="Casa 3"
                                    type="text" 
                                    autoComplete="off"
                                    onChange={e => customerDataHandler(e)}
                                    value={customerData?.addressLineTwo}></input>
                            </div>
                        : <p> { customerData?.addressLineTwo } </p>
                    }
                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Departamento: </p>
                    {
                        isEditable 
                        ?   <div className="width-50">
                                <select value={customerData?.department} 
                                        id="department"
                                        name="department"
                                        onChange={ e => customerDataHandler(e) }
                                        className="form-inputs p1 width-100 rounded-lg">
                                    <option value="" disabled>Selecciona </option>

                                    {
                                        allLocations?.map( item => {
                                            return <option className="pt15" value={item?.nombre} key={item?.id}> { item?.nombre } </option>
                                        })
                                    }
                                </select>
                            </div>
                        : 
                        <div>
                            <p> { packageDetails?.customer?.department } </p>
                        </div>
                    }
                    


                </div>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Municipio: </p>
                    {
                        isEditable
                        ? <div className="width-50">
                                    <select value={customerData.municipality} 
                                            id="municipality"
                                            required
                                            name="municipality"
                                            onChange={ e => customerDataHandler(e) }
                                            className="form-inputs p1 width-100 rounded-lg">
                                        <option value="" disabled>Selecciona </option>

                                        {
                                            municipalities?.map( item => (
                                                <option className="pt15"  value={item?.nombre} key={item?.id_mun}> { item?.nombre } </option>
                                            ))
                                        }
                                        
                                    </select>
                                </div>
                            : <p> { customerData?.municipality } </p>
                        
                    }
                </div>
            </div>

            <div className="background-container mt1">
                <h3>  Informacion de la orden: </h3>

                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> total: </p>
                    <p> { packageDetails?.shippingOrder?.totalAmount } </p>
                </div>



                {/* This is editable only if the order is not paid  */}
                <div className="variant-info-container">
                    <p className="fw700 pt13 pdr1"> Estado: </p>
                    {
                        isEditable 
                        ? <select
                            onChange={ (e) => shippingOrderHandler(e) }
                            name="status"
                            className="shipping-status pointer"
                            value= { shippingOrder?.status }
                            >
                            {
                                orderStatusType?.map( (obj) => {
                                    return Object.entries(obj).map( ([key, value]) => (
                                        <option 
                                        className="status-option-items pointer" 
                                        key={key}
                                        value= { key }
                                        > { value } </option>
                                    ))
                                })
                            }
                        </select>
                        :
                        <p> { shippingOrder?.status } </p>
                    }
                    
                </div>
            </div>

        
            <div className="background-container mt1">
                <h3> Productos en el paquete: </h3>
                
                <PackageItems
                    isEditable = { isEditable }
                    storeInventory = { storeInventory }
                    shoppingCart = { shoppingCart }
                    removeItemFromCart = { removeItemFromCart }
                    shoppingCarthandler = { shoppingCarthandler }
                    addOneQtyHandler = { addOneQtyHandler }
                    removeOneQtyHandler = { removeOneQtyHandler }
                />
        
            </div>

        </div>  
    );
}

export default PackageEditForm;