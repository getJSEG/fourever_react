import React, { useState, useEffect, useRef }from "react";
import { Link, useParams} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// component
// import VarientCondenseForm from "./VarientCondenseForm";
import VarientItemList from "./VarientListItem";
import BarcodeGenerator from "./BarcodeGenerator";


// TODO: Edit Single Variant Only
// Remove the Edit Button and Move it to the Variant item

const VarientList  = ({ productName, productId, variants, errorMessageHandler, successMessageHandler }) => {


                        
    // const [selectedVarients, setSelectedVarients] = useState([]);
    // const [getVarientId, setGetVarientId] = useState('');
    // // button to edit varient
    const [editVarient, setEditVarient] = useState(false);
    // List of varient that will be edited
    const [varientEditedList, setVarientEditedList] = useState([])
    // This handles the checkboxes
    const [selectedVariant, setSelectedVariant] = useState([]);


    // Adding object to the varient list that will edited
    const concatVarientForm = (formData, varientId) => {
        // Making a copy of the form Data
        const formCopy = { ...formData }
        
        // Check if the  fields are empty
        if(formData.color || formData.units || formData.size || formData.price) {
            Object.keys(formCopy).map( (key) => {
                // check if the firls are empty
                if(formCopy[key] === "")
                    delete formCopy[key]
            })
            // checking for duplicates
            const isDuplicate = varientEditedList.some( (item) => { return JSON.stringify(item.id) === JSON.stringify(formCopy.id) })

            if(!isDuplicate) {
                setVarientEditedList([...varientEditedList, formCopy])
            }else{
                // Copy list
                // Search for item and get the index
                // override the item and return the updated list
                setVarientEditedList((prev) => {
                    const listCopy = [...prev]
                    const dupVarIndex = listCopy.map( item => item.id).indexOf( varientId )
                    listCopy[dupVarIndex] = formCopy
                    return listCopy
                })
            }
        }
    }



    // // Begin the Edit Process Varient
    // const handleUpdateVarient = () => {
    //     setEditVarient(true);
    //     handleSaveEditedVarient(false);
    // }

    // // This saves the info Edited
    // const handleSaveVarient = () => {
    //     // send item to the function that will send it to the back end
    //     updateVarient(productId,varientEditedList);
    //     // await load_product(productId); 
    //     // return everything to its original state 
    //     setEditVarient(false);
    //     handleSaveEditedVarient(true);
    // }



    // Select all items from list to create barcodes
    const handlecheckedAll = (e) => {
        const rolesArray = variants.map(varient=> {
            let item = {}
            item = {
                name: productName,
                color: varient.color,
                sku: varient.sku,
                size: varient.size
            }
            return item 
        });
        //on check of the master checkbox, return all roleIds and on uncheck, an empty array
        setSelectedVariant(e.target.checked ? rolesArray : [])
    }

    // handles select one item at a time to generate barcode
    const handleCheck = (e) => {
        const sku = e.target.value;  
        if(e.target.checked){
            let checkedVariant = variants.filter( item => item.sku === sku )
            setSelectedVariant([...selectedVariant, {
                name: productName,
                color: checkedVariant[0].color,
                size: checkedVariant[0].size,
                sku:  checkedVariant[0].sku
            }])
        }else{
            setSelectedVariant(selectedVariant.filter( item => item.sku !== sku ))
        }
    }

    return(
      <div className="background-container b varient-list">
        
        <div className="varients-wrapper"> </div>
        <div className="varient-list header">

            <p className="gray-txt-90 pt18"> Varientes </p> 

            <div className="action-button-wrapper">
                <div className="button-container">
                    
                    <Link to={`/product/${productId}/variant/create`}>
                        <button className="variant-btn btn-primary pointer rounded-lg"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="varient-list-svg">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </Link>


                    { 
                        selectedVariant.length <= 0 
                        ? <button disabled={selectedVariant.length <= 0} className="variant-btn btn-primary pointer rounded-lg"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg>
                            </button> 

                        :<PDFDownloadLink className="cursor-pointer varient-dowload" 
                                document={  <BarcodeGenerator  productName={productName} varientData={selectedVariant} /> } fileName="codigos"> 
                                    
                                <button disabled={variants.length <= 0} className="variant-btn btn-primary pointer rounded-lg"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                    </svg>
                                </button>
                            </PDFDownloadLink>
                    }
                </div>
            </div>
        </div>
        
        <table className="list-table">
            <thead className="list-head">
                <tr id="table-row">

                    <th className="select-all head-title">  
                        <input  disabled={editVarient ? true : false} type="checkbox" 
                                id="select-all-varient" 
                                onChange={handlecheckedAll}
                        /> 
                    </th>
                    
                    <th className="image head-title"> Img </th>
                    <th className="color head-title"> color </th>
                    <th className="units head-title"> Uds. </th>
                    <th className="units head-title"> Talla </th>
                    <th className="price head-title"> precio </th>
                    <th className="sku-head hide-item head-title"> ID </th>
                    <th className="remove head-title"> Remr. </th>
                </tr>
            </thead>
            <tbody className="varient table-body">
                {
                    variants?.map( item => {
                        return <VarientItemList key={item.sku} 
                                                variant={item} 
                                                handleCheckBox={handleCheck}
                                                selectedItems={selectedVariant} 
                                                productId = { productId }
                                                errorMessageHandler={errorMessageHandler}
                                                successMessageHandler = { successMessageHandler }
                                                editVarient={editVarient}
                                            />
                    })
                }     
            </tbody>
        </table>
      </div>  
    )
}

export default VarientList;