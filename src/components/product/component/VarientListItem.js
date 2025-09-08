import React, {  }from "react";
import { useNavigate } from "react-router-dom";

// Utils
import { useDeleteVariantMutation } from "../../../features/variants/variantsApiSlice";
import { formatCurrecy } from "../../../utils/currencyFormatter";

const VarientItemList  = ({ productId, variant, selectedItems, handleCheckBox, errorMessageHandler, successMessageHandler }) => {

    const navigate = useNavigate();

    const [deleteVariant] = useDeleteVariantMutation()
    
    // Handles Delete function
    const handleDeleteVariant = async(e) => {
        e.preventDefault();
        try{
            await deleteVariant({id: variant?.id}).unwrap();
            // success message
            successMessageHandler("Variente fue Borrado");
        }catch (err) {
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }

    // navigate to the variant information component with mmore details info about the variant
    // passig the information to the component through state location
    const navigateTo = () => {
        navigate(`/product/${productId}/variant/${variant?.id}`, { state: { variant: variant } });
    }
 
    return(
        <tr className="varient-line-item">
            <td className="checkbox table-body-info" > 
                <div>
                    <input 
                        id={variant?.sku} 
                        type="checkbox"
                        value = { variant?.sku }
                        onChange={ e => handleCheckBox(e) }
                        checked={ selectedItems?.some( item =>  item?.sku === variant?.sku) }
                    />
                </div> 
            </td>
            <td className="varient-image table-body-info"> 
                <div className="varient-image-container">
                    <img src={variant?.varientImage?.link} /> 
                </div>
            </td>
            <td className="color table-body-info drk-gy-text-color pointer color-txt-blue fw600 capatilize" onClick={ () => navigateTo() }> 
                <p> { variant?.color } </p>
            </td>
            <td className="units table-body-info drk-gy-text-color"> <p> {variant?.units } </p> </td>
            <td className="units table-body-info drk-gy-text-color"> <p> { variant?.size } </p>  </td>
            <td className="price table-body-info drk-gy-text-color"> <p> { formatCurrecy(variant?.price || 0)} </p> </td>
            <td className="sku hide-item table-body-info drk-gy-text-color"> <p> { variant?.sku }</p> </td>

            {/* Delete Button */}
            <td className="remove table-body-info"> 
                <button className="trash-icon gray-bg-50 rounded-lg pointer" onClick={ (e) => { handleDeleteVariant(e) } }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" className="fill-icons-drk-blue" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                </button> 
            </td>
        </tr>
    )
}

export default VarientItemList;