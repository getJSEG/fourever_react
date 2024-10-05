import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

import { CreateProduct } from "../../actions/inventory/products";
import { NavLink } from "react-router-dom";

const FormCondense  = ({ closePopupForm, CreateProduct }) => {

    const [formData, setFormData] = useState({ productName: '', brandName: '', itemCost: '', price:'', imageFiles:[] });
    const {productName, brandName, itemCost, price, imageFiles} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const fileHandler = (e) => { setFormData({...formData, [e.target.name]: e.target.files }) }
 
    // add login to create product
    const onSubmit = (event) => {
        event.preventDefault();

        CreateProduct (productName, brandName, itemCost, price, imageFiles);
        
        // ELSE throw an error message
        closePopupForm();
    }

    return(
        <div className="pop-window-container">
            <div className="pop-window">

                <div className="pop-form-close-btn">
                    <svg onClick={ e=> closePopupForm()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

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

                    <div className="show-all-fields">
                        <NavLink className="products nav-links button-four" to="/createProduct"> 
                            Mostrar todos los campos
                        </NavLink>
                    </div>

                    <button className="button-two" type='submit'>
                        Crear Producto
                    </button>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {CreateProduct})(FormCondense);