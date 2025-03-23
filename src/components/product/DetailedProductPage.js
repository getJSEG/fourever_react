import React, { useState, useEffect }from "react";
import { Link, NavLink, useParams} from "react-router-dom";
// import { connect } from 'react-redux';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';


import { useGetProductQuery } from "../../features/product/productApiSlice";

// component
import Loading from "../common/Loading";
import VarientList from "./component/VarientList";
import Gallery from "./component/Gallery";
// import AlertMessage from "../../components/common/AlertMessage";

//Styles
import "../../static/css/pages/productDetail.css"
import "../../static/css/components/productDetail/varientList.css"
import "../../static/css/components/productDetail/VarientItemList.css"
import "../../static/css/components/productDetail/createVarientFormCondense.css"
import "../../static/css/components/productDetail/varientShortForm.css" 

// {load_product, updateProduct, deleteVarient, isLoading, product, varients,
//     isVarientCreated, varientCreationFail, productUpdated, clearVarientCrtn,
//     isVarientLoading, varientMsg, varientUpdatedSuccess}

const DetailedProductPage  = ({}) => {
    
    const params = useParams();
    const productId = params?.id

    const {
        data:
        productData,
        isLoading,
        isSuccess, isError, error
    } = useGetProductQuery(productId)


    // const [varientState, setVarients] = useState([]);
    // const [productState, setProduct] = useState('');
    const [editForm, setEditForm] = useState(false);
    const [stockAvailable, setstockAvailable] = useState(0);
    // const [varientSForm, getVarientSForm] = useState(false);
    // const [showErrmsg, setShowErrMsg] = useState(false);
    
    // const [saveEditedVarient, setSaveEditedVarient] = useState(false);

    const [formData, setFormData] = useState({ name: '', price: '', brand: '', item_cost: '' });

    // const varientFormHandler = () => {
    //     getVarientSForm(!varientSForm)
    // }

    // // Action functions
    // // Deletion of varient
    // const delVar = (varient_id) => {
    //     setVarients(varientState.filter( item => item.id !== varient_id ))
    // }

    // // Handler Functions
    // // changin normal view to edit form
    // const handleEditForm = () => {
    //     setEditForm(true)
    // }
    // // saving Edited Main Product
    // const handleSave = () => {
    //     updateProduct(productId, formData)
    //     setEditForm(false)
    // }
    // // Saving Edited Varients
    // const handleSaveEditedVarient = (saveEditedVar) => {
    //     setSaveEditedVarient(saveEditedVar)
    // }
    // // Handle Change for the main Product
    // const handleChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value
    //     })    
    // }

    // // useEffect functiosn
    // // call Apid and Setting new information when Editing form
    // // When Component mounts this will be called
    // useEffect(() => { 
    //     load_product(productId);  
    // },[]);

    // useEffect(() => { 
    //     if(varientUpdatedSuccess)
    //         load_product(productId);  
    // },[varientUpdatedSuccess, isVarientLoading]);

    // useEffect( () => {
    //     load_product(productId); 
    //     setProduct(product.product);
    // }, [productUpdated]);

    // // When the components loads this will add the varient to [varientState]
    // useEffect(() => {
    //     setVarients([...varients])
    //     // setProduct(product.product)
    // },[isLoading, product, varients]);

    //count all of the units and sets available stocks
    useEffect( () => {
        let availableStock = 0;
        productData?.variants?.map( item => availableStock = item.units + availableStock )
        setstockAvailable(availableStock)
    }, [productData])

    // useEffect(() => {
    //     if(!isVarientLoading){
    //         if(isVarientCreated){
    //             showCompnentAlert();
    //             load_product(productId); 
    //             varientFormHandler();
    //             setShowErrMsg(true);
    //         }
    //         if(varientCreationFail) {
    //             showCompnentAlert();
    //             setShowErrMsg(false)
    //         } 
    //     }
    //   }, [isVarientLoading]);

    // useEffect(() => {
    //     // This resets the varient creation to default state
    //     clearVarientCrtn();
    //     const timeoutId = setTimeout(() => {
    //         setShowComponent(false);
    //         return clearTimeout(timeoutId)
    //       }, 3000);
    // }, [showComponent]);
  
    let content = isLoading ? <Loading /> : (
      <div className="main-container">  

        <h2 className="product-title-name"> Información sobre el Producto </h2>
        {/* product information */}
        
        <div className="background-container product-wrapper">
            <div className="edit-save-button-container">
                {/* <h1 className="product-detail-title"> {product.name}  </h1>
                { editForm ? <button onClick={handleSave}> Salvar </button> : <button onClick={handleEditForm}> Editar </button>} */}
            </div>
        
            <div className="product-information-container">
                <div className="product-information"> 
                    <Gallery varients={productData?.variants}> </Gallery>

                    <div className="product-basic-information">
                        <p className="basic-information-title"> Informacion Basica</p>

                        <div className="product-detail-info-container">
                            <h3> Nombre: </h3>
                            { editForm 
                                ? <input name="name" type="text"  placeholder={productData.name} value={formData.productName} onChange={handleChange} />
                                : <p> {productData?.name} </p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Marca: </h3>
                            { editForm 
                                ? <input name="brand" type="text"  placeholder={productData.brand} value={formData.productBrand} onChange={handleChange} />
                                : <p> {productData?.brand} </p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Nuestro Costo: </h3>
                            { editForm 
                                ? <input name="item_cost" type="number"  placeholder={productData.cost} value={formData.productCost} onChange={handleChange} />
                                : <p> {productData?.cost}</p> }
                        </div>

                        {/* <div className="product-detail-info-container">
                            <h3> Costo: </h3>
                            { editForm ? <input name="price" type="number"  placeholder={productData.cost} value={formData.productPrice} onChange={handleChange} /> : <p> {productState.price}</p> }
                        </div> */}
    
                    </div>
                </div>

                <div className="stock-information-container">
                    <div className="stock-information"> 
                        <h5 className="stock-title"> Articulos </h5>
                        <div>
                            <p> Cantidad Disponible </p>
                            <h3> {stockAvailable} </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <VarientList 
            productId={productData?.id}
            productName={productData?.name}
            variants = {productData?.variants}
            // varientList={varientState}
            // delVar={delVar} 
            // varientFormHandler={varientFormHandler}
            // varientSForm={varientSForm} 
            // handleSaveEditedVarient={handleSaveEditedVarient}
            // saveEditedVarient={saveEditedVarient}
            />
      </div>  
    )


    return content;
}

export default DetailedProductPage;