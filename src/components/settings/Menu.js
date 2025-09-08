import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFirstName, selectLastName, selectAvatar } from "../../features/users/userSlice";

import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { selectIsSuperUser } from "../../features/users/userSlice";
import { selectRoles } from "../../features/users/userRolesSlice";

// components
import LocationDetails from "./components/LocationDetails";
import UserProfileDetails from "./components/UserProfileDetails";
import ErrorMessage from "../AlertMessage/ErrorMessage";
import CreateLocation from "../location/CreateLocation";
import CreateLocationOwners from "../location/CreateLocationOwners";
import CreateEmployee from "../location/CreateEmployee";

import "../../static/css/pages/settings.css";

const Menu = () => {

    const navigate = useNavigate();

    const isSuperUser = useSelector(selectIsSuperUser);
    const userRoles = useSelector(selectRoles);

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);

    const [logout, {isLoading, isSuccess }] = useLogoutMutation();

    const [itemClicked, setItemClicked] = useState("");
    // const [itemList, setItemList] = useState(["storeInfo", "userProfile", "createLocation", "createUser", "createEmployee"])
    const [allUserRoles, setAllUserRoles] = useState(["owner", "manager", "employee"]);

    const itemClickedHandler = (item) => {
        setItemClicked(item)
    }

    // booleans
    const [isNewFeaturesVisible, setIsNewFeaturesVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const errorMessageHandler = (message) => {
        setErrorMessage(message)
    }

    // submit to logout url
    const submit = async() => {
        try{
            await logout();
        }catch (err) {
            errorMessageHandler(JSON.stringify(err?.data))
        }
    }


    useEffect(() => {
        if(isSuccess){
            navigate("/login", { replace: true});
        }
    }, [isSuccess]);

    useEffect(() => {
        console.log(userRoles)
    }, [userRoles]);


    // console.log(userRoles)

    return(
        <div className="setting-continer"> 

            {
                errorMessage && <ErrorMessage message={errorMessage} 
                                              errorMessageHandler={errorMessageHandler}/>
            }
            <div className="window-containers">

                <div className="setting-menu">
                    <div className="user-profile">
                        <div className="menu-user-info-container">
                            <div className="user-avatar ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="125" height="125" fill="Black" className="bi bi-person-circle" viewBox="0 0 20 20">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </div>
                            <div className="user-f-l-name">
                                <p> { firstName } {lastName} </p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <span className="li-menu-container"> 
                        <div className="menu-links-container pointer" onClick={() => itemClickedHandler("userProfile") }> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="Black" className="bi bi-person-vcard" viewBox="0 0 20 20">
                                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
                            </svg>
                            <p>Perfil De Usuario</p>
                        </div>
                    </span>

                        {isNewFeaturesVisible && <li className="li-menu-container"> 
                            <NavLink className="menu-links-container pointer" to="/dashboard"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="Black" className="bi bi-briefcase-fill" viewBox="0 0 20 20">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
                                </svg>
                                <p>Detalles Del La Compania</p>
                            </NavLink>
                        </li>}

                        {isNewFeaturesVisible && <li className="li-menu-container"> 
                            <NavLink className="menu-links-container pointer" to="/dashboard"> 
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="Black" className="bi bi-pie-chart-fill" viewBox="0 0 20 20">
                                    <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778zM8.5.015V7.5h7.485A8 8 0 0 0 8.5.015"/>
                                </svg>
                                <p>Reportes</p>
                            </NavLink>
                        </li>}

                    { 
                        !isSuperUser && <span className="li-menu-container"> 
                            <div className="menu-links-container pointer" onClick={() => itemClickedHandler("storeInfo")}> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="Black" className="bi bi-building-gear" viewBox="0 0 20 20">
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z"/>
                                    <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.386 1.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                </svg>
                                <p>Informacion Del Local</p>
                            </div>
                        </span>
                    }

                    {
                        isSuperUser &&
                            <span className="li-menu-container"> 
                                <div className="menu-links-container pointer" onClick={() =>  itemClickedHandler("createLocation")}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-building-fill-add" viewBox="0 0 20 20">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-3.59 1.787A.5.5 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.5 4.5 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5M4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                    </svg>
                                    <p>Crear Tienda</p>
                                </div>
                            </span>
                    }

                    {
                        isSuperUser &&
                            <span className="li-menu-container"> 
                                <div className="menu-links-container pointer" onClick={() =>  itemClickedHandler("createOwner") }> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 20 20">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                    </svg>
                                    <p>Crear Dueños</p>
                                </div>
                            </span>
                    }


                    { 
                       ((userRoles?.includes("Manager") || userRoles?.includes("Owner")) && !isSuperUser) &&
                        <span className="li-menu-container"> 
                            <div className="menu-links-container pointer" onClick={() =>  itemClickedHandler("createEmployee") }> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 20 20">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                </svg>
                                <p>Crear Empleados</p>
                            </div>
                        </span>
                    }

                        <span className="li-menu-container"> 
                            <div className="menu-links-container pointer" onClick={() =>  submit() }> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#333" viewBox="0 0 16 16" className="bi bi-close-window">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                                <p>Cerrar sesión</p>
                            </div>
                        </span>
                </div>





                {
                    (itemClicked === "storeInfo" && !isSuperUser)&& <LocationDetails /> 
                }

                {
                    itemClicked === "userProfile" && <UserProfileDetails />
                }

                {
                    (itemClicked === "createLocation" && isSuperUser) && <CreateLocation />
                }

                {
                    (itemClicked === "createOwner" && isSuperUser)  && <CreateLocationOwners />
                }

                {
                    itemClicked === "createEmployee" && <CreateEmployee/>
                }
            </div>

        </div>
    )
} 

export default Menu