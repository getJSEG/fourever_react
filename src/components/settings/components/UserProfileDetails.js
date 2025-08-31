import React, { useState, useEffect }from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectFirstName, selectLastName, selectUsername, selectAvatar } from "../../../features/users/userSlice";

import InfoBox from "./InfoBox";

const UserProfileDetails  = () => {

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const username = useSelector(selectUsername);


    return(
      <div className="setting-half-window">
         <div>
            <h1 className="setting-page-title"> Tu Informacion</h1>

            <div className="information-container">
              <div className="setting-title">
                <h4>Nombre: </h4>
                {/* <InfoBox message={"Ubicación de la tienda"}/> */}
              </div>

              <div className="information">
                <p> {firstName} {lastName}</p>
              </div>
            </div>

            <div className="information-container">
              <div className="setting-title">
                <h4>Usuario: </h4>
                <InfoBox message={"Esta es la información que utilizas para iniciar sesión"}/>
              </div>

              <div className="information">
                <p> {username} </p>
              </div>
            </div>
          </div>
      </div>  
    )
}




export default UserProfileDetails;



