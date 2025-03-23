import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';


import CreateVarient from "../createProduct/CreateVarient";
// This will Craeate Variant 
// Import form from the CreateVariant component
// gET AND and handle creation
const VariantForm = () => {

    // Handle Create variant here

    // useEffect(()=> {
    //     setvarientFormData( prevItems => {
    //         const newItems = [...prevItems];
    //         newItems[0] = formData;
    //         return newItems
    //     });

    // }, [formData])

    // updateVariantForm, removeVariant, varientFormInfo, productName, id, 
    

    return(
        <div className="main-container">
            <h3> This is create form Variant</h3>
            {/* <CreateVarient /> */}
        </div>
    )
}


export default VariantForm;