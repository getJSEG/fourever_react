import React, { useState, useEffect }from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import { useCreateProductMutation } from "../../features/products/productsApiSlice";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";

import { uploadImage } from "../../utils/uploadImages";

// Styles
import "../../static/css/pages/forms/createProductForm.css";

// Components 
import CreateVarient from "./CreateVarient";
import ErrorMessage from "../AlertMessage/ErrorMessage";

// Style for page and all components
const CreateProduct  = () => {

    const navigate = useNavigate();
    const uniqueId = uuidv4();
    const smallId = uniqueId.slice(0,8);

    // This is the POST Function 
    const [createProduct, {isLoading}] = useCreateProductMutation();

    const [formData, setFormData] = useState({ name: '', brand: '', cost: '', productAcronym: ''});
    const {name, brand, cost, productAcronym} = formData;

    const [varientFormInfo, setVarientFormInfo] = useState([]);
    const [variantImages, setVariantImages] = useState([]);

    // Messages Success or error
    const [errorMessage, setErrorMessage] = useState("");
 
    // This is controls the Form data for the Products
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }
 
    // THIS  Creates products
    const onSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const data = {
                ...formData,
                'variants': varientFormInfo
            }
            // creating object
            const retrivedData = await createProduct(data).unwrap();
            // uploading images to cloudFlare
            await uploadImage(retrivedData?.data?.upload, variantImages);
            navigate('/inventory', { state: {  successMessage: "Producto fue creado exitosamente"}});
        }catch(err) {
            errorMessageHandler(JSON.stringify(err?.data))
        }

    }
    // Removes Item from the aray
    const removeVariant = (e, id) => {
        e.preventDefault();

        if(varientFormInfo.length <= 1) {
            setErrorMessage("No se puede borrar, almenos un variente necesita estar presente")
        }
        // Remove the vairant from the product if its more that 1 item
        if(varientFormInfo.length > 1)
            setVarientFormInfo( prev => prev.filter( (item) => item?.varId !==  id ) );
        // Remove the image attache to the variant if a imge exist 
        if(variantImages.length > 0)
            setVariantImages( prev => prev.filter( (item) => item?.id !==  id ) );
    }

    //This Updates the existing items in the array
    const updateVariantForm = (form) => {
        const index = varientFormInfo.findIndex( (element) => element?.varId === form.varId );

        if(index !== -1){
            setVarientFormInfo((prev)=>  {
                let newArray = [...prev]
                newArray[index] = form
                return newArray
            });
        }
    }

    const handleUpdateImage = (image, id) => {
        const index = variantImages.findIndex( (element) => element?.id === id );

        if( index !== -1) {
            setVariantImages(  prev => {
                let newArray = [...prev]
                newArray[index].image = image
                return newArray
            });
        }
    }
    
    // This create an object with variant Id to have an object ready to update
    const addVarientToForm = () => { 
        setVarientFormInfo([...varientFormInfo, { varId:smallId }]);
        setVariantImages([...variantImages, { id:smallId }])
    }
    
    // Add a variant when it component mounts
    useEffect( () => { addVarientToForm(); }, []);
    
    // Whe unmounting clear all the variants from here
    useEffect( () => { 
        return() => { 
            setErrorMessage(""); 
            setVarientFormInfo([]);
        }
     }, []);

    return(
        <div className="create-product main-container">
                {
                    errorMessage && <ErrorMessage message={ errorMessage }
                                                  errorMessageHandler={ errorMessageHandler }/>
                }

                <p className="page-title"> Crear Producto </p>

                <form onSubmit={e => onSubmit(e)}  className="product-create-form">
                    <div className="background-container drk-gy-text-color create-product-fields">
                        <div className="create-product-wrapper"> 
                            <label className="xtrm-drk-gray" htmlFor="name"> Nombre del Producto <span className="required">*</span> </label>
                            <input  className="form-inputs p1 rounded-lg"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Nombre del producto"
                                    type="text" 
                                    autoComplete="off"
                                    onChange={e => onChange(e)}
                                    value={name} ></input>
                        </div>
                        
                        <div className="create-product-wrapper"> 
                            <label className="xtrm-drk-gray" htmlFor="brand"> Marca <span className="required">*</span>  </label>
                            <input className="form-inputs p1 rounded-lg"
                                    id="brand"
                                    name="brand"
                                    required
                                    placeholder="Marca"
                                    type="text"
                                    autoComplete="off"
                                    onChange={e => onChange(e)}
                                    value={brand} ></input>
                        </div>

                        <div className="create-product-wrapper">
                            <label className="xtrm-drk-gray" htmlFor="cost"> Costo <span className="required">*</span>  </label>
                            <input className="form-inputs p1 rounded-lg"
                                    id="cost"
                                    name="cost"
                                    required
                                    placeholder="Costo de la preda"
                                    type="Number"
                                    autoComplete="off"
                                    onChange={e => onChange(e)}
                                    value={ cost } ></input>
                        </div>

                        <div className="create-product-wrapper">
                            <label className="xtrm-drk-gray" htmlFor="productAcronym"> Acrónimo </label>
                            <input className="form-inputs p1 rounded-lg"
                                    id="productAcronym"
                                    name="productAcronym"
                                    placeholder="Acrónimo"
                                    type="text"
                                    autoComplete="off"
                                    onChange={e => onChange(e)}
                                    value={productAcronym} ></input>
                        </div>
                    </div>

                    {/* variants */}
                    <div className="add-variant-button-container"> 
                        <div className="add-btn btn-primary pointer rounded-lg" onClick={(e) => {   e.preventDefault(); addVarientToForm(e);} } >
                            <div className="add-btn-text"> <h4 className="pt9"> Añadir Variente </h4> </div>
            
                            <div className="add-btn-cross"> 
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 12 12" strokeWidth="20"
                                    fill="currentColor" >
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="add-varient">
                        {
                            varientFormInfo?.map( (element) =>
                                <CreateVarient 
                                    productName={name} 
                                    key={element?.varId} 
                                    id={`${element?.varId}`}
                                    varientFormInfo = {varientFormInfo}
                                    updateVariantForm={updateVariantForm} 
                                    handleUpdateImage={handleUpdateImage}
                                    removeVariant={removeVariant}
                                    // handleVarImages = { handleVarImages }
                            />)
                        }
                    </div>  

                    <button className="create-prd-button-form background-container btn-primary" type='submit'>
                        Crear Producto
                    </button>
                </form>
        </div>
    )
}

export default CreateProduct;