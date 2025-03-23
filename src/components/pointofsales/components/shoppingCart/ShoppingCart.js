import React, { useEffect, Component, useState } from "react";


import ShoppingCartItem from "./ShoppingCartItem";
import OrderSummary from "./OrderSummary";

const ShoppingCart = ({shoppingCart, removeItemFromCart, changeQTY, handleClearShoppingCart}) => {

    return(
        <div className="pos-item-information-container">            
            <div className='list-items-container'>
                <ul>
                    {   
                        shoppingCart?.map((item, index) => { 
                            return  <ShoppingCartItem
                                            key={item.sku} 
                                            cartItem={item}
                                            index={index}
                                            removeItemFromCart = {removeItemFromCart}
                                            changeQTY = { changeQTY }
                                            /> 

                        })          
                    }
                </ul>
            </div>

            <OrderSummary 
                shoppingCart={shoppingCart}
                handleClearShoppingCart={handleClearShoppingCart}
            />
            
            {/* <div className="pos-payment-information">
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
                </div> */}
            {/* </div> */}

            {/* { isCancelWindow ?  (<CancelTransactionAlert handleCancelation={handleCancelation}
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
                                      />) : null } */}
        </div>
    );
}

export default ShoppingCart;