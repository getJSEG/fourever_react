import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
// import { logout } from '../actions/auth';

// style 
import '../static/css/pages/menu.css'
const Menu = ({username, first_name, last_name, avatar}) => {

    console.log(avatar)
    return(
        <div id="menu"> 
            <div className="user-profile">
                <div className="menu-user-info-container">
                    <div className="user-avatar"> <img /> </div>
                    <div className="menu-user-information">
                        <p> {first_name} {last_name} </p>
                        <p>  { username }</p>
                    </div>
                </div>
                
            </div>

            <li className="li-menu-container"> 
                <NavLink className="menu-links-container" to="/dashboard"> 
                    <img src="../static/images/menu/user_icon.png"/>
                    <p>Perfil De Usuario</p>
                    <img id="chevron-right" src="../static/images/menu/chevron_right.png"/>
                </NavLink>
            </li>

            <li className="li-menu-container"> 
                <NavLink className="menu-links-container" to="/dashboard"> 
                    <img src="../static/images/menu/brief_case.png"/>
                    <p>Detalles Del La Compania</p>
                    <img id="chevron-right" src="../static/images/menu/chevron_right.png"/>
                </NavLink>
            </li>

            <li className="li-menu-container"> 
                <NavLink className="menu-links-container" to="/dashboard"> 
                    <img src="../static/images/menu/pie_chart.png"/>
                    <p>Reportes</p>
                    <img id="chevron-right" src="../static/images/menu/chevron_right.png"/>
                </NavLink>
            </li>

            <li className="li-menu-container"> 
                <NavLink className="menu-links-container" to="/location-settings"> 
                    {/* <img src="../static/images/menu/pie_chart.png"/> */}
                    <p>Informacion Del Local</p>
                    <img id="chevron-right" src="../static/images/menu/chevron_right.png"/>
                </NavLink>
            </li>

            {/* <li className="li-menu-container"> 
                <a className="menu-links-container" href='/login' onClick={logout}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#333" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    <p>Cerrar sesión</p>
                    <img id="chevron-right" src="../static/images/menu/chevron_right.png"/>
                </a>
            </li> */}
        </div>
    )
} 


const mapStateToProps = state => ({
    username: state.profile.username,
    first_name: state.profile.first_name,
    last_name: state.profile.last_name,
    avatar:state.profile.avatar
});
export default connect(mapStateToProps, {})(Menu)