import React, { useState, useEffect, useRef }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
import { connect } from 'react-redux';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// API Calls
import { load_product } from "../actions/inventory/product";
import { deleteVarient } from "../actions/inventory/varients";
import { update_product } from "../actions/inventory/product";

// component
import Gallery from "../actions/product/Gallery";
import VarientList from "../components/product/VarientList";
import AlertMessage from "../components/AlertMessage";

//Styles
import "../static/css/pages/productDetail.css"

import "../static/css/components/productDetail/varientList.css"
import "../static/css/components/productDetail/VarientItemList.css"
import "../static/css/components/productDetail/createVarientFormCondense.css"
import "../static/css/components/productDetail/varientShortForm.css" 

const ProductDetail  = ({load_product, update_product, deleteVarient, isLoading, product, isCreationSuccess, varientMsg}) => {
    
    const params = useParams();

    const productId = params?.id
    const [varientState, setVarients] = useState([])
    const [productState, setProduct] = useState('')
    const [editForm, setEditForm] = useState(false)
    const [stockAvailable, setstockAvailable] = useState(0)
    const [showComponent, setShowComponent] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        brand: '',
        item_cost: ''
      });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })    
    }

    // When Component Loads API Call
    useEffect(() => {  
        load_product(productId);  
    },[product])

    // When the components loads this will add the varient to [varientState]
    useEffect(() => {
      if(!isLoading){
        setVarients([...product.varients])
        setProduct(product.product)
      }
    },[isLoading, product])
    // This counts the total units of the varients
    useEffect( () => {
        let availableStock = 0;
        varientState?.map( item => {
            availableStock = item.units + availableStock
        })
        setstockAvailable(availableStock)
    }, [product, varientState])


    const handleEditForm = () => {
        setEditForm(true)
    }
    const handleSave = () => {
        update_product(productId, formData)
        setEditForm(false)
    }






    // Alert Message
    useEffect(() => {

        if (isCreationSuccess) {
          const timeoutId = setTimeout(() => {
            setShowComponent(true);
            return clearTimeout(timeoutId)
          }, 300);
        }
      }, [isCreationSuccess]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowComponent(false);
            return clearTimeout(timeoutId)
          }, 3000);
    }, [showComponent]);

    return(
      <div className="main-container">
        {
            showComponent ? <AlertMessage message={varientMsg} isSuccess={isCreationSuccess}> </AlertMessage> : null
        }
        <h2 className="product-title-name"> Información sobre el Producto </h2>
        {/* product information */}
        
        <div className="product-wrapper">
            <div className="edit-save-button-container">
                <h1 className="product-detail-title"> {productState.name}  </h1>
                { editForm ? <button onClick={handleSave}> Salvar </button> : <button onClick={handleEditForm}> Editar </button>}
            </div>
        
            <div className="product-information-container">
                <div className="product-information"> 
                    <Gallery> </Gallery>

                    <div className="product-basic-information">
                        <p className="basic-information-title"> Informacion Basica</p>

                        <div className="product-detail-info-container">
                            <h3> Nombre: </h3>
                            { editForm ? <input name="name" type="text"  placeholder={productState.name} value={formData.productName} onChange={handleChange} /> : <p> {productState.name} </p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Marca: </h3>
                            { editForm ? <input name="brand" type="text"  placeholder={productState.brand} value={formData.productBrand} onChange={handleChange} /> : <p> {productState.brand} </p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Nuestro Costo: </h3>
                            { editForm ? <input name="item_cost" type="number"  placeholder={productState.item_cost} value={formData.productCost} onChange={handleChange} /> : <p> {productState.item_cost}</p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Precio: </h3>
                            { editForm ? <input name="price" type="number"  placeholder={productState.price} value={formData.productPrice} onChange={handleChange} /> : <p> {productState.price}</p> }
                        </div>
                        
                    </div>
                </div>

                <div className="stock-information-container">
                    <div className="stock-information"> 
                        <h5 className="stock-title"> Articulos </h5>
                        <div>
                            <p> Cantidad Disponible </p>
                            <h3> {stockAvailable} </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <VarientList productId={productId} productName={productState.name}> </VarientList>
      </div>  
    )
}


const mapStateToProps = state => ({
    product: state.product.product,
    isLoading: state.product.isLoading,
    isCreationSuccess: state.varients.isCreationSuccess,
    varientMsg: state.varients.message
});


export default connect(mapStateToProps, {load_product, update_product, deleteVarient})(ProductDetail);