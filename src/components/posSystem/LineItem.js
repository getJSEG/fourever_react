// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

const LineItem = ({item , deleteSelf, skuItem, changeqtyManual, addOrRemove }) => {

    const [qty, setQty] = useState(0);
    const [openMoreInfo, setOpenMoreInfo] = useState(false);

    useEffect(()=> {
        setQty(item.qty)
    }, [item,qty])

    const handleMoreInfo = () => {
        setOpenMoreInfo(!openMoreInfo)
    }

    return (
        <li className= {`pos-line-item ${ openMoreInfo ? 'pos-line-item-options-open': ''}`}> 
            <div> 
                <span className="shoppingcart-item-span" onClick={handleMoreInfo}>
                        { 
                        !openMoreInfo ? 
                            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg> ) : 
                            (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>)
                    }

                </span>

                <span id="pos-qty-input">{item.qty}</span>
                <span id="price-name">{item.name}</span>

                {/* <td className="pos-qty-input-container"> 
                    <button className="post-qty-step-down" onClick={ (e) => stepDown(skuItem) }> - </button>
                    <input type="text" className="pos-qty-input" value={ item.qty } onInput={ (e) => changeqtyManual(e,skuItem) } /> 
                    <button className="post-qty-step-up" onClick={ (e) => stepUp(skuItem) }> + </button>
                </td> */}

                {/* <td id="unit-price">${item.price}</td> */}
                <span id="pos-qty-total">${  qty >= 0 || qty === '' ?  parseFloat(item.qty * item.price ).toFixed(2) : '0.00' }</span>
                <span className="pos-item-remove"> 
                    <button onClick={ e => deleteSelf(skuItem)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="pos-trsh-icon" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button> 
                </span>

            </div>
            
            {
                openMoreInfo ? 
                (<span className="shoppingcart-change-qty"> 
                    <button  className="shoppingcart-reduce-qty-button" onClick={ (e) => addOrRemove(e, item.sku) } > - </button>
                    <input 
                        value={qty}
                        onInput={ (e) => changeqtyManual(e,skuItem) }
                    />
                    <button className="shoppingcart-add-qty-button" onClick={ (e) => addOrRemove(e, item.sku) } > + </button>
                </span>) : null
            }
            
        </li>
    );
}



export default connect()(LineItem);