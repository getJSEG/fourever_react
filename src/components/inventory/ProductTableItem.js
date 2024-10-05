import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import { connect } from 'react-redux';

const ProductTableItem  = ({ product, handleClickEvent }) => {
    // console.log(product)
    const [units, setUnits] = useState(0)


    useEffect(()=> {  
        let tempUnit = 0
        let varients = '';

        if(product.varients.length >= 0) {

            varients = product.varients

            for(let i= 0; i < varients.length ; i++) {
                tempUnit = varients[i].units + tempUnit;
            }
            setUnits (tempUnit)
        }

    }, [product]) 

    const handleSetting  = () => {
        console.log("this setting button is clock")
    }

    return(
        <li className="list-item">
            <div className="clickable-position " onClick={() => handleClickEvent(product.product.id)}>
                <div className="image-container">
                    <img className="image" src={ product.product.album !== null ? 
                                                                    product.product.album.images.length !== 0 ? product.product.album.images[0].images : "https://shop.wantable.com/cdn/shop/files/Variant_512939_stream-1713552907.jpg?v=1715623296" : "https://shop.wantable.com/cdn/shop/files/Variant_512939_stream-1713552907.jpg?v=1715623296" }/>
                </div>

                <div className="inventory-information">
                    <div className="b-title">
                        <h2 className="title"> {product.product.name}</h2>
                    </div>

                    <div className="secondary-information"> 
                        {
                            parseInt(product.varientInProduct) === 0 ? <span> </span> : <span className="varients"> {product.varientInProduct }  varients</span>
                        }
                        <span className="units"> {units} Unidades </span>
                    </div>
                </div>

                <div className="inventory-prices">

                    <div className="retail-prices">
                        <p className="title"> Precio Por Menor </p>
                        <span className="price"> { product.product.price }</span>
                    </div>

                    <div className="inventory-cost">
                        <p className="title"> Nuestro Costo</p>
                        <span className="price"> {product.product.item_cost} </span>
                    </div>

                </div>
            </div>
          
            <div className="inventory-controls">
                <button onClick={handleSetting} className="inventory-item-control"> ... </button>
            </div>
        </li>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(ProductTableItem);