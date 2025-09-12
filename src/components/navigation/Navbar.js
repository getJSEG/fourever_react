import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIslocationAssigned } from "../../features/users/userSlice";
import { selectRoles } from "../../features/users/userRolesSlice";
// Style
import '../../static/css/components/Navigation.css'

const Navbar = () => {

    const isLocationAssigned = useSelector(selectIslocationAssigned);
    const userRoles = useSelector(selectRoles);
    
    const authLinks = (
        <Fragment>
            <nav id="navigation">
            <ul className="navigation-ul-list">

                {
                (isLocationAssigned && userRoles?.includes("Owner")) && 
                <li className="li-container"> 
                    <NavLink className="dashboard-link nav-links" to="/"> 
                        <svg  xmlns="http://www.w3.org/2000/svg" className="nav-i-c-a-c" width="24" height="25" fill="none" viewBox="15 15 20 20">
                            <path strokeMiterlimit="10" strokeOpacity=".8" strokeWidth="1.5" d="M21.5 21h-4c-.828 0-1.5-.746-1.5-1.667v-1.666c0-.92.672-1.667 1.5-1.667h4c.828 0 1.5.746 1.5 1.667v1.666c0 .92-.672 1.667-1.5 1.667zM21.5 32h-4c-.828 0-1.5-.566-1.5-1.263v-5.474c0-.698.672-1.263 1.5-1.263h4c.828 0 1.5.566 1.5 1.263v5.474c0 .698-.672 1.263-1.5 1.263zM30.714 27h-3.428c-.71 0-1.286.746-1.286 1.667v1.666c0 .92.576 1.667 1.286 1.667h3.428c.71 0 1.286-.746 1.286-1.667v-1.666c0-.92-.576-1.667-1.286-1.667zM30.714 16h-3.428c-.71 0-1.286.566-1.286 1.263v5.474c0 .698.576 1.263 1.286 1.263h3.428c.71 0 1.286-.566 1.286-1.263v-5.474c0-.698-.576-1.263-1.286-1.263z"></path>
                        </svg>
                        <p className="icon-name nav-i-c-a-c"> Tablero </p>
                    </NavLink>
                </li>
                }

                { 
                isLocationAssigned && 
                    <li className="li-container">
                        <NavLink className="products nav-links" to="/inventory"> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="nav-i-c-a-c" width="24" height="24" fill="none" viewBox="15 15 20 20">
                                <path strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity=".8" strokeWidth="1.514" d="M16.045 19.488h15.91"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeOpacity=".8" strokeWidth="1.514" d="M19.325 16.164h9.589c.423 0 .824.187 1.095.512l1.617 1.94c.213.257.33.58.33.913v10.408c0 1.049-.85 1.9-1.9 1.9H18.183c-1.05 0-1.9-.851-1.9-1.9V19.529c0-.334.117-.656.33-.912l1.617-1.941c.271-.325.672-.512 1.095-.512zM21.98 22.812h4.275M24.12 16.4v2.85"></path>
                            </svg>
                            <p className="icon-name nav-i-c-a-c"> Inventario </p>
                        </NavLink>
                    </li>
                }

                {
                    isLocationAssigned && 
                    <li className="li-container">
                        <NavLink className="buscar nav-links" to="/shipping"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="barcode-icon" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                            <p className="icon-name nav-i-c-a-c"> Envios </p>
                        </NavLink>
                    </li>
                }

                { isLocationAssigned && 
                    <li className="li-container">
                        <NavLink className="ventas nav-links" to="/point-of-sales"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" className="barcode-icon" viewBox="0 0 20 20">
                            <path strokeMiterlimit="10" strokeOpacity=".8" strokeWidth="1.534"  d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z"/>
                            </svg>
                            <p className="icon-name nav-i-c-a-c"> POS </p>
                        </NavLink>
                    </li>
                }

                <li className="li-container">
                    <NavLink className="menu nav-links" to="/menu"> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="nav-i-c-a-c" width="24" height="24" fill="none"  viewBox="0 0 15 15">
                            <path strokeLinecap="round" strokeMiterlimit="10" strokeOpacity=".8" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        <p className="icon-name nav-i-c-a-c"> Menu </p>
                    </NavLink>
                </li>

            </ul>

            {/* <li className="logout-container li-container">
                <a className="logout-link" onClick={logout} href="/login"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#262626" viewBox="-2 0 20 20">
                        <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                        <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>
                    <p className="logout-name"> Cerrar Sesión </p>
                </a>
            </li> */}

            </nav>
        </Fragment>
    );

    // const guestLinks = (
    //     <Fragment>
    //     </Fragment>
    // );

    return authLinks
}


export default Navbar;