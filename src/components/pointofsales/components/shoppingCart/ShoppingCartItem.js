// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";


// Utils
import { formatCurrecy } from "../../../../utils/currencyFormatter";

const ShoppingCartItem = ({cartItem, index, removeItemFromCart, changeQTY}) => {

    const [quantity, setQuantity] = useState('');
    const [openMoreInfo, setOpenMoreInfo] = useState(false);


    // Open And Close the qty input
    const handleMoreInfo = () => {
        setOpenMoreInfo(!openMoreInfo)
    }

    // Adds one to the quantity
    const stepUp = (e) => {
        e.preventDefault();
        let plusOne = cartItem?.quantity + 1
        setQuantity(plusOne)
        changeQTY(index, plusOne);
    }
    // removes one from the quantity
    const stepDown = (e) => {
        e.preventDefault();
        if(cartItem?.quantity > 1) {
            let minusOne = cartItem?.quantity - 1
            setQuantity(minusOne)
            changeQTY(index, minusOne);   
        }
    }

    const handleCustomValue = (e) => {
        e.preventDefault();
        setQuantity(e.target.value)
        let customeValueInput = Number(e.target.value)

        if(!isNaN(customeValueInput) )
            if(customeValueInput > 0 )
                changeQTY(index, customeValueInput)
    }

    useEffect( () => {
        if(quantity <= 0 ){
            setQuantity(cartItem?.quantity)
        }  
    }, [quantity])

    // Unmount When Deleted
    useEffect(()=> {
        return() =>{ }
    }, [])
    
    return (
        <li className= {`pos-line-item ${ openMoreInfo ? 'pos-line-item-options-open': ''}`}> 
            <div> 
                <span className="shoppingcart-item-span center-v-content"  onClick={handleMoreInfo}>
                    { 
                        !openMoreInfo
                            ?(<svg width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg> ) 
                            :(<svg width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>)
                    }
                </span>

                <span  className="pos-qty-input gray-txt-90 center-v-content">{cartItem?.quantity}</span>
                <span className="price-name gray-txt-90 center-v-content">{cartItem?.name}</span>

                <span className="pos-qty-total center-v-content">{ formatCurrecy(cartItem?.subtotal) }</span>
        
                <button className="P-05 gray-bg-50 rounded-lg pointer remove-border center-v-content" onClick={ (e) => removeItemFromCart(e, cartItem?.sku)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="fill-icons-drk-blue" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button> 
         

            </div>
            
            {
                openMoreInfo 
                ?(<span className="shoppingcart-change-qty"> 
                        <button  className="shoppingcart-reduce-qty-button" onClick={ (e) => {stepDown(e) } } > - </button>
                        <input 
                            placeholder={cartItem?.quantity}
                            value={ quantity }
                            onChange={ (e) => handleCustomValue(e) }
                        />
                        <button className="shoppingcart-add-qty-button" onClick={ (e) => { stepUp(e) } } > + </button>
                    </span>) 
                : null
            }
            
        </li>
    );
}



export default ShoppingCartItem;