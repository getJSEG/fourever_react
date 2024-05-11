import {
    AUTHENTICATED_FAIL,
    TOKEN_LOCALSTORAGE_KEY
} from './types';

export const checkAuthentication = () => async dispatch => {
    // check local storage for the token
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY); 
    // if the token is not found end the function else 
    if(token === null){
        dispatch({
            type: AUTHENTICATED_FAIL, 
            payload: false
        })
        return;
    }  
    // convert the token to jnso format
    const str_token = JSON.parse(token).access_token 

    return str_token;
}
