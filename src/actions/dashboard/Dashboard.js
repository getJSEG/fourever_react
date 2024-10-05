import axios from 'axios';
import Cookies from 'js-cookie';
import {
    GET_REVENUE_SUCCESS,
    GET_REVENUE_FAIL,
    GET_LOW_INVENTORY_SUCCESS,
    GET_LOW_INVENTORY_FAIL,
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_TRANSACTION_HISTORY_FAIL,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from '../types';

// get Revenue
 export const Revenue = (option) => async dispatch => {
    const token = Cookies.get("access");  
    // Authentication toekn
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
        url: `${HOST_URL}/api/accounting/revenue`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        params: {
            'option': option
        }
    }  
    
    axios.request(config)
    .then( (response) => {
        if (response.status >= 200 && response.status <= 299) { 
            // console.log(respose.data.data)

            dispatch({ 
                type: GET_REVENUE_SUCCESS,
                payload: {
                    revenueData: response.data.data,
                    isLoading: false
                }
            })
        } 
    })
    .catch( err => { 
        dispatch({ 
            type: GET_REVENUE_FAIL,
            payload: {
                isLoading: false
            }
        }) 
    })
 }



//  Get Low Invetory
// get Revenue
export const GetLowInventory = () => async dispatch => {
    const token = Cookies.get("access");  
    // Authentication toekn
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
        url: `${HOST_URL}/api/product/varients/stock_level`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    } 


    axios.request(config)
    .then( (response) => {
        // console.log(response.data)
        if (response.status >= 200 && response.status <= 299) {
            // console.log(response.data)
            // console.log(response)
            dispatch({ 
                type: GET_LOW_INVENTORY_SUCCESS,
                payload: {
                    lowStockData: response.data,
                    isLoading: false
                }
            })
        }

    })
    .catch( err => { 
        dispatch({ 
            type: GET_LOW_INVENTORY_FAIL,
            payload: {
                isLoading: false
            }
        }) 
    })

}

// Transactions
export const getTransactionHistory = () => async dispatch => {
    const token = Cookies.get("access");  
    // Authentication toekn
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
        url: `${HOST_URL}/api/accounting/transaction_history`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    } 

    axios.request(config)
    .then( (response) => {
        // console.log(response.data)
        if (response.status >= 200 && response.status <= 299) {
            console.log(response.data)
            if(response.status === 200) {
                dispatch({ 
                    type: GET_TRANSACTION_HISTORY_SUCCESS,
                    payload: {
                        transactionHistoryData: response.data,
                        isLoading: false
                    }
                })
            }else{

                dispatch({ 
                    type: GET_TRANSACTION_HISTORY_FAIL,
                    payload: {
                        isLoading: false
                    }
                }) 
            }
            
        }

    })
    .catch( err => { 
        dispatch({ 
            type: GET_TRANSACTION_HISTORY_FAIL,
            payload: {
                isLoading: false
            }
        }) 
    })

}
