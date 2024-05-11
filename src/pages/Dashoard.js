import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


//Styles
import "../static/css/pages/Dashboard.css"

const Dashboard  = ({ delete_account, update_profile, first_name_global, last_name_global }) => {
    return(
      <div id="dashboard-container">

        <div className="product-info-container">

            <div className="total-products">
                <p> Numero de productos: </p>
                <h5> 150 </h5>
            </div>

            <div className="total-profit"> 
                <p> Ganancia: </p>
                <h5> $1,101123.00 </h5>
            </div>

            <div className="products-cost">
                <p>Nuestro Costo: </p>
                <h5> $600.00 </h5>
            </div>
        </div>

        {/* TOP ITEMS SOLD */}
        <div className="Top-selling-items">
            <h3> Prendas mas vendidas </h3>
            <div className="top-selling-item-list-container">
                <div className="item">
                    <div className="top-sold-item-img">
                        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa5Nmr12H-DeF07o0-YwYtNRatGfHIzA1aV0FMmLOTBWPwQlWIpdzLcWvf_-kwrYBCdT1wMaL1OFTxeq0JhMFNerlRwvp-aawqmA2iCL6mmcUub82JOLLgoMMo" />
                    </div>
                    <div className="top-sold-item-name">
                        <p>Cargo Jeans</p>
                        <p>Cantidad: <span className="tsi-quaitity"> 5 </span> </p>
                    </div>
                </div>
                <div className="item">
                    <div className="top-sold-item-img">
                        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSa5Nmr12H-DeF07o0-YwYtNRatGfHIzA1aV0FMmLOTBWPwQlWIpdzLcWvf_-kwrYBCdT1wMaL1OFTxeq0JhMFNerlRwvp-aawqmA2iCL6mmcUub82JOLLgoMMo" />
                    </div>
                    <div className="top-sold-item-name">
                        <p>Cargo Jeans</p>
                        <p>Cantidad: <span className="tsi-quaitity"> 5 </span> </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="sales">
        </div>
      </div>  
    )
}


const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name
});


export default connect(mapStateToProps, {})(Dashboard);