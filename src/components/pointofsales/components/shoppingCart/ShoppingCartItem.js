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

    // Adds one to the units
    const stepUp = (e) => {
        e.preventDefault();
        console.log("this remvoes one item to the quaitity")
        let plusOne = cartItem?.units + 1
        setQuantity(plusOne)
        changeQTY(index, plusOne);
    }
    // removes one from the units
    const stepDown = (e) => {
        e.preventDefault();
        if(cartItem?.units > 1) {
            let minusOne = cartItem?.units - 1
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
            setQuantity(cartItem?.units)
        }  
    }, [quantity])

    // Unmount When Deleted
    useEffect(()=> {
        return( () =>{ })
    }, [])

    return (
        <li className= {`pos-line-item ${ openMoreInfo ? 'pos-line-item-options-open': ''}`}> 
            <div> 
                <span className="shoppingcart-item-span"  onClick={handleMoreInfo}>
                    { 
                        !openMoreInfo
                            ?(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg> ) 
                            :(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>)
                    }
                </span>

                <span  className="pos-qty-input">{cartItem?.units}</span>
                <span className="price-name">{cartItem?.product?.name}</span>

                {/* <td className="pos-qty-input-container"> 
                    <button className="post-qty-step-down" onClick={ (e) => stepDown(skuItem) }> - </button>
                    
                    <input type="text" className="pos-qty-input" value={ cartItem?.qty } onInput={ (e) => customValue(e) } /> 
                    
                    <button className="post-qty-step-up" onClick={ (e) => stepUp(skuItem) }> + </button>
                </td> */}

                {/* <td id="unit-price">${item.price}</td> */}
                <span className="pos-qty-total">{ formatCurrecy(cartItem?.subtotal) }</span>
                <span className="pos-item-remove"> 
                    <button onClick={ (e) => removeItemFromCart(e, cartItem?.sku)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="pos-trsh-icon" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button> 
                </span>

            </div>
            
            {
                openMoreInfo 
                ?(<span className="shoppingcart-change-qty"> 
                        <button  className="shoppingcart-reduce-qty-button" onClick={ (e) => {stepDown(e) } } > - </button>
                        <input 
                            placeholder={cartItem?.units}
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