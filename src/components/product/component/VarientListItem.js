import React, { useState, useEffect, useRef }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
import { connect } from 'react-redux';


import { useDeleteVariantMutation } from "../../../features/variants/variantsApiSlice";
// Utils
import { formatCurrecy } from "../../../utils/currencyFormatter";

// { varient, handleCheckBox, selectedItems , varientId, concatVarientForm, editVarient, saveVarient}
const VarientItemList  = ({ variant, selectedItems, handleCheckBox }) => {

    const [deleteVariant] = useDeleteVariantMutation()
    const [formData, setFormData] = useState({ id:variant.id, color: "", units: "", size: "", price: "" });

    // Handles Delete function
    const handleDeleteVariant = async(e) => {
        e.preventDefault()
        try{
            await deleteVariant({id: variant?.id}).unwrap()
        }catch (err) {
            // TODO: Have an switch or if chain of errors
            console.log(err)
        }
    }

    // const handleChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value
    //     });
    // }

    // const clearForm = () => {
    //     setFormData({ id:varient.id, color: "", units: "", size: "", price: "" })
    // }

    // useEffect( () => {
    //     if(saveVarient) {
    //         clearForm();
    //     }
    // }, [saveVarient])

    // // Adding Form Data
    // useEffect( () => {
    //     concatVarientForm(formData, varient.id)
    // }, [formData])
 
    return(
        <tr className="varient-line-item">
                <td className="checkbox table-body-info" > 
                    <div>
                        <input 
                            // disabled={ editVarient ? true : false} 
                            id={variant?.sku} 
                            type="checkbox"
                            value = { variant.sku }
                            onChange={ e => handleCheckBox(e) }
                            checked={ selectedItems.some( item =>  item.sku === variant?.sku) }
                        />
                    </div> 
                </td>
                <td className="varient-image table-body-info"> 
                    <div className="varient-image-container">
                        <img src={variant?.varientImage?.link} /> 
                    </div>
                </td>
                <td className="color table-body-info drk-gy-text-color"> { false ? <input  className="editVarient-intput" name="color" type="text"    placeholder={variant?.color} value={formData.color}    onChange={handleChange} />  : <p> {variant?.color } </p> }  </td>
                <td className="units table-body-info drk-gy-text-color"> { false ? <input  className="editVarient-intput" name="units" type="number"  placeholder={variant?.units} value={formData.units}  onChange={handleChange} />  : <p> {variant?.units } </p> }   </td>
                <td className="units table-body-info drk-gy-text-color"> { false ? <input  className="editVarient-intput" name="size"  type="text"    placeholder={variant?.size} value={formData.size}       onChange={handleChange} />  : <p> { variant?.size } </p> }   </td>
                <td className="price table-body-info drk-gy-text-color"> { false ? <input  className="editVarient-intput" name="price" type="text"    placeholder={variant?.price} value={formData.price} onChange={handleChange} />  : <p> { formatCurrecy(variant?.price)} </p> }   </td>
                <td className="sku hide-item table-body-info drk-gy-text-color"> <p> { variant?.sku }</p> </td>
                {/* TODO: WHEN then user click delete this will make a call to the back end and delete the item. then it will refresh the page */}
                {/* Varient is Delete by, Product ID/Varient ID */}
                <td className="remove table-body-info"> 
                    <button className="trash-icon" onClick={ (e) => { handleDeleteVariant(e) } }>
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