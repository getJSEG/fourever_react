import React, { useState, useEffect, useRef }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
import { connect } from 'react-redux';

const VarientItemList  = ({ varient, handleCheckBox, selectedItems , deleteSelf}) => {
    // Call the backend and delete the item

    return(
        <tr className="varient-line-item">
                <td className="checkbox table-body-info" > <div>
                     <input id={varient.sku} 
                            type="checkbox"
                            value = { varient.sku }
                            onChange={ e => handleCheckBox(e) }
                            checked={ selectedItems.some( item =>  item.sku === varient.sku) }
                            />
                     </div> 
                </td>
                <td className="varient-image table-body-info"> 
                    <div className="varient-image-container">
                        <img src="https://shop.wantable.com/cdn/shop/files/Variant_512939_stream-1713552907.jpg?v=1715623296" /> 
                    </div>
                </td>
                <td className="color table-body-info"> { varient.varient_color.color} </td>
                <td className="units table-body-info"> { varient.units } </td>
                <td className="units table-body-info"> { varient.size } </td>
                <td className="price table-body-info">${ varient.price } </td>
                <td className="sku hide-item table-body-info"> { varient.sku } </td>
                {/* TODO: WHEN then user click delete this will make a call to the back end and delete the item. then it will refresh the page */}
                {/* Varient is Delete by, Product ID/Varient ID */}
                <td className="remove table-body-info"> 
                    <button className="trash-icon" onClick={ e => deleteSelf( varient.id  )}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" className="pos-trsh-icon" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button> 
                </td>
        </tr>

    )
}

const mapStateToProps = state => ({
});


export default connect(mapStateToProps, {})(VarientItemList);