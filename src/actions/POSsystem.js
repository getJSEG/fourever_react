import axios from 'axios';
import {
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from './types';

 export const searchSKU = (sku) => async dispatch => {
    
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);  
    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,  payload: false });
        return;
    }  
    const str_token = JSON.parse(token).access_token; 

    let data = JSON.stringify({ "sku": sku })

    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/pos`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + str_token
        },
        data: data
    }  
    

    axios.request(config)
    .then( (res) => {
        if (res.status >= 200 && res.status <= 299) { 
            dispatch({ 
                type: GET_SKU_SUCCESS,
                payload: res.data.message
            })
        } 
    })
    .catch( err => { 
        console.log(err)
        dispatch({ type: GET_SKU_FAIL }) 
    })

 }