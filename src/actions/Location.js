import Cookies from 'js-cookie';
import axios from 'axios';
import { getAccessCookie } from './auth';
import {
    LOAD_LOCATION_INFO_SUCCESS,
    LOAD_LOCATION_INFO_FAIL,
    UPDATE_LOCATION_INFO_SUCCESS,
    UPDATE_LOCATION_INFO_FAIL,
    AUTHENTICATED_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    HOST_URL,
 } from './types';

 const token = Cookies.get("access"); 

 export const loadLocationInformation = () => async dispatch => {
    
    getAccessCookie(token);
    
    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/location`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }  

    axios.request(config)
    .then( response => {
        if (response.status >= 200 && response.status <= 299) { 
            dispatch({
                type: LOAD_LOCATION_INFO_SUCCESS,
                payload: {
                    address: response.data.data[0].address,
                    city: response.data.data[0].city,
                    country: response.data.data[0].country,
                    department: response.data.data[0].department,
                    email: response.data.data[0].email,
                    type: response.data.data[0].location_type,
                    status: response.data.data[0].status,
                    tax: response.data.data[0].local_tax,
                    isPreTaxed:response.data.data[0].pre_tax_items,
                    isLoading: false,
                }
            })
        } 
    })
    .catch(err => {
        dispatch({ type: LOAD_LOCATION_INFO_FAIL })
    })
 }


//  TODO: Add function to update the location information