import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { load_location_info } from "../actions/Location";


//Styles
import "../static/css/pages/locationSetting.css"

const LocationSettings  = ({  load_location_info, location_address, location_city, location_country, location_department, 
                              location_email, location_type, location_status, location_tax, location_pre_taxed }) => {


  // console.log(location_info)
  // TODO: ADD FUCTIONALITY TO EDIT THE LOCATION INFORMATION
  // TODO: ADD A i icon for information about the product inlcude information
    return(
      <div id="location-container">

        <div className="location-information-wrapper-container">
          <h1> Informacion Del Local </h1>

          <div className="location-information-wrapper">

            <div className="location_address_info">
              <div className="location-address-wrapper">

                <div>
                  <p>Direccion: </p>
                  <p>{location_address}</p>
                </div>

                <div>
                  <p>Ciudad: </p>
                  <p>{location_city} </p>
                </div>

                <div>
                  <p>Departamento: </p>
                  <p>{location_department} </p>
                </div>

                <div>
                  <p>Pais: </p>
                  <p>{location_country} </p>
                </div>

              </div>
            </div>
            
            <div className="location-tax-info">
                <div>
                  <p>Impuestos Locales: </p>
                  <p>{location_tax}%</p>
                </div>

                <div>
                  <p>Productos ya incluyen Impuestos: </p>
                  <p>{location_pre_taxed? 'SI': 'NO'} </p>
                </div>
            </div>

          </div>
          {/* <button> EDITAR </button> */}
        </div>
      </div>  
    )
}


const mapStateToProps = state => ({
    location_address: state.Location_re.location_address,
    location_city: state.Location_re.location_city,
    location_country: state.Location_re.location_country,
    location_department: state.Location_re.location_department,
    location_email: state.Location_re.location_email,
    location_type: state.Location_re.location_type,
    location_status: state.Location_re.location_status,
    location_tax: state.Location_re.location_tax,
    location_pre_taxed: state.Location_re.location_pre_taxed
});

export default connect(mapStateToProps, {load_location_info})(LocationSettings);