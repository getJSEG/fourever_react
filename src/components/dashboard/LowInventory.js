import React, { useState, useEffect }from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import { useGetStockLevelQuery } from "../../features/dashboard/dashboardApiSlice";
import { formatCurrecy } from "../../utils/currencyFormatter";
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
    const [itemsPerPage, setItemsPerPage] = useState(2);

    // const [startIndex, setStartIndex] = useState(0);
    // const [endIndex, setEndIndex] = useState(itemsPerPage);

    //Subset the items mapping
    let subset =  stockLevelData?.slice((currentPage*itemsPerPage)-itemsPerPage, currentPage*itemsPerPage);

    const getCurrentPage = (childCurrentPage) => { setCurrentPage(childCurrentPage) }


    useEffect( () => {
        setTotalItems(stockLevelData?.length)
    }, [stockLevelData]);

    const handleClick = (productId) => {
        navigate(`/product/${productId}`);
    }

    // useEffect( () => {
    //     setStartIndex(startIndex + items)
    // }, [currentPage])


    // min 5 per page
    

    let content = isLoading ? <Loading /> : ( 
    <section className="background-container low-inventory-container">

        <h3 className='graph-title gray-txt-90'>Productos con Niveles Bajos</h3>

        <p className="pt13 p1"> Total: <span className="text-color-red fw600"> { stockLevelData?.length } </span></p>

        <div className="low-stock-container">
            
            <table className="low-stock-table">
                <thead className="low-stock-table-head">
                    <tr className="low-stock-table-head-row"> 
                        <td className="low-stock-table-head-colum" > Nombre </td>
                        <td className="low-stock-table-head-colum"> Unidades </td>
                        <td className="low-stock-table-head-colum" > Nivel Minimos </td>
                        <td className="low-stock-table-head-colum"> Precios </td>
                    </tr>
                </thead>

                <tbody className="low-stock-table-body">
                    {
                        subset.map( (product, index) => 
                            (
                                <tr className="low-stock-table-body-row" key={index}> 
                                    <td className="low-stock-table-body-colum" > 
                                        <Link className="pointer color-txt-blue remove-underline" key={product?.id} to={`/product/${product?.id}`}>  
                                            {product?.name} 
                                        </Link>
                                    </td>
                                    <td className="low-stock-table-body-colum" > <div className="low-stock-units"> {product?.variants[0]?.units} </div> </td>
                                    <td className="low-stock-table-body-colum" > {product?.variants[0]?.minUnits} </td>
                                    <td className="low-stock-table-body-colum" > {formatCurrecy(product?.variants[0]?.price) } </td>
                                </tr>
                            )
                        )
                    }
                    
                </tbody>
            </table>
        </div>

        {/* <h3 className="low-int-title"> Inventario Bajo </h3>

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
 */}

        <div className="min-units-pagination-container">
            <div className="min-units-pagination-wrapper">
            <Pagination
                getCurrentPage={getCurrentPage} 
                totalItems = {totalItems}
                itemPerPage={itemsPerPage}
            />
             </div>
        </div>

    </section> )

    return content

}

export default LowInventory;