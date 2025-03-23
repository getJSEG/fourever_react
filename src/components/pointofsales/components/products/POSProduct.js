import React, { useEffect} from "react";

import { formatCurrecy } from "../../../../utils/currencyFormatter";

const POSProduct = ({product, addToCart, barcode}) => {

    useEffect( () => {
        if(barcode === product?.sku) {
            addToCart(product)
        }
    }, [barcode])

    return (
        <section>
            <li onClick={ (event) => {  addToCart(product) } } 
                key={product?.sku} 
                className="pos-products">

                <div className="pos-img-container">
                    <img className="pos-selector-image" src={product?.image?.link} />
                </div>
                <div className="pos-product-info-container">
                    <p className="pos-product-name"> { product?.product?.name } </p>
                    <p className="pos-product-sku"> { product?.color } </p>
                    <p className="pos-product-price"> { formatCurrecy(product?.price) } </p>
                </div>

            </li>
        </section>
    );
}

export default POSProduct;