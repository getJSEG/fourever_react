import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProductTableItem from "./ProductTableItem";


//Style
import "../../static/css/components/inventory/productTable.css"

const ProductTable  = ({products, count,  isLoading }) => {

    const navigate = useNavigate();

    const handleProductItemClick = (productId) => {
        navigate(`/product/${productId}`);
    }
    
    return(
        <ul className="inventory-list" >
            {
                !isLoading && products.length !== 0 ? 
                    products?.map( (item) => { 
                        return <ProductTableItem 
                                handleClickEvent={handleProductItemClick}
                                key={item.product.id} product={item}/> 
                    }) : null
            }
        </ul>
    )
}


const mapStateToProps = state => ({
    products: state.products.products,
    count: state.products.count,
});


export default connect(mapStateToProps, {})(ProductTable);