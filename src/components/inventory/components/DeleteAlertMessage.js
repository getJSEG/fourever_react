import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

import { useDeleteProductMutation } from "../../../features/products/productsApiSlice";

// { productId, handleCloseWindow, handleSettingWindow, deleteProduct }
const DeleteAlertMessage  = ({ productId, productName, handleCloseWindow }) => {

    const [deleteProduct] = useDeleteProductMutation()
    
    //This handles Confirmation of deletion and closes window
    const handleDeleteProduct = async () => { 
        try{    
            await deleteProduct({ id: productId}).unwrap()
            console.log("This product is deleted", productId)
            handleCloseWindow(false);
        } catch(err) {
            console.log(err)
            // TODO: do a switch or a chain of if statements to handle someerrors also 
            // put close window function at the end if something goes wrong
            
        }
    }

    return(
        <div className="alert-msg-box container">
            <div className="alert-msg-box-wrapper">
                <p className="alert-msg sntes"> ¿Estás seguro de que deseas eliminar el producto { productName }? </p>

                <div className="alert-msg-btn-container">
                    <button onClick={ () => handleDeleteProduct() } className="alert-msg-btn delete"> Borrar </button>
                    <button onClick={ () => handleCloseWindow(false) } className="alert-msg-btn cancel"> Cancelar </button>
                </div>     
            </div>
        </div>
    )
}

export default DeleteAlertMessage;