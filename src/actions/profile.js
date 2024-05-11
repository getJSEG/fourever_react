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

// get User information
export const load_user = () => async dispatch =>  {

    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);                                         // Get the token from local storage
    const str_token = JSON.parse(token).access_token                                                    // Parse to JSON

    if(token === null){
        console.log("this runs because refresh token was not found")            //TESTING ONLY 
        dispatch({
            type: AUTHENTICATED_FAIL, 
            payload: false
        })
        return;
    }
    const config = { headers: { 'Authorization': 'Bearer ' + str_token } }                              // Sets the header to bearer token

    await axios.get(`${HOST_URL}/api/profile`, config)
    .then( (res) => {
        // console.log(res)
        if (res.status >= 200 && res.status <= 299) { 
            dispatch({ 
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        } 
    })
    .catch( err => { 
        dispatch({ type: LOAD_USER_PROFILE_FAIL }) 
    })
}

export const update_profile = (first_name, last_name, address) => async dispatch => {

}