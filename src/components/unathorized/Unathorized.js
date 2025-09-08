import React, { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

//Style css
import "../../static/css/pages/unauthorized.css"

//static file
// import logo from '../../static/images/loading.gif'
import character from "../../static/images/character/charecter-6.png"
import eyes from "../../static/images/character/eye-6.gif"
import hand from "../../static/images/character/hand-6.png"

const Unathorized = ({}) => {

    const navigate = useNavigate();


    const goBack = () => {
        navigate(-1);
    }

    return(
        <div className="unauthorized-page">
            <div className="unauthorized-info">
                <h1> PARA </h1>
                <h1> NO AUTORIZADO</h1>
                <p>No tienes acceso a esta página, por favor regresa a la página anterior</p>
            </div>

            <div className="unauthorized-img-container">
                <img className="character body" src={character} />
                <img className="character eyes" src={eyes} />
                <img className="character hand" src={hand} />
            </div>

            <button onClick={goBack}
                    className="button unauthorized-button"> 
                    Regresar 
            </button>
        </div>
    );
}



export default Unathorized;