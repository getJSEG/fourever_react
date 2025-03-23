import React, { useEffect, Component, useState } from "react";

// Functions
import { SKUSearch } from '../../actions/PointOfSales/POSsystem.js';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getProductPOS } from "../../actions/PointOfSales/POSsystem.js";

//  Components
import LineItem from "./LineItem.js";
import Payment from "./Payment.js";
import Discount from "./Discount.js";
import DiscountCodes from "./DiscountCodes.js";
import CancelTransactionAlert from "../CancelTransactionAlert.js";


// TODO: when changin to another component this will add multiple line items out of nowere
// TODO: CALL the product API url before staring this product
// discountInfo, discountFail, discountMessage 

const Checkout = ({ shoppingCartItems, handleSetShoppingcart, manualChangeValue, deleteItem, isPreTaxed, tax }) => {

    let [subtotal, setSubtotal] =  useState(0);
    let [grandTotal, setGrandTotal] =  useState(0);
    let [amountSaved, setAmountSaved] = useState(0);
    let [discount, setDiscount] = useState(0)
    let [postax, setTax] =  useState(0);

    let [isCheckout, setCheckout] = useState(false)
    let [isDiscountDisplayed, setIsDiscountDisplayed] = useState(false)
    let [isDiscountCodesDisplayed, setDiscountCodesDisplay]  = useState(false)

    const [confirmCancel, setConfirmCancel] = useState(false)
    const [openCancelWindow, setOpenCancelWindow] = useState(false)
     
     // update subtotal
     const getSubTotal = () => {
        if(shoppingCartItems.length >= 0 ) {
            let sub_ = 0;
            for(let i= 0 ; i < shoppingCartItems.length; i++){
                sub_ = sub_ + shoppingCartItems[i].price
            }
            setSubtotal( sub_ );
        }
    } 

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

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

    // updated the subtotal after every line item
    useEffect( () => {
        getSubTotal();
        calculateGrandTotal();
    }, [shoppingCartItems, subtotal, discount])

    const handleCheckout = (setIsCheckout) => {
        // TODO: if the user submits a payment and the order is not closed then wee need to make sure they know 
        //  and make sure the user makes another payment 
        // console.log(setIsCheckout)
        if(subtotal >= 1){
            setCheckout(setIsCheckout)
        } 
        else{
            console.log("display message:  Porfavor empiese a escanear productos. Minumo $1 para pagar")
        }
    }

    //confirm cancelation and deletes all products in cart
    const handleCancelation = () => {
        setConfirmCancel(true)
    }
    // Open Window if subtotal is greater than 1
    const handleCancelationWindow = () => {
        if(subtotal >= 1)
            setOpenCancelWindow(!openCancelWindow)
    }
    // when button is pressed clear the shopping cart array
    useEffect(()=> {
        if(confirmCancel) {
            handleSetShoppingcart([]);
            setAmountSaved(0);
            setDiscount(0);
            handleCancelationWindow();
            // resetting the cancel confirmation
            const timeoutId = setTimeout(() => { setConfirmCancel(false)
                return clearTimeout(timeoutId)
            }, 400);
        }
    },[confirmCancel])

    // This will remove or add item qty depends on witch button is pressed
    const addOrRemove = (e, sku) => {
        handleSetShoppingcart(shoppingCartItems.map( (object, i) => {
            if(object.sku === sku) {
                if(e.target.className != '') {
                    if(e.target.className === 'shoppingcart-reduce-qty-button'){
                        if(object.units === 1){
                            return object;
                        }
                        if(object.units <= 0){
                            return {
                                ...object,
                                units: 1,
                                price: object.unitPrice * 1,
                            };
                        }
                        else{
                            return {
                                ...object,
                                units: object.units - 1,
                                price: object.unitPrice * (object.units - 1),
                            };
                        }
                    }
                    else if (e.target.className === 'shoppingcart-add-qty-button'){
                        return {
                            ...object,
                            units: object.units + 1,
                            price: object.unitPrice * (object.units + 1),
                        };
                    }
                }
            }else{
                return object
            }
        }));
    }

    let handleDiscountCode = (isDiscountFail, discountErr, discountInformation) => {
        if( !isDiscountFail ){
            // setDiscountCodesDisplay(false)
            setDiscount(discountInformation)
            // handleDiscountDisplay()
        }else{
            console.log(discountErr || "you need to enter a message")
        }
    }

    const handleDiscountDisplay = () => {
        setIsDiscountDisplayed(!isDiscountDisplayed)
    }
    const handleDiscountCodeDisplay = () => {
        setDiscountCodesDisplay(!isDiscountCodesDisplayed)
    }
    //Handles the discounts
    const handleDiscount = (propDiscount) => {
        setDiscount(propDiscount)
    }

    return (
        <div className="pos-item-information-container">
            <div className='list-items-container'>
                <ul>
                    {   
                        shoppingCartItems !== null ? 
                        shoppingCartItems?.map((item) => { 
                            return  <LineItem key={item.sku} 
                                            item={item}
                                            changeqtyManual={manualChangeValue} 
                                            skuItem={item.sku}
                                            addOrRemove = {addOrRemove}
                                            deleteSelf={deleteItem}
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
                        <button onClick={handleDiscountCodeDisplay}> <h2> Cupones </h2> </button>
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
                            <p> { currencyFormatter.format(subtotal) }</p>
                            <p className={`${ isPreTaxed ? 'include_tax': 'dont-include-tax'}`} > $ { postax } </p>
                            <p> { currencyFormatter.format(amountSaved) } </p>
                            <p> { currencyFormatter.format(grandTotal)} </p>
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
                        <button onClick={ (e) => handleCheckout(true) }> <h2>Realizar Pago</h2> </button>
                    </div>
                </div>
            </div>

            {
                openCancelWindow ?  (<CancelTransactionAlert handleCancelation={handleCancelation}
                                                             handleCancelationWindow={handleCancelationWindow}>
                                    </CancelTransactionAlert> ): null
            }

            {/* Discount percentage*/}
            { isDiscountDisplayed ? (<Discount  handleDiscountDisplay={ handleDiscountDisplay }
                                                handleDiscount = { handleDiscount }
            />) : null}

            {/* Discount Codes */}
            { isDiscountCodesDisplayed ? (<DiscountCodes  handleDiscountCodeDisplay={ handleDiscountCodeDisplay }
                                                          handleDiscountCode = { handleDiscountCode }
            />) : null}

            {/* Finalize Payment */}
            { isCheckout ? (<Payment  handleCheckout={ handleCheckout }
                                      subtotal={ subtotal }
                                      itemsTax = {postax}
                                      isPreTaxed={isPreTaxed}
                                      discount = {amountSaved}
                                      grandTotal={ grandTotal }
                                      shoppingCartItems={ shoppingCartItems }
                                      />) : null}
        </div>
      );
};

const mapStateToProps = state => ({
    tax: state.location.tax,
    isPreTaxed: state.location.isPreTaxed,
});

export default connect(mapStateToProps, {})(Checkout);