// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";


import { formatCurrecy } from "../../../../utils/currencyFormatter";


import POSProduct from "./POSProduct";
// {productList, searchQuery, addItemToList, handleTagTabs, sku}

import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApiSlice";

// Get Categories Here
const POSProducts = ({addToShoppingCart, products, barcode}) => {

    // const [categories, setCategories] = useState(['Jeans', 'Camisas', 'Chaquetas', 'Cargos', 'Blusas'])

    const {
        data:
        categoriesData,
        isLoading
    } = useGetCategoriesQuery()

    // searchQuery Here
    const [searchQuery, setSearchQuery ] = useState('');

    const handleSearchQuery= (e) => { 
        e.preventDefault();
        setSearchQuery(e.target.value)
    }
    const handleTagTabs = (e) => {
        setSearchQuery(e.target.innerText.trim())
    }

    const clearSearch = () => {
        setSearchQuery('')
    }

    // const SelectProduct = (product) => {
    //     const productItem = {
    //         name: product?.product?.name,
    //         sku: product?.sku,
    //         unitPrice: product?.price,
    //         units: 1,
    //         price: product?.price * 1,
    //     } 
    //     addItemToList(productItem)
    // }


    return (
        <div className="pos-products-selector">
                <div className='sku-input-container'> 
                    <div className="search-wrapper pos-srch-wrapper">
                        <div className="srch-bar-container pos-srch-cont">
                            <div className="search-query-container">
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    placeholder="Buscar Producto"
                                    className="srch-inpt"
                                    onChange={(e) => handleSearchQuery(e) }
                                />
                            </div>

                            { searchQuery !== '' ?  
                                <div className="clear-btn-wrapper srch-buttons-con">
                                    <span className="icn-container" onClick={ clearSearch }>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" className="clear-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </span>
                                </div>
                                : <span className="empty-srch-x"></span>
                            }
                        </div>
                    </div>
                </div>
                {/* LIMIT TO 5 items at a time */}
                <ul className="pos-category-selector"> 
                    {
                        categoriesData?.map( (categorie, index) => {
                            return <li onClick={ (e) => { handleTagTabs(e) } } 
                                       key={categorie?.categorie }
                                       className={ searchQuery === categorie?.categorie ? 'product-cat-active': ' '} 
                                       value={categorie?.categorie}> {categorie?.categorie} 
                                    </li>
                        })
                    }
                </ul>

            <ul className="pos-products-container">
                {
                    products?.filter( (element) =>
                        element?.sku?.toLowerCase()?.indexOf(searchQuery.toLowerCase()) >= 0 ||
                        element?.product?.name?.toLowerCase()?.indexOf(searchQuery.toLowerCase())  >= 0
                    )
                    .map( (product) => {
                        return (
                            <POSProduct 
                                key={product?.sku} 
                                product={ product }
                                addToCart ={addToShoppingCart}
                                barcode={barcode}
                            />
                        )
                    })
                } 
            </ul>
        </div>
    );
}


export default POSProducts;