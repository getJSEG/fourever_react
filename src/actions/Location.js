import axios from 'axios';
import {
    LOAD_LOCATION_INFO_SUCCESS,
    LOAD_LOCATION_INFO_FAIL,
    UPDATE_LOCATION_INFO_SUCCESS,
    UPDATE_LOCATION_INFO_FAIL,
    AUTHENTICATED_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    HOST_URL,
 } from './types';

 import { checkAuthentication } from './CheckAuthentication'

 export const load_location_info = () => async dispatch => {

    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);           
    if(token === null){                                                                                //TESTING ONLY 
        dispatch({ type: AUTHENTICATED_FAIL,   payload: false })
        return;
    }
    const str_token = JSON.parse(token).access_token  

    const config = {
        method: 'GET', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/location`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + str_token
        }
    }  

    // try{
    await axios.request(config)
    .then( response => {
        if (response.status >= 200 && response.status <= 299) { 
            dispatch({
                type: LOAD_LOCATION_INFO_SUCCESS,
                payload: response.data
            })
        } 
    })
    .catch(err => {
        dispatch({ type: LOAD_LOCATION_INFO_FAIL })
    })
 }


//  TODO: Add function to update the location information