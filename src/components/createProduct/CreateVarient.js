import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

// import { CreateProduct } from "../actions/inventory/products";
import { NavLink } from "react-router-dom";

// TODO: Retrive the Catergories and have a drop down selector for the categories and tags
const CreateVarient  = ({ updateVariantForm, removeVariant, varientFormInfo, productName, id, handleUpdateImage}) => {

    const [formData, setFormData] = useState({ varId:id,
        color: '', size: '', units: '', minUnits:'', price: '',
        categorie: '' , vendorSKU:'',  storageLocation:'', varientImage:{}});

    const [inputError, setInputError] = useState({ color: false, size: false, units: false, minUnits: false, price: false,
        categorie: false , vendorSKU: false,  storageLocation: false, image: false});

    const onChange = e => {
        const {name, value} =  e.target
        setFormData( {...formData, [name]: value }) 
    }

    const fileHandler = (e) => { 
        setFormData({...formData, [e.target.name]: {"name": e.target?.files[0]?.name} });
        // Updating the image
        handleUpdateImage(e.target.files[0], id);
    }

  

    useEffect(()=> {
        updateVariantForm(formData)
    }, [formData])

    // Check if the array has the id if not return null and unmount
    if(!varientFormInfo.some((object) => object?.varId === id)){ return null}
    // Unmounting
    useEffect( () => { return () => {  }; }, [])

    return(
        <div className={`background-container create-varient-full-form p-styl-temp`}>

                <div className="varient-form-wrapper varient-wrapper-title">
                    <h3 className="varient-title"> { productName ? `${productName} ${formData?.color} `: 'Varient:'}</h3>

                    <div className="remove-variant-button">
                        <button onClick={(e) =>{ removeVariant(e, id)}}>
                            Remover
                        </button>
                    </div>
                </div>

               

                <div className="varient-form-wrapper"> 
                    <label htmlFor="color"> Color <span className="required">*</span>  </label>
                    <input  className={`varient-short-form-input var-full-form-input ${ inputError.color ? 'varient-obj-err' : ' '}`}
                            name="color"
                            required
                            placeholder="Color"
                            type="text" 
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.color} ></input>
                </div>
                
                <div className="varient-form-wrapper"> 
                    <label htmlFor="size"> Talla <span className="required">*</span>  </label>
                    <input className={`varient-short-form-input var-full-form-input ${inputError.size ? 'varient-obj-err' : ' '}`}
                            name="size"
                            required
                            placeholder="Talla"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.size} ></input>
                </div>
        {/* input-field-error */}
                <div className="varient-form-wrapper">
                    <label htmlFor="price"> Precio <span className="required">*</span>  </label>
                    <input className={`varient-short-form-input var-full-form-input ${ inputError.price ? 'varient-obj-err' : ' '}`} 
                            name="price"
                            required
                            placeholder="precio"
                            type="number"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.price} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="units"> Unidades <span className="required">*</span> </label>
                    <input className={`varient-short-form-input var-full-form-input ${ inputError.units ? 'varient-obj-err' : ' '} `}
                            name="units"
                            required
                            placeholder="Unidades"
                            type="number"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.units} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="minUnits"> Unidad Minima <span className="required">*</span>  </label>
                    <input className={`varient-short-form-input var-full-form-input ${ inputError.minUnits ? 'varient-obj-err' : ' ' }`}
                            name="minUnits"
                            required
                            placeholder="Unidades Minima"
                            type="number"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.minUnits} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="categorie"> Categoria </label>
                    <input className={`varient-short-form-input var-full-form-input ${ inputError.categorie ? 'varient-obj-err' : ' ' }`}
                            name="categorie"
                            placeholder="Categoria"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.categorie} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="vendorSKU"> ID del proveedor </label>
                    <input className={`varient-short-form-input var-full-form-input ${inputError.vendorSKU ? 'varient-obj-err' : ' '}`}
                            name="vendorSKU"
                            placeholder="ID del proveedor"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.vendorSKU} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="storageLocation"> Ubicación de Almacenamiento</label>
                    <input className={`varient-short-form-input var-full-form-input ${inputError.storageLocation ? 'varient-obj-err' : ' '}`}
                            name="storageLocation"
                            placeholder="UBICACIÓN DE ALMACENAMIENTO"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.storageLocation} ></input>
                </div>

        
                <div className="varient-form-wrapper">
                    <label htmlFor="varientImage"> imágenes </label>
                    <input className={`varient-short-form-input ${inputError.image ? 'varient-obj-err' : ' '}`}
                        type="file"
                        name="varientImage"
                        onChange={e => fileHandler(e)}
                        ></input>
                </div>
        </div>
    )
}


// const mapStateToProps = state => ({
//     varientsCreationFail: state.varients.varientsCreationFail
// });


export default CreateVarient;