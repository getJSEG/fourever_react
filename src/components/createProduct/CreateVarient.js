import React, { useState, useEffect }from "react";

import '../../static/css/pages/forms/createVarientForm.css'

// components
import Selector from "./Selector";

const CreateVarient  = ({ updateVariantForm, removeVariant=null, varientFormInfo=null, productName=null, id=null, handleUpdateImage}) => {
 
    const [formData, setFormData] = useState({ varId:id ? id : null,
        color: '', size: '', units: '', minUnits:'', price: '',
        categories: [] , vendorSKU:'',  storageLocation:'', varientImage:{}});

    const onChange = (e) => {
        const {name, value} =  e.target
        setFormData( {...formData, [name]: value }) 
    }

    const fileHandler = (e) => { 
        setFormData({...formData, [e.target.name]: {"filename": e.target?.files[0]?.name} });
        // Updating the image
        handleUpdateImage(e.target.files[0], id);
    }

    // this adds the items from the array if user selects it
    const categorieHandler = (option) => {
        if(!formData.categories.includes(option)){
            setFormData({...formData, ["categories"]: [...formData.categories, option] });
        }
    }
    // this removes the items from the list if the user presses the X
    const removeCategorie = (option) => {
        setFormData({...formData, ["categories"]: formData.categories?.filter( item => item !== option) });
    }

  

    useEffect(()=> {
        updateVariantForm(formData)
    }, [formData])

    // Check if the array has the id if not return null and unmount
    if(varientFormInfo != null)
        if(!varientFormInfo.some((object) => object?.varId === id)){ return null}
    // Unmounting
    useEffect( () => { return () => {  }; }, [])

    return(
        <div className={`background-container create-varient-full-form`}>

                <div className="variant-header">
                    <h3 className="varient-title"> { productName ? `${productName} ${formData?.color} `: 'Varient:'}</h3>

                    {
                        removeVariant !== null
                        ? <div>
                            <button className="btn-danger pointer rounded-lg p-05" onClick={(e) =>{ removeVariant(e, id)}}>
                                    Remover
                                </button>
                            </div>
                        :null

                    }
                    
                </div>

                <div className="required-inputs">
                    <div className="varient-form-wrapper"> 
                        <label htmlFor="color"> Color <span className="required">*</span>  </label>
                        <input  className="form-inputs p1 rounded-lg"
                                id="color"
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
                        <input  className="form-inputs p1 rounded-lg"
                                id="size"
                                name="size"
                                required
                                placeholder="Talla"
                                type="text"
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData.size} ></input>
                    </div>
                    
                    <div className="varient-form-wrapper">
                        <label htmlFor="price"> Precio <span className="required">*</span>  </label>
                        <input  className="form-inputs p1 rounded-lg"
                                id="price"
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
                        <input  className="form-inputs p1 rounded-lg"
                                id="units"
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
                        <input  className="form-inputs p1 rounded-lg"
                                id="minUnits"
                                name="minUnits"
                                required
                                placeholder="Unidades Minima"
                                type="number"
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={formData.minUnits} ></input>
                    </div>
                </div>

                
                <div className="varient-form-wrapper">
                    <label htmlFor="vendorSKU"> ID del proveedor </label>
                    <input  className="form-inputs p1 rounded-lg"
                            id="vendorSKU"
                            name="vendorSKU"
                            placeholder="ID del proveedor"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.vendorSKU} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="storageLocation"> Ubicación de Almacenamiento: </label>
                    <input  className="form-inputs p1 rounded-lg"
                            id="storageLocation"
                            name="storageLocation"
                            placeholder="UBICACIÓN DE ALMACENAMIENTO"
                            type="text"
                            autoComplete="off"
                            onChange={e => onChange(e)}
                            value={formData.storageLocation} ></input>
                </div>

                <div className="varient-form-wrapper">
                    <label htmlFor="varientImage"> Imágenes: </label>
                    <input className="form-inputs p1 rounded-lg"
                        type="file"
                        id="varientImage"
                        name="varientImage"
                        onChange={e => fileHandler(e)}
                        ></input>
                </div>

                <div className="varient-form-wrapper">
                    <span> Categoria </span>
                    <Selector
                        // data={catergoryData}
                        handler = {categorieHandler}
                        selectedCategories = {formData.categories}
                        removeCategorie={ removeCategorie }
                    />
                </div>
        </div>
    )
}

export default CreateVarient;