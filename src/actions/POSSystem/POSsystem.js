import axios from 'axios';
import Cookies from 'js-cookie';
import {
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    GET_POS_PRODUCTS_SUCCESS,
    GET_POS_PRODUCTS_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from '../types';

 export const SKUSearch = (sku) => async dispatch => {
    
    const token = Cookies.get("access");  

    if(token === null){
        dispatch({ 
            type: AUTHENTICATED_FAIL,
            payload: {
                isAuthenticated: false,
                isLoading: false
            }
        });
        return;
    }  

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/pos/search`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        params: {
            'sku': sku
        }
    }  
    
    axios.request(config)
    .then( (respose) => {
        if (respose.status >= 200 && respose.status <= 299) {
            dispatch({ 
                type: GET_SKU_SUCCESS,
                payload: {
                    productVarientInformation: respose.data.data,
                    isLoading: false
                }
            })
        } 
    })
    .catch( err => { 
        console.log(err)
        dispatch({ type: GET_SKU_FAIL }) 
    })

 }

 export const clearVarientInformation = () => async dispatch => {
    dispatch({ 
        type: SKU_CLEAR,
        payload: {
            productVarientInformation: [],
            isLoading: false
        }
    })
}

// This gets the product for the POS Search and selection
export const getProductPOS = () => async dispatch =>{

    const token = Cookies.get("access");  

    if(token === null){
        dispatch({ 
            type: AUTHENTICATED_FAIL,
            payload: {
                isAuthenticated: false,
                isLoading: false
            }
        });
        return;
    }  

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/pos/products`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }  
    
    axios.request(config)
    .then( (response) => {
        // console.log(response.data.data)
        if (response.status >= 200 && response.status <= 299) {

            dispatch({ 
                type: GET_POS_PRODUCTS_SUCCESS,
                payload: {
                    productsPOS: response.data.data,
                    isLoading: false
                }
            })
        } 
    })
    .catch( err => { 
        dispatch({ type: GET_POS_PRODUCTS_FAIL }) 
    })

}