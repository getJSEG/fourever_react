import React, { useEffect, Component, useState } from "react";

// Functions
import { SKUSearch } from '../../actions/POSSystem/POSsystem.js';
import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';
import { getProductPOS } from "../../actions/POSSystem/POSsystem.js";

//  Components
import LineItem from "./LineItem.js";
import Payment from "./Payment.js";
import Discount from "./Discount.js";
import DiscountCodes from "./DiscountCodes.js";


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
     
     // update subtotal
     const getSubTotal = () => {
        if(shoppingCartItems.length >= 0 ) {
            let sub_ = 0;
            for(let i= 0 ; i < shoppingCartItems.length; i++){
                sub_ = sub_ + shoppingCartItems[i].qty_total
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

    // updated the subtotal after every line item
    useEffect( () => {
        getSubTotal();
        calculateGrandTotal();
    }, [shoppingCartItems, subtotal, discount])

    const handleCheckout = () => {
        // TODO: if the user submits a payment and the order is not closed then wee need to make sure they know 
        //  adn make sure the user pamkes another payment 
        if(subtotal >= 1){
            setCheckout(!isCheckout)
        } 
        else{
            console.log("display message:  Porfavor empiese a escanear productos. Minumo $1 para pagar")
        }
    }

    // when button is pressed clear the shopping cart array
    const cancelOrder = () => {
        // TODO: Create custom popup window
        const confirm = window.confirm("do you want to cancel")
        if(confirm) {
            handleSetShoppingcart([]);
            setAmountSaved(0);
            setDiscount(0);
        }else{
            console.log("this will not be deleted")
        }
    }

    // This will remove or add item qty depends on witch button is pressed
    const addOrRemove = (e, sku) => {
        handleSetShoppingcart(shoppingCartItems.map( (object, i) => {
            if(object.sku === sku) {
                if(e.target.className != '') {
                    if(e.target.className === 'shoppingcart-reduce-qty-button'){
                        if(object.qty === 1){
                            return object;
                        }
                        if(object.qty <= 0){
                            return {
                                ...object,
                                qty: 1,
                                qty_total: object.price * 1,
                            };
                        }
                        else{
                            return {
                                ...object,
                                qty: object.qty - 1,
                                qty_total: object.price * (object.qty - 1),
                            };
                        }
                    }
                    else if (e.target.className === 'shoppingcart-add-qty-button'){
                        return {
                            ...object,
                            qty: object.qty + 1,
                            qty_total: object.price * (object.qty + 1),
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
                            // calculate the subtotal
                            // setSubtotal(prev => prev + item.qty_total)

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
                            <p>$ { subtotal === 0 ? "0.00" : parseFloat(subtotal).toFixed(2)  }</p>
                            <p className={`${ isPreTaxed ? 'include_tax': 'dont-include-tax'}`} > $ { postax } </p>
                            <p> ${ amountSaved === 0 ? "0.00" : parseFloat(amountSaved).toFixed(2)  }</p>
                            <p>${  grandTotal === 0 ? '0.00' : parseFloat(grandTotal).toFixed(2) } </p>
                        </div>
                    </div>
                </div>

                <div className="pos-button-container">
                    <div className="pos-cancel-button">
                        <button onClick={ cancelOrder }> 
                            <h2> Cancelar </h2>
                        </button>
                    </div>
                    <div className="pos-pay-button">
                        <button onClick={handleCheckout}> <h2>Realizar Pago</h2> </button>
                    </div>
                </div>

            </div>


            {/* Discount percentage*/}
            { isDiscountDisplayed ? (<Discount  handleDiscountDisplay={ handleDiscountDisplay }
                                                handleDiscount = { handleDiscount }
            />) : null}

            {/* Discount Codes */}
            { isDiscountCodesDisplayed ? (<DiscountCodes  handleDiscountCodeDisplay={ handleDiscountCodeDisplay }
                                                          handleDiscountCode = { handleDiscountCode }
            />) : null}

            {/* Finalize Disount */}
            { isCheckout ? (<Payment  handleCheckout={ handleCheckout }
                                      subtotal={ subtotal }
                                      itemsTax = {postax}
                                      discount = {amountSaved}
                                      grandTotal={ grandTotal }
                                      shoppingCartItems={ shoppingCartItems }
                                      />) : null}
        </div>
      );
}

// { isCheckout ? (<Payment  handleCheckout={ handleCheckout }
    //     subtotal={ subtotal }
    //     grandTotal={ grandTotal }
    //     lineItemList={ lineItemList }
    //     />) : null}

//             {/* Discount percentage*/}
//             { isDiscountDisplayed ? (<Discount  handleDiscountDisplay={ handleDiscountDisplay }
//                 handleDiscount = { handleDiscount }
// />) : null}
// {/* Discount Codes */}
// { isDiscountCodesDisplayed ? (<DiscountCodes  handleDiscountCodeDisplay={ handleDiscountCodeDisplay }
//                           handleDiscountCode = { handleDiscountCode }
// />) : null}
// {/* Finalize Disount */}
// { isCheckout ? (<Payment  handleCheckout={ handleCheckout }
//       subtotal={ subtotal }
//       grandTotal={ grandTotal }
//       lineItemList={ lineItemList }
//       />) : null}

const mapStateToProps = state => ({
    tax: state.location.tax,
    isPreTaxed: state.location.isPreTaxed,
});

export default connect(mapStateToProps, {})(Checkout);