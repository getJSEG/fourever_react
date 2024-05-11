import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import { connect } from 'react-redux';

const InventoryProduct  = ({id, name, brand, productAcro }) => {

    return(
        <div className="product">
            <NavLink className="product-lnk" to={`/product/${id}/varients`} >
                <div className="product-item-img">
                    <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa5Nmr12H-DeF07o0-YwYtNRatGfHIzA1aV0FMmLOTBWPwQlWIpdzLcWvf_-kwrYBCdT1wMaL1OFTxeq0JhMFNerlRwvp-aawqmA2iCL6mmcUub82JOLLgoMMo" />
                </div>
                <div className="product-item-name">
                    <p className="product-name">Categoria: { name }</p>
                    <p>Marca: { brand } </p>
                    <p>variendades: <span className="varient-quaitity"> 5 </span> </p>
                    {productAcro !== null ? <p>Acronymo: {productAcro} </p> : null}
                    
                </div>
            </NavLink>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(InventoryProduct);