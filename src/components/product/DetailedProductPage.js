import React, { useState, useEffect }from "react";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useGetProductQuery } from "../../features/products/productsApiSlice";
import { useUpdateProductMutation } from "../../features/products/productsApiSlice";

// Utils
import { formatCurrecy } from "../../utils/currencyFormatter";

// component
import Loading from "../common/Loading";
import VarientList from "./component/VarientList";
import Gallery from "./component/Gallery";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import SuccessMessage from "../AlertMessage/SuccessMessage";

//Styles
import "../../static/css/pages/product/productDetail.css"
import "../../static/css/pages/product/varientList.css"
import "../../static/css/pages/product/VarientItemList.css"


const DetailedProductPage  = ({}) => {
    
    const location = useLocation();
    const navigate = useNavigate();

    let successMsg = location.state?.successMsg || '';

    const params = useParams();
    const productId = params?.id

    const { data:  productData, isLoading, isSuccess, error } = useGetProductQuery(productId);
    const [updateProduct, { isLoading: updatingLoading, refetch }] = useUpdateProductMutation();

    const [editForm, setEditForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', brand: '', item_cost: '' });
    const [availableStock, setAvailableStock] = useState(0);

    const [errorMessage, setErrorMessage ] = useState("");
    const [successMessage, setSuccessMessage ] = useState("");

    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }

    const successMessageHandler = (message) => {
        setSuccessMessage(message)
    }

    // this handles the form editing
    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // change edit
    const isEditable = () => { 
        if (editForm == true) {
            submit();
        }
        setEditForm(!editForm);
    }

    const submit = async() => {
        try{
            const update = await updateProduct({id:productId, data:formData}).unwrap();
            successMessageHandler(update?.details || "Actializado Corecta mente");
        }
        catch(err) {
            errorMessageHandler(JSON.stringify(err))
        }
    }



    useEffect(() => {
        successMessageHandler(successMsg)
    }, [successMsg]);

    //Sum all of the units and sets available stocks
    useEffect( () => {
        setAvailableStock(productData?.variants?.reduce( (accumulator, variant) => accumulator + variant.units, 0 ))
    }, [productData])

    let content = isLoading ? <Loading /> : (

      <div className="main-container">  
        { errorMessage && <ErrorMessage message={errorMessage} 
                                          errorMessageHandler={errorMessageHandler}/>
        }
        { successMessage && <SuccessMessage message={successMessage} 
                                            successMesageHandler={successMessageHandler}/>
        }

        {/* Page title */}
        <p className="page-title"> Información sobre el Producto </p>

        <div className="rounded-lg pointer create-btn pt10 mt1 remove-underline mb1" onClick={() => navigate(-1) }> 
            Regresar 
        </div>

        <div className="background-container product-wrapper">
            {/* product name and edit button */}
            <div className="product-name">
                <p className="gray-txt-90 pt20"> {productData?.name}  </p>
                <span className="btn-primary edit-btn rounded-lg pointer" onClick={ isEditable }> 
                    <svg width="20" height="20" fill="currentColor" className="bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </span>
            </div>
        
            <div className="product-information-container">
                <div className="product-information"> 
                    
                    <Gallery varients={productData?.variants}> </Gallery>

                    <div className="gray-txt-90">
                        <p className="pt18"> Informacion Basica</p>

                        <div className="product-detail-info-container">
                            <h3> Nombre: </h3>
                            { editForm 
                                ? <input name="name" type="text" 
                                        placeholder={productData.name}
                                        value={formData.productName}
                                        onChange={ (e) => onChange(e)} />
                                : <p> {productData?.name} </p> 
                            }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Marca: </h3>
                            { editForm 
                                ? <input name="brand" type="text" 
                                         placeholder={productData.brand}
                                         value={formData.productBrand}
                                         onChange={(e) => onChange(e)} />
                                : <p> {productData?.brand} </p> }
                        </div>
                        <div className="product-detail-info-container">
                            <h3> Nuestro Costo: </h3>
                            { editForm 
                                ? <input name="item_cost" type="number"
                                        placeholder={productData.cost} 
                                        value={formData.productCost} 
                                        onChange={(e) => onChange(e)} />
                                : <p> {productData?.cost}</p> }
                        </div>
                    </div>
                </div>

                <div className="stock-information-container">
                    <div className="stock-information gray-bg-30"> 
                        <p className="gray-txt-90 pt20"> Articulos </p>
                        <div className="gray-bg-40">
                            <p className="gray-txt-90 p1 pt15"> Unidades Disponible </p>
                            <h3 className="gray-txt-90  pt25"> {availableStock} </h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        


        {/* All Variant List */}
        <VarientList 
            productId={productData?.id}
            productName={productData?.name}
            variants = {productData?.variants}
            errorMessageHandler={errorMessageHandler}
            successMessageHandler = { successMessageHandler }
        />
      </div>  
    )


    return content;
}

export default DetailedProductPage;