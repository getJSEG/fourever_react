import axios from 'axios';
import Cookies from 'js-cookie';
import {
    LOAD_PRODUCT_SUCCESS,
    LOAD_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
} from '../types';

// Retrive Single product and its varients
export const load_product = (id) => async dispatch => {

    const token = Cookies.get("access"); 

    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,   payload: false });
        return;
    }

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product/${id}`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }  

    axios.request(config)
    .then( response => { 
        if (response.status >= 200 && response.status <= 299) {
            dispatch({
                type: LOAD_PRODUCT_SUCCESS,
                payload:{
                    product: response.data.data[0],
                    isLoading: false
                }
            });
        } 
    })
    .catch( err => {
        dispatch({
            type: LOAD_PRODUCT_FAIL,
            payload:{
                product: [],
                isLoading: false
            }
        });
    })
}

// This Updates the Product Only 
export const update_product = (productId, formData) => async dispatch => {

    console.log(formData)
    const token = Cookies.get("access"); 

    if(token === null){
        dispatch({ type: AUTHENTICATED_FAIL,   payload: false });
        return;
    }

    let data = {}

    // This Remoevs any null or empty items from the form data
    for (var key in formData){
        if(formData[key] !== null && formData[key] !== undefined && formData[key].trim() !== '') {
            data[key] = formData[key]
        }
    }

    console.log(data)

    const config = {
        method: 'patch', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product/${productId}/update/`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify(data)
    }  

    axios.request(config)
    .then( response => { 
        if (response.status >= 200 && response.status <= 299) {
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload:{
                    productUpdated: true,
                    isLoading: false
                }
            });
        } 
    }).catch( err => {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload:{
                productUpdated: false,
                isLoading: false
            }
        });
    })

}