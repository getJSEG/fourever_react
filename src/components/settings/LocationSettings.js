import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { loadLocationInformation } from "../../actions/Location";


//Styles
import "../../static/css/pages/locationSetting.css"

const LocationSettings  = ({  loadLocationInformation, address,
city,
country,
department,
email,
type,
status,
tax,
isPreTaxed,
isLoading}) => {


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
                  <p>{address}</p>
                </div>

                <div>
                  <p>Ciudad: </p>
                  <p>{city} </p>
                </div>

                <div>
                  <p>Departamento: </p>
                  <p>{department} </p>
                </div>

                <div>
                  <p>Pais: </p>
                  <p>{country} </p>
                </div>

              </div>
            </div>
            
            <div className="location-tax-info">
                <div>
                  <p>Impuestos Locales: </p>
                  <p>{tax}%</p>
                </div>

                <div>
                  <p>Productos ya incluyen Impuestos: </p>
                  <p>{ isPreTaxed ? 'SI' : 'NO'} </p>
                </div>
            </div>

          </div>
          {/* <button> EDITAR </button> */}
        </div>
      </div>  
    )
}


const mapStateToProps = state => ({
  address: state.location.address,
  city: state.location.city ,
  country: state.location.country ,
  department: state.location.department ,
  email: state.location.email ,
  type: state.location. type,
  status: state.location.status ,
  tax: state.location.tax ,
  isPreTaxed: state.location.isPreTaxed ,
  isLoading: state.location.isLoading
});

export default connect(mapStateToProps, {loadLocationInformation})(LocationSettings);