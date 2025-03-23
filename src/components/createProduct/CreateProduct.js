import React, { useState, useEffect }from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { useCreateProductMutation } from "../../features/products/productsApiSlice";
import { uploadImage } from "../../utils/uploadImages";

// Styles
import "../../static/css/pages/createProductFullForm.css";
import '../../static/css/pages/createVarientFullForm.css'

// Components 
import CreateVarient from "./CreateVarient";
// import CreateVarient from "../createVarientFullForm/CreateVarient";
// import AlertMessage from "../common/AlertMessage";

// Style for page and all components
const CreateProduct  = () => {

    const [createProduct, {isLoading}] = useCreateProductMutation()

    const [formData, setFormData] = useState({ name: '', brand: '', cost: '', productAcronym: ''});
    const {name, brand, cost, productAcronym} = formData;

    const [varientFormInfo, setVarientFormInfo] = useState([]);
    const [variantImages, setVariantImages] = useState([]);
 
    const navigate = useNavigate();
    const uniqueId = uuidv4();
    const smallId = uniqueId.slice(0,8);

    // This is controls the Form data for the Products
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
 
    // // add login to create product
    const onSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const data = {
                ...formData,
                'variants': varientFormInfo
            }

            const retrivedData = await createProduct(data).unwrap()

            await uploadImage(retrivedData?.data?.upload, variantImages)

            navigate('/inventory');
        }catch(err) {
            console.log(JSON.stringify(err))
            console.log("rthis is is an erro")
        }

    }
    // Removes Item from the aray
    const removeVariant = (e, id) => {
        e.preventDefault();
        // Remove the vairant from the product if its more that 1 item
        if(varientFormInfo.length > 1)
            setVarientFormInfo( prev => prev.filter( (item) => item?.varId !==  id ) );
        // Remove the image attache to the variant if a imge exist 
        if(variantImages.length > 0)
            setVariantImages( prev => prev.filter( (item) => item?.id !==  id ) );
    }


    // const handleUpdates = (getter, setter, id) => {
    //     const index = getter.findIndex( (element) => element?.varId === form.varId );

    //     if(index !== -1){
    //         setter((prev)=>  {
    //             let newArray = [...prev]
    //             newArray[index] = form
    //             return newArray
    //         });
    //     }
    // }

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
        return( () => {
            setVarientFormInfo([]);
            setVariantImages([]);
        });
     }, []);
    return(
        <div className="create-product main-container">
                {/* { message !== '' ? <AlertMessage message={ message } showMessage={ !isError }/>  : null} */}
                <h3 className="create-product-title"> Crear Producto </h3>

                <form onSubmit={e => onSubmit(e)}  className="product-create-form">
                    <div className="background-container drk-gy-text-color create-product-fields">
                        <div className="create-product-wrapper"> 
                            <label className="xtrm-drk-gray" htmlFor="name"> Nombre del Producto <span className="required">*</span> </label>
                            <input  className='varient-short-form-input'
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
                            <input className="varient-short-form-input"
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
                            <input className="varient-short-form-input"
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
                            <input className="varient-short-form-input"
                                    name="productAcronym"
                                    placeholder="Acrónimo"
                                    type="text"
                                    autoComplete="off"
                                    onChange={e => onChange(e)}
                                    value={productAcronym} ></input>
                        </div>
                    </div>

                    <div className="add-var-container"> 
                        <h3 className="prd-add-var-title" > Agregar Variente </h3>
                        <button className="add-var-in-prod drk-gy-text-color" onClick={(e) => {e.preventDefault(); addVarientToForm(e);} } > + </button>
                    </div>

                    <div className="add-varient">
                        {
                            varientFormInfo.map( (element) =>
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

                    <button className="create-prd-button-form background-container" type='submit'>
                        Crear Producto
                    </button>
                </form>
        </div>
    )
}

export default CreateProduct;