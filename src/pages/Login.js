
import React, { Component, useEffect, useState } from "react";
import '../static/css/pages/login.css'


import { login } from '../actions/auth.js';
import { connect } from 'react-redux';
import  { Navigate, useLocation } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken.js';


//media files

// TODO: CREATE A MESSAGE
import logo from '../static/images/company-logo-pink-trans.png'

const Login = ({ login, isAuthenticated, fieldErr_global, error }) => {

    const [showComponent, setShowComponent] = useState(false)
    const location = useLocation();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        // checking if the field are empty before submitting
        if(username.trim() !== ""  && password.trim() !== "") {
            login(username, password);
        }
    };
    
    useEffect(() => {
        if (error) {
          const toRef = setTimeout(() => {
            setShowComponent(true);
            clearTimeout(toRef);
          }, 500);
        }
      }, [error]);

    useEffect(() => {
        const toRef = setTimeout(() => {
            setShowComponent(false);
            clearTimeout(toRef);
          }, 500);
    }, [showComponent]);

    //Redirects to the previous path or to dashboard if their is no path
    if (isAuthenticated) {
        // console.log(location?.state?.prevUrl)
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

                <span className="error-message-container"> 
                    <p className={`err-msg ${showComponent ? 'horizontal-shaking' : '' }`} > { fieldErr_global } </p> 
                </span>
                
                <form onSubmit={e => onSubmit(e)} className="login-form">
                            <label className="sign-in-label" htmlFor="username"> Usuario </label>
                            <input  className={`login-input-username`}
                                    name="username"
                                    placeholder="Usuario"
                                    type="text" 
                                    onChange={e => onChange(e)}
                                    value={username}
                                    required
                                    onInvalid={e=> e.target.setCustomValidity('Este campo no debe estar en blanco')}
                                    onInput={ e => e.target.setCustomValidity('')}
                                    ></input>
                            <span className="err-msg"></span> 

                            <label className="sign-in-label" htmlFor="password"> Contraseña: </label>
                            <input className={`login-input-password`}
                                    name="password"
                                    type="password"
                                    autoComplete="on"
                                    placeholder="Contraseña"
                                    onChange={e => onChange(e)}
                                    value={password}
                                    required
                                    onInvalid={e=> e.target.setCustomValidity('Este campo no debe estar en blanco')}
                                    onInput={ e => e.target.setCustomValidity('')}
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
    fieldErr_global : state.auth.fieldErr,
    error: state.auth.error
});

export default connect(mapStateToProps, {login})(Login);