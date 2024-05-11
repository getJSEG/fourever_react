import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { load_products } from '../actions/products';

// TODo: Dispaly the number of varients
// TODO: Display the toal value of products

// component
import Product from "../components/InventoryProduct";
import CondenseForm from "../components/CondenseForm";

//Styles
import "../static/css/pages/inventory.css"

const Inventory  = ({ load_products, products, isLoading }) => {
    
    let [productData, setProductData] = useState([])
    const [totalProductValue, settotalProductValue ] = useState(0)
    const [totalProductItems, setTotalProductItems] = useState(0)
    const [totalProductCategories, settotalProductCategories] = useState(0)
    const [popup, setpopup] = useState(false)
    const closePopupForm= e => { setpopup(false) }
    const openPopupForm = e => { setpopup(true) }


    const GettotalProductValue = (price) => {

    }

    const getTotalProductItems = () => {
        settotalProductCategories(productData.length);
    }

    useEffect(()=> { load_products(); }, [])

    useEffect(()=> {
        if(!isLoading){
            setProductData([...products]);
        }
    }, [isLoading])

    useEffect(()=> {
        if(!isLoading && productData !== null){
            getTotalProductItems();
        }
        
    }, [productData])

    return(
      <div id="inventory-page-container">
        <h2> Productos </h2>

        <div className="product-info-container">
            <div className="abre-prodict-info">
                <p> Numero de Caregorias: </p>
                <h5> {totalProductCategories} </h5>
            </div>

            <div className="abre-prodict-info"> 
                <p>Unidades Total: </p>
                <h5> 140 </h5>
            </div>

            <div className="abre-prodict-info">
                <p> Valor de la Tienda: </p>
                <h5> $600.00 </h5>
            </div>
        </div>

        {/* products */}
        <div className="product-container">
            <div className="product-list-container">

                {
                    !isLoading ? productData?.map( (item) => { 
                        return <Product key={item.id} id={item.id} name={item.name} brand={item.brand} productAcro={item.product_acronym} /> 
                    }) : 
                    <h1> LOADING </h1>
                }

                { popup ? <CondenseForm closePopupForm={closePopupForm}/> : null}
                

                <div onClick={openPopupForm} className="create-product-button-m"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" className="bi bi-plus" viewBox="-3 -3 20 20">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </div>
            </div>
        </div>
        
      </div>  
    )
}


const mapStateToProps = state => ({
    products: state.products.products,
    isLoading: state.products.isLoading,
});


export default connect(mapStateToProps, {load_products})(Inventory);