import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

//List
import { load_products } from '../actions/inventory/products';

// component
// import ProductListItem from "../../components/inventory/ProductTableItem";
import ProductTable from "../components/inventory/productTable";
import FormCondense from "../components/inventory/FormCondense";
import TripleBoxInfo from "../components/common/TripleBoxInfo";

//Styles formain page and all components 
import "../static/css/pages/inventory.css";
import "../static/css/components/common/shortForm.css"


const Inventory  = ({ load_products, isLoading, totalVarients, totalInvestedValue, count}) => {

    const [pages, setPages] = useState([])
    const [pageCount, setpageCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState({ productSearch: ''});
    const {productSearch} = formData;
    const [popup, setpopup] = useState(false)
    const closePopupForm= e => { setpopup(false) }
    const openPopupForm = e => { setpopup(true) }

    useEffect(()=> {  load_products(currentPage);  }, [])

    const HandlePageClick = (e) => {
        setCurrentPage(e.target.value)
        load_products(e.target.value);
    }

    const handleNextPage = () => {
        if(currentPage < pageCount){
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrevPage = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const handleSearchBar  = (event) => {
        event.preventDefault();
        console.log("this input")

        console.log(productSearch )
        // setFormData({productSearch:''})
    }

    useEffect(()=> {  
        if(!isLoading){
            setPages([])
            setpageCount(Math.ceil(count/12))
            
            for(let i = 0 ; i < pageCount; i++ ){                                             
                setPages(prev => [...prev, i+1])
            } 
        }
    }, [count, pageCount]) 

    // TODO: IF THEIRS MORE THAT 4 PAGES ADD ... AND THEN IF PAGE IS SELECTED annd the next 4
    useEffect(()=> {  
        load_products(currentPage);
    }, [currentPage]) 

    return(
      <div className="products main-container">
            <h2> Inventario </h2>

            <TripleBoxInfo
                titleOne={'Productos'} 
                titleTwo={'varidades'} 
                titleTree={'Total Invertido'} 
                infoOne={!isLoading ?  count : 0} 
                infoTwo={ !isLoading ? totalVarients : 0}
                infoThree={ !isLoading ? '$' + parseFloat(totalInvestedValue).toFixed(2) : '$' + 0.00}
            >
            </TripleBoxInfo>

            {/* products */}
            <div className="product-list-container">

                <div className="product-search-bar-container">

                    <div>
                        <button onClick={openPopupForm} className="create-product-button">Crear Producto </button>
                    </div>
                    <form onSubmit={e => handleSearchBar(e)}>
                        <input className="product-search-bar"
                                name="productSearch"
                                type="text" 
                                autoComplete="off"
                                onChange={e => onChange(e)}
                                value={productSearch}
                                placeholder="Buscar"
                        />
                    </form>
                </div>

                
                <ProductTable> </ProductTable>


                <div className="page-selector-container">
                    <button onClick={handlePrevPage} className="page-prev"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </button>

                    <ul className="product-page-selector">
                        {   
                            pages.map(  item => { 

                                return <li onClick={HandlePageClick}  
                                           className={currentPage == item ? 'product-page-selector-active' : ''}
                                           key={item} value={item}> {item} </li>
                            })
                        }
                    </ul>
                    
                    <button onClick={handleNextPage} className="page-next"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>

                { popup ? <FormCondense closePopupForm={closePopupForm}/> : null}
            </div>



      </div>  
    )
}


const mapStateToProps = state => ({
    isLoading: state.products.isLoading,
    next: state.products.next,
    prev: state.products.prev,
    totalVarients: state.products.totalVarients,
    totalInvestedValue: state.products.totalInvestedValue,
    count: state.products.count,
});


export default connect(mapStateToProps, {load_products})(Inventory);