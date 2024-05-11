import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import { connect } from 'react-redux';


const VarientItemList  = ({id, name, brand, listed_price, purchase_price, size, units, sku, productId}) => {

    return(
        <div className="varient-list-conatiner">
            <NavLink className="varient-lnk" to={`/product/${productId}//varients`} >
                <div className="varient-item-img">
                    {/* <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa5Nmr12H-DeF07o0-YwYtNRatGfHIzA1aV0FMmLOTBWPwQlWIpdzLcWvf_-kwrYBCdT1wMaL1OFTxeq0JhMFNerlRwvp-aawqmA2iCL6mmcUub82JOLLgoMMo" /> */}
                </div>
                <div className="varient-info">
                    <div> 
                        <p>Nombre: </p>
                        <p>  { name } </p>
                    </div>
                    <div> 
                        <p>Marca: </p>
                        <p>  { brand } </p>
                    </div>
                    <div> 
                        <p> Talla: </p>
                        <p>  { size } </p>
                    </div>
                    <div> 
                        <p>Precio al Cliente: </p>
                        <p>${ listed_price } </p>
                    </div>
                    <div> 
                        <p>Nuestro Precio: </p>
                        <p>${ listed_price } </p>
                    </div>
                    <div> 
                        <p>Unidades: </p>
                        <p> { units } </p>
                    </div>
                    <div className="not-important-info"> 
                        <p>Codigo SKU: </p>
                        <p>{ sku } </p>
                    </div>
                    
                </div>
            </NavLink>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(VarientItemList);