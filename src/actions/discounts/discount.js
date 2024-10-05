import axios from 'axios';
import Cookies from 'js-cookie';
import {
    GET_DISCOUNT_SUCCESS,
    GET_DISCOUNT_FAIL,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from '../types';


 export const getDiscount = (discount) => async dispatch => {
    const token = Cookies.get("access");  

    if(token === null){
        dispatch({ 
            type: AUTHENTICATED_FAIL,
            payload: false
        });
        return;
    }  

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/put/discount`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        params: {
            'discount_code': discount
        }
    }  
    
    axios.request(config)
    .then( (respose) => {
        if (respose.status >= 200 && respose.status <= 299) { 
            dispatch({ 
                type: GET_DISCOUNT_SUCCESS,
                payload: {
                    discountInfo: respose.data.message,
                    discountFail: false,
                    isLoading: false
                }
            })
        } 
    })
    .catch( err => { 
        // console.log(err.response.data)
        dispatch({ 
            type: GET_DISCOUNT_FAIL,
            payload: {
                discountFail: true,
                discountMessage: err.response.data,
                isLoading: false
            }
        }) 
    })
 }