import axios from 'axios';
import {
    CREATE_VARIENT_SUCCESS,
    CREATE_VARIENT_FAIL,
    LOAD_VARIENTS_SUCCESS,
    LOAD_VARIENTS_FAIL,
    UPDATE_VARIENT_SUCCESS,
    UPDATE_VARIENT_FAIL,
    DELETE_VARIENT_SUCCESS,
    DELETE_VARIENT_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from './types';


 export const load_varients = (id) => async dispatch => {

    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);  
    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,  payload: false });
        return;
    }  
    const str_token = JSON.parse(token).access_token;


    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product/${id}/varients`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + str_token
        },
    }  

    axios.request(config)
    .then( response => { 
        if (response.status >= 200 && response.status <= 299) { 
            dispatch({
                type: LOAD_VARIENTS_SUCCESS,
                payload: response.data
            })
        } 
    })
    .catch( err => {
        dispatch({
            type: LOAD_VARIENTS_FAIL,
            payload: ''
        })
        console.log(err)
    });

 }