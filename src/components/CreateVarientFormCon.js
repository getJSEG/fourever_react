import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';



// Style
import "../static/css/components/productPopupwindow.css"

const CreateVarientFormCon  = ({ closePopupForm }) => {

    const [formData, setFormData] = useState({ varientName: '', brandName: '', varientSize: '', clientPrice: '' , vendorPrice: '', unitPrice: '' });
    const {varientName, brandName, varientSize, clientPrice, vendorPrice, unitPrice} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

 
    // add login to create Varient
    const onSubmit = (e) => {

    }

    return(
        <div className="create-varient-form-container">
            <div className="create-varient-form-wrapper">

                <div className="pop-form-close-btn">
                    <svg onClick={ e=> closePopupForm()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h3> Crear Producto </h3>
                <form onSubmit={e => onSubmit(e)} className="create-varient-condense-Form">
                    <input  className='create-varient-name'
                            name="varientName"
                            placeholder="Nombre"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={varientName}
                            ></input>

                    <input className="create-varient-brand"
                            name="brandName"
                            placeholder="Marca"
                            type="text"
                            autoComplete="on"
                            onChange={e => onChange(e)}
                            value={brandName}
                    ></input>

                    <input  className='create-varient-size'
                            name="varientSize"
                            placeholder="Talla"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={varientSize}
                            ></input>
                    
                    <input  className='create-varient-price'
                            name="clientPrice"
                            placeholder="Precio al Cliente"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={clientPrice}
                            ></input>

                    <input  className='create-varient-vendor-price'
                            name="vendorPrice"
                            placeholder="Precio del Proveedor"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={vendorPrice}
                            ></input>
                    
                    <input  className='create-varient-unit'
                            name="unitPrice"
                            placeholder="unidades"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={unitPrice}
                            ></input>

                    <button className="pop-up-create-varient-button" type='submit'>
                        Crear Producto
                    </button>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(CreateVarientFormCon);