import React, { useState, useEffect, useRef }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
import { connect } from 'react-redux';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// API Calls
// import { load_product } from "../../actions/inventory/product";
import { deleteVarient } from "../../actions/inventory/varients";

// component
import VarientCondenseForm from "./VarientCondenseForm";
import VarientItemList from "./VarientListItem";
import BarcodeGenerator from "./BarcodeGenerator";

const VarientList  = ({deleteVarient, isLoading, product, productId, productName}) => {
    // const params = useParams();

    // const productId = params?.id
    const [varientState, setVarients] = useState([])
    const [productState, setProduct] = useState('')
    const [selectedVarients, setSelectedVarients] = useState([])
    const [openWindow, setWindow] = useState(false)

    // This is only for the Checkbox AllItems
    const [selectedList, setSelectedList] = useState([])

    // When the components loads this will add the varient to [varientState]
    useEffect(() => {
      if(!isLoading){
        setVarients([...product.varients])
        // setProduct(product.product)
      }
    },[isLoading, product])

    // Select A single Item to create a barcode
    const handleCheck = (e) => {

        let varient = {}
        const sku = e.target.value;  
    
        if(e.target.checked){
            let filteredVarient = varientState.filter( item => item.sku === sku )
            
            varient = {
                name: productState.name,
                color: filteredVarient[0].varient_color.color,
                size: filteredVarient[0].size,
                sku:  filteredVarient[0].sku
            }

            setSelectedList([...selectedList, varient])
        }else{
            setSelectedList(selectedList.filter( item => item.sku !== sku ))
        }
    }

    // Select multiple items to create barcodes
    const handlecheckedAll = (e) => {

        const rolesArray = varientState.map(varient=> {
            let item = {}
            item = {
                name: productState.name,
                color: varient.varient_color.color,
                sku: varient.sku,
                size: varient.size
            }

            return item 
        });
        //on check of the master checkbox, return all roleIds and on uncheck, an empty array
        setSelectedList(e.target.checked ? rolesArray : [])
    }

    // Delete Varient
    const delete_varient = (varient_id) => {
        deleteVarient(productId, varient_id);
        if(!isLoading){
            setVarients(varientState.filter( item => item.id !== varient_id ))
        }
    }

    const varientFormHandler = () => {
        setWindow(!openWindow)
    }

    return(
      <div className="b varient-list">
        
        {/* <div className="varients-wrapper"> */}
        <div className="varient-list header">
            <h4 className="title"> Varientes </h4> 

            <div className="action-button-wrapper">
                <div className="button-container">
                    
                    <button onClick= {varientFormHandler} className="button-three cursor-pointer"> Crear Variente </button>

                    { openWindow ? <VarientCondenseForm  productId={productId} closePopupForm= {varientFormHandler} />: null}
                    
                    {/* Fix the Bug Here. Document Trows a search engine problem about pascalCase */}

                    { selectedList.length <= 0 ? 
                        <button disabled={selectedList.length <= 0} className="cursor-pointer button-three"> Select A Product </button> 
                        :
                        <PDFDownloadLink className="button-link" 
                            document={  <BarcodeGenerator  productName={productName} varientData={selectedList} isLoading={isLoading} /> }
                            fileName="codigos"> 
                            <button disabled={selectedList.length <= 0} className="cursor-pointer button-three"> Genera Etiquetas </button>
                        </PDFDownloadLink>
                    }
                </div>
            </div>
        </div>
        
        <table className="varient list-table">
            <thead className="varient list-head">
                <tr id="varient table-row">

                    <th className="select-all head-title">  
                        <input  type="checkbox" 
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
                    !isLoading ? 
                        varientState?.map( item => {
                            return <VarientItemList key={item.sku}  varient={item} handleCheckBox={handleCheck} selectedItems={selectedList} deleteSelf={delete_varient} />
                        })
                    : null
                }   
            </tbody>
        </table>


      </div>  
    )
}


const mapStateToProps = state => ({
    product: state.product.product,
    isLoading: state.product.isLoading,
});


export default connect(mapStateToProps, {deleteVarient})(VarientList);