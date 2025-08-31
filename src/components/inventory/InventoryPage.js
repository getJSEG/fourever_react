import React, { useState, useEffect }from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../../features/products/productsApiSlice";
import { useDeleteProductMutation } from "../../features/products/productsApiSlice";
     
// component
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
import ProductListItem from "./ProductListItem";
import SuccessMessage from "../AlertMessage/SuccessMessage";
import ErrorMessage from "../AlertMessage/ErrorMessage";

// Styles 
import "../../static/css/pages/inventory/inventory.css"

const InventoryPage  = () => {
    // Directly to clear the state without triggering a rerender.
    window.history.replaceState({}, '');

    const navigate = useNavigate();
    const location = useLocation();

    // This gets the states from product to get if product created succefully
    let incomingSuccessMsg = location.state?.successMessage || "";

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const { data:  productsData, isLoading, isSuccess, error } = useGetProductsQuery({page, searchQuery});

    // deleting products
    const [deleteProduct] = useDeleteProductMutation();
    const [totalItems, setTotalItems] = useState(0);
    const [itemperPage, setItemsPerPafe] = useState(12);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // since we get partial data, it will always start at 0 and end at (items perPage)
    let subset =  productsData?.results?.slice(0, 12);


    const errorMessageHandler = (message) => {
        setErrorMessage(message);
    }

    const successMesageHandler = (message) => {
        setSuccessMessage(message);
    }

    const getCurrentPage = (childCurrentPage) => { 
        setPage(childCurrentPage) 
    }

    // Updated the count from the data when items are loaded
    useEffect( () => { 
        setTotalItems(productsData?.count)
    },[productsData, isLoading])

    // Search for a Specific Product
    const onChange = (e) => { setSearchQuery(e.target.value) }
    // Clear Search Term
    const clearSearchQuery = () => { setSearchQuery('') }
    
    const handleSearchBar  = async (event) => {
        event.preventDefault();
    }

    const handleDeleteProduct = async (productId) => {
        try{    
            await deleteProduct({ id: productId}).unwrap()
            successMesageHandler("Producto Fue Eliminado")
        } catch(err) {
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }

    useEffect( () => {
        successMesageHandler(incomingSuccessMsg)
    }, [incomingSuccessMsg]);


    useEffect( () => {
        return() => {
            setSuccessMessage("");
            setErrorMessage("");
        }
    }, [])
    
    let content = isLoading ? <Loading /> :(
        <section className="products main-container">
            {
                errorMessage && <ErrorMessage message = { errorMessage } 
                                              errorMessageHandler={errorMessageHandler}/>
            }
            {
                successMessage && <SuccessMessage message = { successMessage } 
                                                  successMesageHandler ={ successMesageHandler }/>
            }
 
            <p className="page-title dashboard-title"> Inventario </p>
        
            {/* products */}
            <div className="background-container">

                <div className="invtr-nav-menu">

                    <Link className="add-btn btn-primary rounded-lg remove-underline"  to="/product/create">
                        <div className="add-btn-text"> <h4 className="pt9">  Crear Producto </h4> </div>
        
                        <div className="add-btn-cross"> 
                            <svg height="20" width="20" viewBox="0 0 12 12" strokeWidth="20"
                                fill="currentColor" >
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </div>
                    </Link>


                    <div className="srch-bar-wrapper">
                        <form  className="srch-frm" onSubmit={e => handleSearchBar(e)}>

                            <div className="srch-bar-container">
                                <textarea className="srch-inpt"
                                        type="text" 
                                        autoComplete="off"
                                        onChange={e => onChange(e)}
                                        value={searchQuery}
                                        placeholder="Buscar"
                                />
                                
                                { searchQuery !== '' ?  
                                    <div className="clear-btn-wrapper srch-buttons-con">
                                        <span className="icn-container" onClick={ clearSearchQuery }>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" className="clear-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </span>
                                    </div>
                                    : <span className="empty-srch-x"></span>
                                
                                }
                            </div>
                        </form>
                    </div>
                </div>

                <ul className="inventory-list" >

                    {
                        productsData?.data?.count !== 0 ? 
                            subset?.map( (product) => (
                                <ProductListItem 
                                    handleDeleteProduct={ handleDeleteProduct }
                                    key={product.id} 
                                    product={product}
                                /> 
                            )) : <div> No Hay Productos </div>
                    }
                </ul>

                <Pagination  
                    totalItems = { totalItems }
                    getCurrentPage = { getCurrentPage }
                    itemPerPage={ itemperPage } /> 
            </div>

        </section>
    )

    return content;
}

export default InventoryPage;