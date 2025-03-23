import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';

// Component
import ProductDetailSetting from "./components/ProductDetailSetting";
import DeleteAlertMessage from "./components/DeleteAlertMessage";

// Utils
import { formatCurrecy } from "../../utils/currencyFormatter";

const ProductListItem  = ({ product }) => {

    const navigate = useNavigate();
    // { product, handleClickEvent}
    // const [units, setUnits] = useState(0)
    // // This is Small setting window 
    const [productSettingWindow, setProductSettingWindow] = useState(false)
    // // Confirmation Deletion Window
    const [closeWindow, setCloseWindow] =  useState(false)

    // // This Opens Small Setting for the product
    const handleSettingWindow  = () => { setProductSettingWindow(!productSettingWindow) }

    // // This Opens Confirmation Window
    const handleCloseWindow = (isWindowClosed) => {
        setCloseWindow(isWindowClosed);
        if(productSettingWindow === true){
            setProductSettingWindow(false)
        }
    }

    // This can be change to Navigate but the style changes
    const handleProductItemClick = (productId) => {
        navigate(`/product/${productId}`);
    }


    return(
        <li className="list-item">
            <div className="clickable-position" onClick={() => handleProductItemClick(product?.id)}>
                {/* <div className={`${product?.variants?.image !== null && product?.variants?.image?.link ? 'has-image': ''} image-container`}>
                    {
                        product?.variants ? 
                        product?.variants?.image !== null && product?.variants?.image?.link !== '' ? <img className="image" src={ product?.variants?.image?.link }/> : null
                        : null
                    }
                </div> */}

                <div className="inventory-information">
                    <div className="b-title">
                        <h2 className="title"> {product?.name}</h2>
                    </div>

                    <div className="secondary-information"> 
                        {
                            <span className="varients"> {product?.total_varients }  variantes</span>
                        }
                        {/* <span className="units"> {product?.total_units} Unidades </span> */}
                    </div>
                </div>

                <div className="inventory-prices">

                    <div className="retail-prices">
                        <p className="title"> precio promedio </p>
                        <span className="price"> { formatCurrecy(product?.average_price )}</span>
                    </div>

                    <div className="inventory-cost">
                        <p className="title"> Nuestro Costo </p>
                        <span className="price"> {formatCurrecy(product?.cost)} </span>
                    </div>

                </div>
            </div>
          
            <div className="inventory-controls">
                <button onClick={handleSettingWindow} className="inventory-item-control"> ... </button>
                { 
                    productSettingWindow 
                    ? <ProductDetailSetting handleCloseWindow={ handleCloseWindow }/> 
                    : null
                }
            </div>
            

            {   closeWindow 
                ? <DeleteAlertMessage 
                    productId={product?.id} 
                    productName = {product?.name}
                    handleSettingWindow={handleSettingWindow} 
                    handleCloseWindow={handleCloseWindow} /> 
                : null
            }
        </li>
    )
}


// const mapStateToProps = state => ({
// });


export default ProductListItem;