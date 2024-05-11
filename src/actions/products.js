import axios from 'axios';
import {checkAuthentication} from './CheckAuthentication';
import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    LOAD_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
} from './types';


// gets the product

export const load_products = () => async dispatch => {

    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);             
    if(token === null){                                                                                //TESTING ONLY 
        dispatch({ type: AUTHENTICATED_FAIL,   payload: false });
        return;
    }
    const str_token = JSON.parse(token).access_token;

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/products`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + str_token
        }
    }  

    try{
        axios.request(config)
        .then( response => { 
            if (response.status >= 200 && response.status <= 299) { 
                dispatch({
                    type: LOAD_PRODUCTS_SUCCESS,
                    payload: response.data
                })
            } 
        })

    }catch(err) {
        dispatch({ type: LOAD_PRODUCTS_FAIL })
    }
}






export const create_product = (product_name, product_brand) => async dispatch => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken") // this will get cookie
        },
        mode: 'same-origin',
        body: JSON.stringify({ name: product_name, brand: product_brand }),
    };

    try{
        await fetch('/api/createproduct',requestOptions)
        .then(response => {
            if(response.status >= 200 && response.status <= 299){
                console.log(response)
                return response.json()
            }else{
                dispatch({
                    type: CREATE_PRODUCT_FAIL,
                    payload: false
                })
            }
        })
        .then( data => {
            dispatch({
                type:CREATE_PRODUCT_SUCCESS,
                payload: true
            })
        })

    }catch(err){
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: false
        })
    }

}

export const update_product = () => async dispatch => {

}

export const delete_product = () => async dispatch => {

}