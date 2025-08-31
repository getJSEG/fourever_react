import React, { useEffect, Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrecy } from "../../../../utils/currencyFormatter";

// Components
import CancelAlert from "./CancelAlert";
import PromotionalCodes from "./PromotionalCodes";
import Discount from "./Discount";

const OrderSummary = ({clearShoppingcartHandler, order, orderHandler, paymentWindowHandler}) => {

    const [isCdw, setIsCdw] = useState(false);
    const [isPromoCodeW, setIsPromocodeW] = useState(false);

    const [cancelWindow, setCancelWindow] =  useState(false);

    // This handles promo window ope/close
    const handlePromoCodeWindow= (e, isOpen) => {
        setIsPromocodeW(isOpen)
    }
    // This handles the custom Discount Window
    const handleCdw = (isOpen) => {
        setIsCdw(isOpen)
    }

    // This handles if the window is open or closed
    const handleCancelWindow = (e, isOpen) => {
        setCancelWindow(isOpen)
    }

    const handleDiscount = (discnt) => {
        orderHandler({discount: discnt })
    }

    return(
        <div className="pos-payment-information gray-bg-30">
            <div className="discount-container"> 
                <div> <p> Agregar </p> </div>
                <div className="discount-button-container">
                    <button className="red-bg-color gray-txt-20"  onClick={ (e) => handlePromoCodeWindow(e, true) }> <h2> Cupones </h2> </button>
                    <button className="red-bg-color gray-txt-20"  onClick={ (e) => handleCdw(e, true) }> <h2> Descuento </h2> </button>
                </div>
            </div>

            <div className="pos-price-information">
                <div className="item-and-discount-container">
                    <div className="item-and-discount-labels pos-final-price-info">
                        <label> Subtotal </label>
                        <label className={`${ !order?.preTax ? 'include_tax': 'dont-include-tax'}`}> IVA </label>
                        <label> Descuento </label>
                        <label> Total </label>
                    </div>
                    <div className="item-and-discount-info pos-final-price-info">
                        <p> { formatCurrecy(order?.subtotal) }</p>
                        <p className={`${ !order?.preTax ? 'include_tax': 'dont-include-tax'}`} > { formatCurrecy(order?.tax) } </p>
                        <p> { formatCurrecy(order?.discount) } </p>
                        <p> { formatCurrecy(order?.totalAmount)} </p>
                    </div>
                </div>
            </div>

            <div className="pos-button-container ">
                <div className="pos-cancel-button red-bg-color rounded-lg">
                    <button className="red-bg-color gray-txt-20"  onClick={ (e) => { handleCancelWindow(e, true) } }> 
                        <h2> Cancelar </h2>
                    </button>
                </div>
                <div className="pos-pay-button green-bg-color rounded-lg">
                    <button  className="green-bg-color gray-txt-20" onClick={ (e) => paymentWindowHandler(true) }> <h2> Realizar Pago </h2> </button>
                </div>
            </div> 


            {   
                cancelWindow && <CancelAlert  handleClearCart={clearShoppingcartHandler}
                                              handleCancelWindow={handleCancelWindow} />
            }

            {
                isPromoCodeW && <PromotionalCodes handlePromoCodeWindow={handlePromoCodeWindow} />
            }

            {
                isCdw && <Discount customDiscountWindow = {handleCdw}
                                    handleDiscount={handleDiscount}  />
            }
        </div>
    );
}

export default OrderSummary;