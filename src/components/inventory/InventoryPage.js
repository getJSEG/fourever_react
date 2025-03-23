import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useGetProductsQuery } from "../../features/products/productsApiSlice";

     
// component
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
import ProductListItem from "./ProductListItem";
// import TripleBoxInfo from "../../components/common/TripleBoxInfo";

//Styles formain page and all components 
import "../../static/css/components/common/searchBar.css"
// import "../../static/css/components/inventory/productTable.css"
import "../../static/css/pages/inventory.css";
import "../../static/css/components/common/deleteProductWindow.css"

// import product from "../../reducers/inventory/product";
// import AlertMessage from "../../components/common/AlertMessage";
// import Pagination from "../../components/common/Pagination";


// TODO: FIX PAGINATION
// Right now when another page loads it does not renders the other pages,
// It expenting to load fromt the index it left of Example(0,12), (12,24) exct....
const InventoryPage  = () => {

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: 
        productsData, isLoading,
        isSuccess, isError, error
    } = useGetProductsQuery({page, searchQuery});
    
    const [totalItems, setTotalItems] = useState(0);
    const [itemperPage, setItemsPerPafe] = useState(12);

    // since we get partial data, it will alwasy start at 0 and end at (items perPage)
    let subset =  productsData?.results?.slice(0, 12);

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

    let content = isLoading ? <Loading /> :(
        <section className="products main-container">
            <h2> Inventario </h2>

            {/* <TripleBoxInfo
                titleOne={'Productos'} 
                titleTwo={'varidades'} 
                titleTree={'Total Invertido'} 
                infoOne={!isLoading ?  count : 0} 
                infoTwo={ !isLoading ? totalVarients : 0}
                infoThree={ !isLoading ? '$' + parseFloat(totalInvestedValue).toFixed(2) : '$' + 0.00}
            > </TripleBoxInfo> */}

            {/* products */}
            <div className="background-container product-list-container">

                <div className="invtr-nav-menu">

                    <Link className="add-prod-button" to="/create-product">
                        <div className="add-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>           
                        </div>
                        <p className="text">  Crear Produto </p>
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

                                {/* <button className="submit-sear-query" type='submit'>
                                   Buscar
                                </button> */}
                                
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
                    {/* {console.log(productsData?.results?.length)} */}
                    {
                        productsData?.data?.count !== 0 ? 
                            subset?.map( (product) => (
                                <ProductListItem 
                                    // handleClickEvent={handleProductItemClick}
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


    // return(
    //   <div className="products main-container">
    //         {/* { productandVarCreatesSucc ? <AlertMessage message={'Variente Creado'} showMessage={ productandVarCreatesSucc }/>  : null } */}
            
    //         <h2> Inventario </h2>

    //         {/* <TripleBoxInfo
    //             titleOne={'Productos'} 
    //             titleTwo={'varidades'} 
    //             titleTree={'Total Invertido'} 
    //             infoOne={!isLoading ?  count : 0} 
    //             infoTwo={ !isLoading ? totalVarients : 0}
    //             infoThree={ !isLoading ? '$' + parseFloat(totalInvestedValue).toFixed(2) : '$' + 0.00}
    //         > </TripleBoxInfo> */}

    //         {/* products */}
    //         <div className="background-container product-list-container">

    //             <div className="invtr-nav-menu">

    //                 <Link className="add-prod-button" to="/createProduct">
    //                     <div className="add-icon">
    //                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
    //                             <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    //                         </svg>           
    //                     </div>
    //                     <p className="text">  Crear Produto </p>
    //                 </Link>

    //                 <div className="srch-bar-wrapper">
    //                     <form  className="srch-frm" onSubmit={e => handleSearchBar(e)}>

    //                         <div className="srch-bar-container">
    //                             <textarea className="srch-inpt"
    //                                     type="text" 
    //                                     autoComplete="off"
    //                                     onChange={e => onChange(e)}
    //                                     value={searchTerm}
    //                                     placeholder="Buscar"
    //                             />
                                
    //                             { searchTerm !== '' ?  
    //                                 <div className="clear-btn-wrapper srch-buttons-con">
    //                                     <span className="icn-container" onClick={ clearSearch }>
    //                                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" className="clear-x" viewBox="0 0 16 16">
    //                                             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    //                                         </svg>
    //                                     </span>
    //                                 </div>
    //                                 : <span className="empty-srch-x"></span>
                                
    //                             }
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
                
    //             <ProductTable> </ProductTable>

    //             {/* <Pagination
    //                 totalItems = { count }
    //                 getCurrentPage = { getCurrentPage }
    //                 itemPerPage={12}
    //                 > 
    //             </Pagination> */}
    //         </div>
    //   </div>  
    // )
}

export default InventoryPage;