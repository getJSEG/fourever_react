// import React, { Fragment } from "react";
import React, { useEffect, Component, useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

//Style css
import '../static/css/components/LineItem.css'

// TODO: ALLOW ONLY NUMBERS IN THE NIPUT FIELD 
// TODO: ALLOW ONLY FULL DIGITS FOR THE INFOR FIELD
// TOOD: ALLOW ONLY 2 DECIMAL PLACES FOR SUBTOTAL
// TODO: CHECK IF SUBTOTTAL IS NULL AND REPLACE IT TO (0.00)

const LineItem = ({item , deleteSelf, skuItem, changeqtyManual }) => {
    const [qty, setQty] = useState(item.qty)

    // useEffect(() => {
    //     getSubTotal_c(parseFloat(item.qty) * parseFloat(item.price).toPrecision(2))
    // }, []);
    

    return (
        <tr className="post-line-item">
            <td id="price-name">{item.name}</td>

            <td> <input type="text" className="post-qty-input" value={ item.qty } onInput={ e => changeqtyManual(e,skuItem)}/> </td>

            <td id="unit-price">${item.price}</td>
            <td id="pos-qty-total">${  qty >= 0 || qty === '' ? parseFloat(item.qty) * parseFloat(item.price).toPrecision(2) : '0.00' }</td>
            <td className="pos-item-remove"> 
                <button onClick={ e => deleteSelf(skuItem)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="pos-trsh-icon" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button> 
            </td>
        </tr>
    );
}



export default connect()(LineItem);