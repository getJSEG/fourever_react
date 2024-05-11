
import React, { Component, useState } from "react";
import '../static/css/pages/login.css'


import { login } from '../actions/auth.js';
import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken.js';


//media files
import logo from '../static/images/company-logo-pink-trans.png'

const Login = ({ login, isAuthenticated, fieldErr_global }) => {
    const [usernameEmpty, setUsernameEmpty] = useState("")
    const [passwordEmpty, setPasswordEmpty] = useState("")
    const location = useLocation();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };
    

    //Redirects to the previous path or to dashboard if their is no path
    if (isAuthenticated) {
        console.log(location?.state?.prevUrl)
        if (location?.state?.prevUrl === null || location?.state?.prevUrl !== '/login'){
            return <Navigate to="/"/>;
        }else{
            return <Navigate to={`${location?.state?.prevUrl}`}/>;
        }
    }

    return(
        <div className="login-page-container">
            <div className="logo-container">
                <img className="login-logo" src={logo}/>
            </div>

            <div className="login-form-container">

                <h4 className="begin-session-title"> Iniciar sesión </h4>
                <form onSubmit={e => onSubmit(e)} className="login-form">
                            <span className=""></span> 
                            <input  className={`login-input-username ${usernameEmpty}`}
                                    name="username"
                                    placeholder="Usuario"
                                    type="text" 
                                    onChange={e => onChange(e)}
                                    value={username}
                                    ></input>
                            <span className="err-msg"></span> 
                            <input className={`login-input-password ${passwordEmpty}`}
                                    name="password"
                                    type="password"
                                    autoComplete="on"
                                    placeholder="Contraseña"
                                    onChange={e => onChange(e)}
                                    value={password}
                                    ></input>
                        
                            <button className="btn-one" type='submit'>
                                INICIAR SESIÓN 
                                {/* <Link className="btn btn-primary" type='submit' to="/main"> INICIAR SESIÓN </Link> */}
                            </button>
                    </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    fieldErr_global : state.auth.fieldErr
});

export default connect(mapStateToProps, {login})(Login);