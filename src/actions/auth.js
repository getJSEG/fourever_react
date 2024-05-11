import React, { useCallback, useContext, useMemo, useReducer } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { load_user } from './profile';
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

//CHECKS TOKEN AND REFRESH 
export const checkAuthenticated = () => async dispatch =>{

    const refreshToken = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);                     //gets token from local storrage
    
    if (refreshToken === null){                                                            //check is local storage has this info
        console.log("this runs because refresh token was not found")
        dispatch({
            type: AUTHENTICATED_FAIL, 
            payload: false
        })
        return;
    } 
    //local storage
    const token = JSON.parse(refreshToken);                                                   // Convert string to JSON

    //call to the API backend
    // TODO: ENCODE THE PASSWORD HEADER AND SEND IT AS A HEADER. AND ENCODE IN THE BODY
    const request = axios.post(`${HOST_URL}/api/o/token/`,
        {
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRETE
        },
        {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }});

    request.then( res => {
        if(res.status >= 200 && res.status <= 299){
            const token = JSON.stringify(res.data)
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token)
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
        dispatch({  type: LOGIN_FAIL, payload: false  })
    });
} 

// THIS LOGGIN
export const login = (username, password) => async dispatch => {

    const request = axios.post(`${HOST_URL}/api/o/token/`,
        {
            grant_type: 'password',
            username: username,
            password: password,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRETE
        },
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        }});

        request.then( res => {
            if(res.status >= 200 && res.status <= 299){
                dispatch({ type: LOGIN_SUCCESS , payload: true})                           // setting the dispatch t
                console.log(res.data)                   //Testing only
                const token = JSON.stringify(res.data);                     // converting JSON string
                localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token)         // saving the token to local storage on your computer
            }
        })
        .then( data => {
            dispatch(load_user())                                           //load the user profile if success full saving token
        })
        .catch( err => {
            dispatch({ 
                type: LOGIN_FAIL,
                payload: err.message
            })
            console.log(err.message)
        })
};











// TODO: SOMETHING TO REGISTER AN ACCOUNT FOR EMPLOYEE ONLY
export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            withCredentials: true,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);

        if (res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};





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