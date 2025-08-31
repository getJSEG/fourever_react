import React, { useEffect, Component, useState } from "react";


import ShoppingCartItem from "./ShoppingCartItem";
import OrderSummary from "./OrderSummary";

const ShoppingCart = ({shoppingCart, removeItemFromCart, changeQTY, clearShoppingcartHandler, paymentWindowHandler, order, orderHandler}) => {

    return(
        <div className="pos-item-information-container gray-txt-90 div-background-color-white">            
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
                clearShoppingcartHandler={clearShoppingcartHandler}
                paymentWindowHandler = { paymentWindowHandler }
                order = { order }
                orderHandler = { orderHandler }
            />
        </div>
    );
}

export default ShoppingCart;