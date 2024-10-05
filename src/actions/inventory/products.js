import axios from 'axios';
import Cookies from 'js-cookie';
import {checkAuthentication} from '../CheckAuthentication';
import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    LOAD_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
} from '../types';
// TODO: Rename all of these to camel Case

// Retrive List of products
export const load_products = (page) => async dispatch => {

    const token = Cookies.get('access');     

    if(token === null){                                                                                //TESTING ONLY 
        dispatch({ 
            type: AUTHENTICATED_FAIL,
            payload: false 
        });
        return;
    }

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/products`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        params:{
            "page": page
        }
    }  

    try{
        axios.request(config)
        .then( response => {
            if (response.status >= 200 && response.status <= 299) {

                dispatch({
                    type: LOAD_PRODUCTS_SUCCESS,
                    payload:{
                        products: response.data.results,
                        next: response.data.next,
                        prev: response.data.prev,
                        totalVarients: response.data.totalVarients,
                        totalInvestedValue: response.data.totalInvestedValue,
                        count: response.data.count,
                        isLoading: false
                    } 
                })
            } 
        }).catch(err => {
            dispatch({
                type: LOAD_PRODUCTS_FAIL,
                payload:{
                    products: [],
                    next: null,
                    prev: null,
                    isLoading: false
                } 
            })
        })

    }catch(err) {
        dispatch({ type: LOAD_PRODUCTS_FAIL })
    }
}


// This only creates a product
export const CreateProduct = (productName, productBrand, itemCost, price, imageFiles) => async dispatch => {

    const token = Cookies.get('access');     

    if(token === null){                                                             //TESTING ONLY 
        dispatch({ type: AUTHENTICATED_FAIL,   payload: false });
        return;
    }
    

    let data = JSON.stringify({ 
        "name": productName, 
        "brand": productBrand,
        "item_cost": itemCost,
        "price": price,
        "images": imageFiles
    })


    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        data: data
    } 

    axios.request(config)
    .then(response => {
        if(response.status >= 200 && response.status <= 299){
            // console.log(response)
            dispatch({ 
                type: CREATE_PRODUCT_SUCCESS,
                payload: {
                    isLoading: false
                }
            })
        }
    }).catch( err => { 
        console.log(err.response)
        dispatch({ 
            type: CREATE_PRODUCT_FAIL,
            payload: {
                isLoading: false
            }
        }) 
    })
}

// Search Product
export const retriveSearchProduct = () => async dispatch => {
    const token = Cookies.get('access');     

    if(token === null){                                                                                //TESTING ONLY 
        dispatch({ 
            type: AUTHENTICATED_FAIL,
            payload: false 
        });
        return;
    }

    // const config = {
    //     method: 'get', 
    //     maxBodyLength: Infinity,
    //     url: `${HOST_URL}/api/products`,
    //     headers: { 
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer " + token
    //     },
    //     params:{
    //         "page": page
    //     }
    // } 

}

export const delete_product = () => async dispatch => {
}