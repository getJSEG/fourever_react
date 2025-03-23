import React, { useEffect, Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import { useGetLocationQuery } from "../../../../features/location/locationApiSlice";

import { formatCurrecy } from "../../../../utils/currencyFormatter";
import { setStoreInfo } from "../../../../features/location/locationSlice";
// Selectors
import { selectStoreTax } from "../../../../features/location/locationSlice";
import { selectIsPreTax } from "../../../../features/location/locationSlice";


// Components
import CancelAlert from "./CancelAlert";
import PromotionalCodes from "./PromotionalCodes";
import Discount from "./Discount";
import Payment from "../payment/Payment";

const OrderSummary = ({shoppingCart, handleClearShoppingCart}) => {

    const{
        data:
        locationData,
        isLoading
    } = useGetLocationQuery();
    const dispatch = useDispatch();

    // When Component loads get the tax info
    useEffect( () => {
        dispatch(setStoreInfo({...locationData} ));
    }, []);

    const taxPercentage = useSelector( selectStoreTax);
    const isPreTax = useSelector(selectIsPreTax);
    const [subtotal, setSubtotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [isCdw, setIsCdw] = useState(false);
    const [isPromoCodeW, setIsPromocodeW] = useState(false);
    const [clearCart, setClearCart] = useState(false);
    const [cancelWindow, setCancelWindow] =  useState(false);
    const [paymentWindow, setPaymentWindow] = useState(false);

    const [orderSummary, setOrderSummary] = useState({})

    const calculateTotal = () => {
        let productsSubTotal = shoppingCart.reduce( (total, product) => total + Number(product?.subtotal), 0)
        setSubtotal(productsSubTotal)

        if(discount > 0 ){
            productsSubTotal = productsSubTotal - ((discount/100) * productsSubTotal)
        }

        if(isPreTax){
            productsSubTotal = productsSubTotal + (taxPercentage/100) * productsSubTotal
        }
        setGrandTotal(productsSubTotal)
    }

    useEffect(() => {
        calculateTotal()
    }, [shoppingCart, discount])

    // This handles Promotional cupons/codes
    const handlePromoCodeWindow= (e, isOpen) => {
        setIsPromocodeW(isOpen)
    }
    // This handles the custome Discount Window
    const handleCdw = (isOpen) => {
        setIsCdw(isOpen)
    }
    // This clears the cart and all of the info
    const handleClearCart = (isCancel) => {
        setClearCart(isCancel);
        setDiscount(0);
        setGrandTotal(0);
        setSubtotal(0);
        // Clear the cart here
        handleClearShoppingCart();
    }

    // This handles if the window is open or closed
    const handleCancelWindow = (e, isOpen) => {
        setCancelWindow(isOpen)
    }

    const handleDiscount = (discnt) => {
        setDiscount(discnt)
    }

    const handlePaymentWindow = (isOpen) => {
        setPaymentWindow(isOpen);
    }

    // This create at obrder summary of all of the information
    useEffect(()=> {
        setOrderSummary({
            "discount": discount,
            "taxes": taxPercentage,
            "includeTaxes": isPreTax,
            "includeDiscount": discount > 0,
            "subtotal": Number(subtotal).toFixed(2) ,
            "grandTotal": Number(grandTotal).toFixed(2),
        })
        
    }, [discount, taxPercentage, isPreTax, grandTotal, subtotal])

    return(
        <div className="pos-payment-information">
            <div className="discount-container"> 
                <div> <p> Agregar </p> </div>
                <div className="discount-button-container">
                    <button onClick={ (e) => handlePromoCodeWindow(e, true) }> <h2> Cupones </h2> </button>
                    <button onClick={ (e) => handleCdw(e, true) }> <h2> Descuento </h2> </button>
                </div>
            </div>

            <div className="pos-price-information">
                <div className="item-and-discount-container">
                    <div className="item-and-discount-labels pos-final-price-info">
                        <label> Subtotal </label>
                        <label className={`${ isPreTax ? 'include_tax': 'dont-include-tax'}`}> IVA </label>
                        <label> Descuento </label>
                        <label> Total </label>
                    </div>
                    <div className="item-and-discount-info pos-final-price-info">
                        <p> { formatCurrecy(subtotal) }</p>
                        <p className={`${ isPreTax ? 'include_tax': 'dont-include-tax'}`} > { formatCurrecy((taxPercentage/100) * subtotal) } </p>
                        <p> { formatCurrecy((discount/100) * subtotal) } </p>
                        <p> { formatCurrecy(grandTotal)} </p>
                    </div>
                </div>
            </div>

            <div className="pos-button-container">
                <div className="pos-cancel-button">
                    <button onClick={ (e) => { handleCancelWindow(e, true) } }> 
                        <h2> Cancelar </h2>
                    </button>
                </div>
                <div className="pos-pay-button">
                    <button onClick={ (e) => handlePaymentWindow(true) }> <h2> Realizar Pago </h2> </button>
                </div>
            </div> 


            {   
                cancelWindow
                ? <CancelAlert 
                    handleClearCart={handleClearCart}
                    handleCancelWindow={handleCancelWindow}
                    />
                : null
            }

            {
                isPromoCodeW
                ? <PromotionalCodes
                    handlePromoCodeWindow={handlePromoCodeWindow}
                    />
                : null

            }

            {
                isCdw
                ? <Discount 
                    customDiscountWindow = {handleCdw}
                    handleDiscount={handleDiscount}
                    shoppingCart={shoppingCart}
                    />
                : null
            }

            {
                paymentWindow
                ? <Payment 
                    handlePaymentWindow={handlePaymentWindow}
                    orderSummary = {orderSummary}
                    shoppingCart={shoppingCart}
                    grandTotal = {grandTotal}
                />
                : null
            }

        </div>
    );
}

export default OrderSummary;