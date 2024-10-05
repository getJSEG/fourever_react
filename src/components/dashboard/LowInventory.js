import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { GetLowInventory } from "../../actions/dashboard/Dashboard";

// Styles Here

/* Low Inventory */
const LowInventory  = ({ GetLowInventory, lowStockData, isLoading }) => {

    useEffect( () => {
        GetLowInventory();
    },[])

    console.log(lowStockData == null)

    return(
        <div className="low-inventory-container">
            <h3> Inventario Bajo </h3>

            <div className="low-inventory-list">

            {

            //  !isLoading && lowStockData.length !== 0 ?  
            //                         (lowStockData.map( (item) =>  (<div key={item.product.id} className="low-inventory-item">
            //                                                             <div className="low-inventory-img">
            //                                                                 <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa5Nmr12H-DeF07o0-YwYtNRatGfHIzA1aV0FMmLOTBWPwQlWIpdzLcWvf_-kwrYBCdT1wMaL1OFTxeq0JhMFNerlRwvp-aawqmA2iCL6mmcUub82JOLLgoMMo" />
            //                                                             </div>
            //                                                             <div className="low-inventory-name">
            //                                                                 <p> { item.product.name} </p>
            //                                                                 <span> Inventario Vajo </span>
            //                                                             </div>
            //                                                         </div>) ) ) 
            //      : null

            }   
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    lowStockData: state.lowInventory.lowStockData,
    isLoading: state.lowInventory.isLoading,
});

export default connect(mapStateToProps, {GetLowInventory})(LowInventory);