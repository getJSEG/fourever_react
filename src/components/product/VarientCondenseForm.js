import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

// API Call Function
import { CreateVarient } from "../../actions/inventory/varients";
import { load_product } from "../../actions/inventory/product";

import { NavLink } from "react-router-dom";

// Components
import AlertMessage from "../AlertMessage";

const VarientCondenseForm  = ({closePopupForm, CreateVarient, productId, isVarientLoading, isCreationSuccess, message, load_product}) => {

    const [formData, setFormData] = useState({ size: '', units: '', price: '', color:'', image:[] });
    const {size, units, price, color, image} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const [showComponent, setShowComponent] = useState(false)

    const fileHandler = (e) => { setFormData({...formData, [e.target.name]: e.target.files[0] }) }
    // SubmitForm, close Window and call product
    const onSubmit = async (event) => {
        event.preventDefault();
        
        CreateVarient(productId, formData).then( (result) => {
            if(result.payload.isCreationSuccess){
                closePopupForm();
                load_product(productId); 
                resetInformation(); 
            }else{
                alertMessage();
            }
        });
    }



    
    const resetInformation = () => async dispatch => {
        dispatch({
            type: 'DEFAULT',
            payload: {
                isVarientLoading: true,
                message: '',
                isCreationSuccess: false
            }
        })
    }

    const alertMessage = () => {
        if(!isVarientLoading){
            if(!isCreationSuccess) {
                const timeoutId = setTimeout(() => {
                    setShowComponent(true);
                    return clearTimeout(timeoutId)
                }, 300);
            }
        }
    }

    useEffect(() => {
        alertMessage();
        resetInformation(); 
    }, [isVarientLoading, isCreationSuccess]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowComponent(false);
            return clearTimeout(timeoutId)
        }, 3000);
    }, [showComponent]);

    return(
        <div className="pop-window-container">
            {
                showComponent ? <AlertMessage message={message} isSuccess={isCreationSuccess}> </AlertMessage> : null
            }
            <div className="pop-window">

                <div className="pop-form-close-btn">
                    <svg onClick={ e=> closePopupForm()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 20 20">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </div>

                <h3> Crear Variente </h3>
                <form onSubmit={e => onSubmit(e)} encType="multipart/form-data" className="varient-short-form">
                    
                    <div className="varient-short-form-wrapper"> 
                        <label htmlFor="size"> Medida/Tamaño </label>
                        <input  className="varient-short-form-input"
                                name="size"
                                placeholder="S / 12"
                                type="text" 
                                autoComplete="off"
                                required
                                onChange={e => onChange(e)}
                                value={size} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="units"> Unidades/Cantidad </label>
                        <input  className="varient-short-form-input"
                                name="units"
                                placeholder="1"
                                type="number" 
                                autoComplete="off"
                                required
                                onChange={e => onChange(e)}
                                value={units} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="price"> Precio </label>
                        <input  className="varient-short-form-input"
                                name="price"
                                placeholder="$12.00"
                                type="text" 
                                autoComplete="off"
                                
                                onChange={e => onChange(e)}
                                value={price} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="color"> Color </label>
                        <input  className="varient-short-form-input"
                                name="color"
                                placeholder="Negro"
                                type="text" 
                                autoComplete="off"
                                required
                                onChange={e => onChange(e)}
                                value={color} ></input>
                    </div>

                    <div className="varient-short-form-wrapper">
                        <label htmlFor="image"> Imagen De Color </label>
                        <input  type="file"
                                name="image"
                                className="varient-short-form-input"
                                onChange={e => fileHandler(e)}
                            ></input>
                    </div>

                    <div className="show-all-fields">
                        <NavLink className="products nav-links button-four" to="/createVarient"> 
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
    isVarientLoading: state.varients.isVarientLoading,
    isCreationSuccess: state.varients.isCreationSuccess,
    message: state.varients.message
});


export default connect(mapStateToProps, {CreateVarient, load_product})(VarientCondenseForm);