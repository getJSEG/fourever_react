import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    HOST_URL,
} from './types';

import { getAccessCookie } from './auth';

const token = Cookies.get("access"); 

// get User information
export const loadUserProfile = () => async dispatch =>  {

    getAccessCookie(token);

    const config = {
        method: 'get', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/profile`,
        headers: { 
            "Authorization": "Bearer " + token
        }
    }  

    axios.request(config)
    .then( (response) => {
        if (response.status >= 200 && response.status <= 299) {
            // console.log(response)
            dispatch({ 
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: response.data
            })
        } 
    })
    .catch( err => { 
        dispatch({ 
            type: LOAD_USER_PROFILE_FAIL,
            payload: false
        }) 
    })
}

// export const update_profile = (first_name, last_name, address) => async dispatch => {

// }