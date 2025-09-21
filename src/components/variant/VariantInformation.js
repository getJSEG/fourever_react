import React, { useState, useEffect, useRef }from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ToggleButton from "../common/ToggleButton";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import Loading from "../common/Loading";

// utils
import { formatCurrecy } from "../../utils/currencyFormatter";

// Updating Functions Here
import { useUpdateVariantMutation } from "../../features/variants/variantsApiSlice";
import { useDeleteVariantMutation } from "../../features/variants/variantsApiSlice";
// Style
import "../../static/css/pages/variant/variantInformation.css";


// TODO: HANDLE updating images
const CreateVariantForm = ({}) => {

    const location = useLocation();
    const navigate = useNavigate();

    let variant = useRef(location?.state?.variant)

    const [updateVariant, { isLoading, refetch }] = useUpdateVariantMutation();
    

    // form Data
    const [formData, setFormData] = useState({
            color: '', size: '', units: '', minUnits:'', price: '', isActive: variant.current?.isActive,
            categories: [] , vendorSKU:'',  storageLocation:'', varientImage:{}});

    const [isEditable, setIsEditable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }
    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const removeEmptyFields = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (
                obj[key] === null ||
                obj[key] === undefined ||
                obj[key] === ''
              ) {
                delete obj[key];
              } else if (typeof obj[key] === 'object') {
                removeEmptyFields(obj[key]);
                if (Object.keys(obj[key]).length === 0) {
                  delete obj[key];
                }
              }
            }
          }
          return obj;
    }

    // Active form data
    const toggleIsActive = async () => {
        setFormData({...formData, ["isActive"]: !formData.isActive});
        try{
            const update = await updateVariant({id:variant.current?.id, data:{ "isActive": !formData.isActive }}).unwrap();
            variant.current = update.data;
            console.log(update)
            successMessageHandler(update?.message);
        }catch (err){
            errorMessageHandler(JSON.stringify(err?.data));
        }
    }

    const handleIsEditable = async () => {
        if(isEditable) {
            // save edita changes
            setIsEditable(false);
            const cleanedData = removeEmptyFields(formData);
            if(cleanedData) {
                try{
                    
                    const update = await updateVariant({id:variant.current?.id, data: cleanedData}).unwrap();
                    variant.current = update.data;
                    successMessageHandler(update?.message)
                    // handleVisibleMsg(false, true, update?.message);
                }catch (err){
                   errorMessageHandler(JSON.stringify(err?.data))
                    // handleVisibleMsg(true, true, err?.message);
                }
            }
        }else{
            setIsEditable(true);
        }
    }

    return(
        <div className="main-container">
            <p className="page-title"> Informacion del Variante </p>
            {
                errorMessage && <ErrorMessage message= {errorMessage} 
                                              errorMessageHandler={errorMessageHandler}/>
            }
            {
                successMessage && <SuccessMessage message = {successMessage} 
                                                  successMesageHandler={successMessageHandler}/>
            }
            <div className="rounded-lg pointer create-btn pt10 mt1 remove-underline mb1" onClick={() => navigate(-1) }> 
                Regresar 
            </div>

            <div className="background-container gray-txt-90">
                {/* Button Container */}
                <div className="variant-editable-btn-container">
                    {isEditable ? 
                        <button onClick={(e) => handleIsEditable() } className="variant-btn btn-primary pointer rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
                                <path d="M12 2h-2v3h2z"/>
                                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
                            </svg>
                        </button>
                        : 
                        <button onClick={(e) => handleIsEditable() } className="variant-btn btn-primary pointer rounded-lg"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="varient-list-svg" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button> }
                </div>

                {/*  */}
                <div className="">
                    
                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> ID/SKU: </p>
                        <p> {variant.current?.sku } </p>
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Color: </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="color"
                                name="color"
                                placeholder={ variant.current?.color  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.color} 
                                />
                            :<p> {variant.current?.color } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Medida: </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="size"
                                name="size"
                                placeholder={ variant.current?.size  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.size} 
                                />
                            :<p> { variant.current?.size } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Unidades: </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="units"
                                name="units"
                                placeholder={ variant.current?.units  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.units} 
                                />
                            :<p> { variant.current?.units } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1">Price: </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="price"
                                name="price"
                                placeholder={ variant.current?.price  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.price} 
                                />
                            :<p> { formatCurrecy(variant.current?.price) } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Unidades Minima: </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="minUnits"
                                name="minUnits"
                                placeholder={ variant.current?.minUnits  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.minUnits} 
                                />
                            :<p> { variant.current?.minUnits } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Ubicacion : </p>
                        {
                            isEditable
                            ? <input
                                className="form-inputs p-05 rounded-lg"
                                id="storageLocation"
                                name="storageLocation"
                                placeholder={ variant.current?.storageLocation  }
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData?.storageLocation} 
                                />
                            :<p> { variant.current?.storageLocation } </p>
                        }
                    </div>

                    <div className="variant-info-container">
                        <p className="fw700 pt13 pdr1"> Activo: </p>
                        {
                            <ToggleButton 
                                toggle = {formData?.isActive}
                                onChange = { toggleIsActive }
                            />
                        }
                    </div>
                </div>
                

                <div className="variant-info-container">
                    <p className="fw500 pt13 pdr1"> Dia Creado: </p>
                    <p> { variant.current?.createdDate } </p>
                </div>


            </div>
        </div>
    )
}


export default CreateVariantForm;