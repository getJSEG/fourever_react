import axios from 'axios';
import Cookies from 'js-cookie';
import {
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from '../types';

 export const checkout = (CheckoutInformation) => async dispatch => {
    const token = Cookies.get("access");  

    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,  payload: false });
        return;
    }  

    const data = JSON.stringify(CheckoutInformation)

    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/pos/checkout`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        data: data
    }  
    
    axios.request(config)
    .then( (respose) => {
        if (respose.status >= 200 && respose.status <= 299) { 
            console.log(respose)
            // dispatch({ 
            //     type: CHECKOUT_SUCCESS,
            //     payload: {
            //         productVarientInformation: respose.data.data,
            //         isLoading: false
            //     }
            // })
        } 
    })
    .catch( err => { 
        console.log(err)
        dispatch({ type: CHECKOUT_FAIL }) 
    })
 }

//  export const clearCheckout = (CheckoutInformation) => async dispatch => {
//  }