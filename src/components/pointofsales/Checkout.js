import React, { useEffect, useState } from "react";

import { connect } from 'react-redux';

//  Components
import LineItem from "./LineItem.js";
import Payment from "./Payment.js";
import Discount from "./components/shoppingCart/Discount.js";
import DiscountCodes from "./components/shoppingCart/PromotionalCodes.js";
import CancelTransactionAlert from "./components/shoppingCart/CancelAlert.js";

import AlertMessage from "../common/AlertMessage.js";

// Utils
import { formatCurrecy } from "../../utils/currencyFormatter.js";

const Checkout = ({ shoppingCartItems, handleShoppintCart, deleteItem, isPreTaxed, tax, totalCartItems, updateQty }) => {

    const [subtotal, setSubtotal] =  useState(0);
    const [grandTotal, setGrandTotal] =  useState(0);
    const [amountSaved, setAmountSaved] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [postax, setTax] =  useState(0);

    const [isCheckout, setCheckout] = useState(false);
    const [isDiscountWindow, setIsDiscountWindow] = useState(false);
    const [isPromoCodeWindow, setIsPromoCodeWindow]  = useState(false);     //Open or closed the window for cupon codes

    const [isCancelWindow, setIsCancelWindow] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");
    const [isErr, setIsErr] = useState(false);

    // Handles alert messages
    const handleAlertMessage = (msg, err) => { setAlertMessage(msg);    setIsErr(err);  }
    const clearMsgAlert = () => { setAlertMessage(""); setIsErr(false); }

    //this calculates the subtotal
    const getSubTotal = () => {
        if(shoppingCartItems.length >= 0 ) {
            let sub_ = 0;
            for(let i= 0 ; i < shoppingCartItems.length; i++){
                sub_ = sub_ + shoppingCartItems[i].price
            }
            setSubtotal( sub_ );
        }
    } 

    //Calculate the Grand Total
    const calculateGrandTotal = () => {
        let amountSaved = 0;
        let salesPrice = 0;
        let calTaxes = 0;
        let afterTaxTotal = 0;

        if( discount !== 0 ){
            amountSaved = (discount/100) * subtotal;
        }
        salesPrice = parseFloat((subtotal - amountSaved).toFixed(2));
        if(isPreTaxed){ 
            calTaxes = (tax/100) * salesPrice;
        }
        afterTaxTotal = calTaxes + salesPrice;

        setTax(calTaxes);
        setAmountSaved(amountSaved);
        setGrandTotal(afterTaxTotal);
    }
    // Check if their an item in the cart
    const handleCheckout = (setIsCheckout) => {
        if(totalCartItems >= 1){ 
            setCheckout(setIsCheckout); 
        } 
        else {   handleAlertMessage("Porfavor Seleccione, O Empiese a escanear Productos. Mínimo 1 articulo Para Empezar Transacción", true);  }
    }

    // handling the promo code  
    let handleDiscountCode = (discountAmount ) => {
        if( discountAmount > 0){
            setAlertMessage("se ha añadido la Promocion", false);
            setDiscount(discountAmount);
        }
    }
    //handle manual discount Entry
    const handleDiscount = (propDiscount) => {  setDiscount(propDiscount) }
    // handles manual dicount window
    const handleDiscountDisplay = () => { setIsDiscountWindow(!isDiscountWindow) }
    // Handles Cupon code window
    const handlePromoCodeWindow = (isOpen) => { setIsPromoCodeWindow(isOpen); }
    // Open Window if their item in the cart
    const handleCancelationWindow = () => {
        if(totalCartItems >= 1) { setIsCancelWindow(!isCancelWindow); }
    }
    //confirm cancelation and clear all of the items and price of the cart
    const handleCancelation = () => { handleShoppintCart([]);  setAmountSaved(0); setDiscount(0); handleCancelationWindow(); }

    // updated the subtotal after every line item
    useEffect( () => {
        getSubTotal();
        calculateGrandTotal();
    }, [shoppingCartItems, subtotal, discount])

    //clear alert message after 3 seconds
    useEffect( ()=> {
        if(alertMessage !== ''){
            const timeout = setTimeout(() => {
                clearMsgAlert();
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [alertMessage])

    return (
        <div className="pos-item-information-container">

            {  alertMessage !== "" ? <AlertMessage message={alertMessage} isError={isErr}/> : null }
            
            <div className='list-items-container'>
                <ul>
                    {   
                        shoppingCartItems !== null ? 
                        shoppingCartItems?.map((item) => { 

                            return  <LineItem key={item.sku} 
                                            item={item}
                                            skuItem={item.sku}
                                            deleteSelf={deleteItem}
                                            updateQty={updateQty}
                                            /> 

                        }) 
                        : null           
                    }
                </ul>
            </div>
            
            <div className="pos-payment-information">
                <div className="discount-container"> 
                    <div> <p> Agregar </p> </div>
                    <div className="discount-button-container">
                        <button onClick={ () => handlePromoCodeWindow(true) }> <h2> Cupones </h2> </button>
                        <button onClick={handleDiscountDisplay}> <h2> Descuento </h2> </button>
                    </div>
                </div>

                <div className="pos-price-information">
                    <div className="item-and-discount-container">
                        <div className="item-and-discount-labels pos-final-price-info">
                            <label> Subtotal </label>
                            <label className={`${ isPreTaxed ? 'include_tax': 'dont-include-tax'}`}> IVA </label>
                            <label> Descuento </label>
                            <label> Total </label>
                        </div>
                        <div className="item-and-discount-info pos-final-price-info">
                            <p> { formatCurrecy(subtotal) }</p>
                            <p className={`${ isPreTaxed ? 'include_tax': 'dont-include-tax'}`} > $ { postax } </p>
                            <p> { formatCurrecy(amountSaved) } </p>
                            <p> { formatCurrecy(grandTotal)} </p>
                        </div>
                    </div>
                </div>

                <div className="pos-button-container">
                    <div className="pos-cancel-button">
                        <button onClick={ handleCancelationWindow }> 
                            <h2> Cancelar </h2>
                        </button>
                    </div>
                    <div className="pos-pay-button">
                        <button onClick={ (e) => handleCheckout(true) }> <h2> Realizar Pago </h2> </button>
                    </div>
                </div>
            </div>

            { isCancelWindow ?  (<CancelTransactionAlert handleCancelation={handleCancelation}
                                                          handleCancelationWindow={handleCancelationWindow} />
                                 ): null}

            { isDiscountWindow ? (<Discount  handleDiscountDisplay={ handleDiscountDisplay }
                                                handleDiscount = { handleDiscount } />
                                    ) : null}

            { isPromoCodeWindow ? (<DiscountCodes  handlePromoCodeWindow={ handlePromoCodeWindow }
                                                    handleDiscountCode = { handleDiscountCode }
            />) : null}

            { isCheckout ? (<Payment  handleCheckout={ handleCheckout }
                                      subtotal =   { subtotal }
                                      itemsTax =   { postax }
                                      isPreTaxed = { isPreTaxed }
                                      discount =   { amountSaved }
                                      grandTotal = { grandTotal }
                                      shoppingCartItems={ shoppingCartItems }
                                      />) : null }
        </div>
      );
};

const mapStateToProps = state => ({
    tax: state.location.tax,
    isPreTaxed: state.location.isPreTaxed,
});

export default connect(mapStateToProps, {})(Checkout);