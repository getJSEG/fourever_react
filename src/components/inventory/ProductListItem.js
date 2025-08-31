import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useNavigate} from 'react-router-dom';

// Component
import ProductDetailSetting from "./components/ProductDetailSetting";
import ConfirmationWindow from "../cofirmationWindow/ConfirmationWindow";

// Utils
import { formatCurrecy } from "../../utils/currencyFormatter";
import { useDeleteProductMutation } from "../../features/products/productsApiSlice";

const ProductListItem  = ({ product, handleDeleteProduct}) => {

    const navigate = useNavigate();
    const [productSettingWindow, setProductSettingWindow] = useState(false);

    // Confirmation Deletion Window
    const [closeWindow, setCloseWindow] =  useState(false);
    const deleteMessage = `Estar Seguro que quires borrar ${product?.name}`
    const [confirmDelete, setConfirmDelete] = useState(false);

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

    // handles delete product
    const deleteProduct = () => {
        handleDeleteProduct(product?.id);
    }

    // unmounts components
    useEffect( () => {
        return() => {}
    }, [])

    return(
        <li className="product-list-item
                       div-background-color-white
                       div-border-blue-gray-color
                       rounded-lg
                       gray-bg-40">

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
                        <p className="pt18"> {product?.name}</p>
                    </div>

                    <div className="secondary-information"> 
                        <div className="varients p-05 rounded-lg"> {product?.total_varients }  variantes</div>
                    </div>
                </div>

                <span className="divider-w-height"></span>

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
                <span onClick={handleSettingWindow} className="product-list-controls pointer">
                    <svg width="20"
                         height="20" 
                         fill="currentColor" className="bi bi-three-dots" viewBox="0 0 20 20">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </span>
                { 
                    productSettingWindow 
                    ? <ProductDetailSetting handleCloseWindow={ handleCloseWindow }/> 
                    : null
                }
            </div>
            

            {   closeWindow 
                ? <ConfirmationWindow 
                    handleConfirmartion={deleteProduct}
                    message={ deleteMessage }
                    // productName = {product?.name}
                    // handleSettingWindow={handleSettingWindow} 
                    handleCloseWindow={handleCloseWindow} 
                    />
                : null
            }
        </li>
    )
}

export default ProductListItem;