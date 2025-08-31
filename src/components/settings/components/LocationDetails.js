import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, useSelector } from 'react-redux';


import {selectStoreTax, selectIsPreTax, selectAddress, selectStoreNumber} from "../../../features/location/locationSlice";


import InfoBox from "./InfoBox";
// LocationInformation Here

const LocationDetails  = () => {


    const address = useSelector(selectAddress);
    const tax = useSelector(selectStoreTax);
    const isPreTax = useSelector(selectIsPreTax);
    const storeNumber = useSelector(selectStoreNumber);

  // console.log(location_info)
  // TODO: ADD FUCTIONALITY TO EDIT THE LOCATION INFORMATION
  // TODO: ADD A i icon for information about the product inlcude information
    return(
      <div className="setting-half-window">
          
        <div>
          <h1 className="setting-page-title"> Informacion Del Local</h1>

          <div className="location-information-wrapper">

            <div className="information-container">
              <div className="setting-title">
                <h4>Direccion: </h4>
                <InfoBox message={"Ubicación de la tienda"}/>
              </div>

              <div className="information">
                <p>{address}</p>
              </div>
            </div>
            

            <div className="information-container">
              <div className="setting-title">
                <h4>Impuestos Locales:  </h4>
                <InfoBox message={"Este Porcentage representa el porcentaje de impuestos que se debe recaudar en cada compra en El Salvador."}/>
              </div>

              <div className="information">
                <p>{tax}%</p>
              </div>
            </div>

            <div className="information-container">
              <div className="setting-title">
                <h4>Impuesto Includio: </h4>
                <InfoBox message={"Esta información representa si el impuesto está incluido en el precio del producto, por lo que no se inluye al momento del pago. En El Salvador siempre está incluido con el precio del producto."}/>
              </div>

              <div className="information">
                <p>{isPreTax ? "SI": "NO"}</p>
              </div>
            </div>

            <div className="information-container">
              <div className="setting-title">
                <h4>Numbero de tienda: </h4>
                <InfoBox message={"El numero de tienda, los primeros 3 numeros son cauntas tiendas hay, empesando con 100 que es (1). los ultimos 3 numeros es el pais."}/>
              </div>

              <div className="information">
                <p>{storeNumber}</p>
              </div>
            </div>

          </div>
        </div>

      </div>  
    )
}

export default LocationDetails;



