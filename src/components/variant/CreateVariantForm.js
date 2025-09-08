import React, { useState, useEffect }from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// import Sel
import Selector from "../createProduct/Selector";
import ErrorMessage from "../AlertMessage/ErrorMessage";

import { useCreateVariantMutation } from "../../features/variants/variantsApiSlice";
import { uploadImage } from "../../utils/uploadImages";


const CreateVariantForm = ({}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const uniqueId = uuidv4();
    const smallId = uniqueId.slice(0,8);

    // if their no product ID redirect to variants
    if(!id){
        navigate('/inventory');
    }

    const [createVariant, isLoading]  = useCreateVariantMutation();
    
    const [formData, setFormData] = useState({ product:id, 
        color: '', size: '', units: '', minUnits:'', price: '',
        categories: [] , vendorSKU:'',  storageLocation:'', varientImage:{}});
    
    const [variantImages, setVariantImages] = useState([]);

    // Message Hanling Here
    // Messages Success or error
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState('');
    
    const errorMessageHandler = (message) => {
        setErrorMessage(message)
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

    // handles all input fields text or numbers
    const onChange = (e) => {
        const {name, value} =  e.target
        setFormData( {...formData, [name]: value }) 
    }
    // handles images
    const fileHandler = (e) => { 
        setFormData({...formData, [e.target.name]: {"filename": e.target?.files[0]?.name} });
        //adding and removing all item in this array
        // id is always 1 because you can only create 1 variant at a time
        setVariantImages([{id:1, image:e.target.files[0]}])
    }
   
    // Submits the form to creat variant
    const onSubmit = async (e) => {
        e.preventDefault();

        try{            
            const variant = await createVariant(formData).unwrap();
            // Create image here
            await uploadImage(variant?.data?.upload, variantImages);

            // redirect to Product view when imges are uploaded
            navigate(`/product/${id}`, { state: { successMsg: "Variente Creado" }});
        }catch(err) {
            if (err?.status === 400){
                errorMessageHandler(err?.data?.error);
            }else{
                errorMessageHandler("algo salio mal");
            }
        }
    }
    
    
    useEffect( () => { 
    return() => { setErrorMessage('') }
    }, []);
    
    return(
        <div className="main-container ">
            {
                errorMessage && <ErrorMessage message={errorMessage}
                                             errorMessageHandler={errorMessageHandler}/>
            }
            <p className="page-title"> This is create form Variant</p>

            <div className="background-container">
                <form onSubmit={e => onSubmit(e)}  className="product-create-form">
                <div className="required-inputs ">
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

                        <button className="btn-primary p1 rounded-lg pointer">
                            Crear Variente
                        </button>
                    </form>
                </div>
            
        </div>
    )
}


export default CreateVariantForm;