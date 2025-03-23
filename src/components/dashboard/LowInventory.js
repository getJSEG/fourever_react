import React, { useState, useEffect }from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import { useGetStockLevelQuery } from "../../features/dashboard/dashboardApiSlice";

// Compoenents
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";
// TODO: Change the back end to retrive the varaint that is low stock
/* Low Inventory */
const LowInventory  = () => {

    const {
        data: 
        stockLevelData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetStockLevelQuery();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(stockLevelData?.length);
    const [itemperPage, setItemsPerPafe] = useState(2);

    // // Subset the items mapping
    let subset =  stockLevelData?.slice((currentPage*itemperPage)-itemperPage, currentPage*itemperPage);

    const getCurrentPage = (childCurrentPage) => { setCurrentPage(childCurrentPage) }


    useEffect( () => {
        setTotalItems(stockLevelData?.length)
    }, [stockLevelData]);

    const handleClick = (productId) => {
        navigate(`/product/${productId}`);
    }

    let content = isLoading ? <Loading /> : ( 
    <section className="background-container low-inventory-container">

        <h3 className="low-int-title"> Inventario Bajo </h3>

        <div className="low-inventory-list">
        {
            subset.length !== 0 ?  
                (
                subset?.map( (item) =>  
                    (<div key={item?.sku} className="low-inventory-item" onClick={ (e) => { handleClick(item?.id) } }>
                        <div className="low-inventory-img">
                            <img src={item?.image?.link}  alt={item?.image?.title}/>
                        </div>
                        <div className="low-inventory-info">
                            <div className="prod-name"> 
                                <p className="prod-info"> { item?.name} </p>
                                <span className="Divider"> </span>
                                <p className="prod-info"> { item?.brand }</p>
                            </div>
                            <p className="prod-brand prod-info"> Unidades Restantes: { item?.units } </p>
                            <p className="prod-brand prod-info"> color: { item?.color } </p>
                        </div>
                    </div>))
                ) 
             : <section></section>

        }   
        </div>

        <Pagination
            getCurrentPage={getCurrentPage} 
            totalItems = {totalItems}
            itemPerPage={itemperPage}
        />
    </section> )

    return content

}

export default LowInventory;