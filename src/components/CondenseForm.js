import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';



// Style
import "../static/css/components/productPopupwindow.css"

const CondenseForm  = ({ closePopupForm }) => {

    const [formData, setFormData] = useState({ productName: '', brandName: '' });
    const {productName, brandName} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

 
    // add login to create product
    const onSubmit = (e) => {

    }

    return(
        <div className="product-popup-form">
            <div className="product-popup-wrapper">

                <div className="pop-form-close-btn">
                    <svg onClick={ e=> closePopupForm()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h3> Crear Producto </h3>
                <form onSubmit={e => onSubmit(e)} className="pop-up-product-form">
                    <input  className='product-fiel-input mb-3 form-control'
                            name="productName"
                            placeholder="Nombre la categoria"
                            type="text" 
                            onChange={e => onChange(e)}
                            value={productName}
                            ></input>

                    <input className="product-fiel-input mb-3"
                            name="brandName"
                            placeholder="Marca"
                            type="text"
                            autoComplete="on"
                            onChange={e => onChange(e)}
                            value={brandName}
                    ></input>

                    <button className="pop-up-create-product-button" type='submit'>
                        Crear Producto
                    </button>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(CondenseForm);