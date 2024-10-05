import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

import { CreateProduct } from "../actions/inventory/products";
import { NavLink } from "react-router-dom";

// Style for page and all components
const CreateProductFullForm  = ({ CreateProduct }) => {

    const [formData, setFormData] = useState({ productName: '', brandName: '', itemCost: '', price:'', imageFiles:[] });
    const {productName, brandName, itemCost, price, imageFiles} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const fileHandler = (e) => { setFormData({...formData, [e.target.name]: e.target.files }) }
 
    // add login to create product
    const onSubmit = (event) => {
        event.preventDefault();
        CreateProduct (productName, brandName, itemCost, price, imageFiles);
        
        // TODO: If the item was success close window 
        // ELSE throw an error message
    }

    return(
        <div className="main-container">

                <h3 className="short-form-title"> Crear Producto </h3>
                <form onSubmit={e => onSubmit(e)} className="varient-short-form">
                    <div className="varient-short-form-wrapper"> 
                        <label htmlFor="productName"> Nombre del Producto </label>
                        <input  className='varient-short-form-input'
                                name="productName"
                                placeholder="Nombre producto"
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={productName} ></input>
                    </div>
                    
                    <div className="varient-short-form-wrapper"> 
                        <label htmlFor="brandName"> Marca </label>
                        <input className="varient-short-form-input"
                                name="brandName"
                                placeholder="Marca"
                                type="text"
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={brandName} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="itemCost"> Costo </label>
                        <input className="varient-short-form-input"
                                name="itemCost"
                                placeholder="Costo de la preda"
                                type="text"
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={itemCost} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="price"> Precio </label>
                        <input className="varient-short-form-input"
                                name="price"
                                placeholder="precio"
                                type="text"
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={price} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="imageFiles"> imágenes </label>
                        <input type="file"
                            multiple
                            name="imageFiles"
                            className="varient-short-form-input"
                            onChange={e => fileHandler(e)}
                            ></input>
                    </div>

                    <button className="button-two" type='submit'>
                        Crear Producto
                    </button>
                </form>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {CreateProduct})(CreateProductFullForm);