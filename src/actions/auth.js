import React, { useCallback, useContext, useMemo, useReducer } from "react"
// import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { loadUserProfile } from './profile';
import { jwtDecode } from 'jwt-decode';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    TOKEN_LOCALSTORAGE_KEY,
    HOST_URL,
    CLIENT_ID,
    CLIENT_SECRETE
} from './types';


export const getAccessCookie = (token) => {

    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,  payload: false });
        return;
    }
}

// Loggin Only
export const login = (username, password) => async dispatch => {

    const request = axios.post(`${HOST_URL}/api/auth/login/`,
        {
            grant_type: 'password',
            username: username,
            password: password,
        },
        {
        headers: { 'Content-Type': 'multipart/form-data', }});

        dispatch({ 
            type: LOGIN_FAIL,
            payload: { error: false }
        })

        request.then( res => {
            if(res.status >= 200 && res.status <= 299){

                Cookies.set('access', res.data.access );
                Cookies.set('refresh', res.data.refresh );

                dispatch({ type: LOGIN_SUCCESS,
                    payload: {
                        isAuthenticated: true,
                        isLoading: false,
                        fieldErr: "",
                        error: false
                    }
                })
            }
        })
        .then( data => {
            dispatch(loadUserProfile())                                           //load the user profile if success full saving token
        })
        .catch( err => {
            // TODO: GET THE ERROR COMING FROM THE SEERVER AND DISPLAY IT TO THE USER
            dispatch({ type: LOGIN_FAIL,
                payload: {
                    isAuthenticated: false,
                    isLoading: false,
                    fieldErr: 'Usuario o clave incorrecta.',
                    error: true,
                }
            })
        })
};

// check Authentication
export const checkAuthenticated = () => async dispatch => {

    const access = Cookies.get('access')

    if (access === null){ 
        dispatch({
            type: AUTHENTICATED_FAIL, 
            payload: {
                isAuthenticated: false,
                isLoading: false,
                fieldErr: ""
            }
        })
        return;
    } 

    let data = JSON.stringify({ "token": access })

    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/token/verify/`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    }  

    axios.request(config)
    .then( res => {
        if(res.status >= 200 && res.status <= 299){
            dispatch({ 
                type: AUTHENTICATED_SUCCESS,
                payload: {
                    isAuthenticated: true,
                    isLoading: false,
                    fieldErr: ""
                } 
            }); 
        }
    })
    .catch( err => {
        dispatch({  
            type: AUTHENTICATED_FAIL,
            payload: {
                isAuthenticated: false,
                isLoading: false,
                fieldErr: err.response.data
            } 
        })
    });
} 



// this will refresh the access token
export const tokenRefresh = () => async dispatch => {

    const refresh = Cookies.get('refresh');

    if (refresh === null){ 
        dispatch({ type: AUTHENTICATED_FAIL,  payload: false })
        return;
    } 

    let data = JSON.stringify({ "refresh": refresh })
  
    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/auth/token/refresh/`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    }  
    
    axios.request(config)
    .then( res => {
            if(res.status >= 200 && res.status <= 299){

                // if(!Cookies.get('access') === null) { Cookies.remove('access') }
                // if(!Cookies.get('refresh') === null) { Cookies.remove('refresh') }
                // TODO: For deployment change this to True
                Cookies.set('access', res.data.access);
                Cookies.set('refresh', res.data.refresh);

                dispatch({ 
                    type: AUTHENTICATED_SUCCESS,
                    payload: {
                        isAuthenticated: true,
                        isLoading: false
                    } 
                }); 
            }
        })
        .catch( err => {
            dispatch({ 
                 type: AUTHENTICATED_FAIL,
                    payload: {
                        isAuthenticated: false,
                        isLoading: false
                    }  
                })
        });
}

















// TODO: SOMETHING TO REGISTER AN ACCOUNT FOR EMPLOYEE ONLY
// export const register = (username, password, re_password) => async dispatch => {
//     const config = {
//         headers: {
//             withCredentials: true,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'X-CSRFToken': Cookies.get('csrftoken')
//         }
//     };

//     const body = JSON.stringify({ username, password, re_password });

//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);

//         if (res.data.error) {
//             dispatch({
//                 type: REGISTER_FAIL
//             });
//         } else {
//             dispatch({
//                 type: REGISTER_SUCCESS
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: REGISTER_FAIL
//         });
//     }
// };





// TODO: Figure out how to logout
export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`http://127.0.0.1:8000/accounts/logout`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};




// TODO: ADD SOMTHING TO CALL AND DELETER AN ACCOUNT
export const delete_account = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.delete(`http://127.0.0.1:8000/accounts/delete`, config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
    }
};