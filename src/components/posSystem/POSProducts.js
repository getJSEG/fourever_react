// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";


const POSProducts = ({productList, filterBy, addItemToList}) => {

    const [filteredArray, setFilteredArray] = useState([])
    // TODO: ADD A SUB ARRAY in case search for tags
    // TODO: CALL THE INVENTORY 
    const SelectProduct = (productName, varient) => {
        const productItem = {
            name: productName,
            sku: varient.sku,
            price: varient.price,
            qty: 1,
            qty_total: varient.price * 1,
        } 
        addItemToList(productItem)
    }

    /* {
                productsStart.filter( (product) =>
                    filterBy ? product.varients.some( item =>  item.sku.toLowerCase().includes(filterBy.toLowerCase())) : true
                )
                .reduce( (item, product) => (
                    <li onClick={ () => SelectProduct(product) } key={product.product.id} className="pos-product-list-item">
                        <div className="img-container"> <img src="https://i5.walmartimages.com/seo/NECHOLOGY-Womens-Pants-Stretch-Work-Pants-Women-Jeans-Womens-Skinny-Jeans-Casual-Mid-Waist-Pants-Trousers-Pockets-Classic-plus-Light-blue-XX-Large_ab0ae9b8-3e58-42f9-90ff-41aaca4a7b49.7437897b2ed7854200ff6a157899e906.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" /> </div>
                        <div className="info-container">
                            <p> { product.product.name } </p>
                            <p> {product.product.price} </p>
                            {}
                        </div>
                    </li> 
                ))
            } */
    // TODO: Check if array is empty
    return (
        <div className="pos-products-selector">

            
                    <ul className="pos-category-selector"> 
                        <li onClick={ (e) => { handleTagTabs(e) } } className={`product-cat-active`}> jeans</li>
                        <li onClick={ (e) => { handleTagTabs(e) }}> camisas </li>
                        <li onClick={ (e) => { handleTagTabs(e) } }> ropa interior </li>
                    </ul>

                    <ul className="pos-product-list-selector-ul">
            
                    {
                        productList.filter( (element) =>
                            
                            filterBy ? element.varients.some( item =>  {
                                return (
                                    item.sku.toLowerCase().indexOf(filterBy.toLowerCase()) )  >= 0 ||
                                    element.product.name.toLowerCase().indexOf(filterBy.toLowerCase())  >= 0
                            }) : true
                        )
                        .map( (product) => {

                        return product.varients.filter( (element) =>
                                filterBy ? element.sku.toLowerCase().indexOf( filterBy.toLowerCase())  >= 0 ||
                                        product.product.name.toLowerCase().indexOf(filterBy.toLowerCase()) >= 0 : true
                            ).map( (item) => {
                                return (
                                    <li onClick={ () => SelectProduct(product.product.name , item) } key={item.sku} className="pos-product-list-item">
                                        <div className="img-container"> <img src="https://i5.walmartimages.com/seo/NECHOLOGY-Womens-Pants-Stretch-Work-Pants-Women-Jeans-Womens-Skinny-Jeans-Casual-Mid-Waist-Pants-Trousers-Pockets-Classic-plus-Light-blue-XX-Large_ab0ae9b8-3e58-42f9-90ff-41aaca4a7b49.7437897b2ed7854200ff6a157899e906.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" /> </div>
                                        <div className="info-container">
                                            <p> { product.product.name } </p>
                                            <p className="pos-itemsku"> { item.sku } </p>
                                            <p> { item.price } </p>
                                        </div>
                                    </li>
                                )
                            })
                            
                        })
                    } 
                </ul>
                </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(POSProducts);