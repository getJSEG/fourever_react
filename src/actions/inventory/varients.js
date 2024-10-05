import axios from 'axios';
import Cookies from 'js-cookie';
import {
    CREATE_VARIENT_SUCCESS,
    CREATE_VARIENT_FAIL,
    LOAD_VARIENTS_SUCCESS,
    LOAD_VARIENTS_FAIL,
    UPDATE_VARIENT_SUCCESS,
    UPDATE_VARIENT_FAIL,
    DELETE_VARIENT_SUCCESS,
    DELETE_VARIENT_FAIL,
    TOKEN_LOCALSTORAGE_KEY,
    AUTHENTICATED_FAIL,
    HOST_URL,
 } from '../types';

 import { getAccessCookie } from '../auth';


 const token = Cookies.get("access"); 

// Create Varient
 export const CreateVarient = (productId, formData) => async dispatch => {

    getAccessCookie(token)

    const config = {
        method: 'post', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product/${productId}/varient/`,
        headers: { 
            "Content-Type":  "multipart/form-data",// <---- this si the encription type for the format data and image file or make the file base 64
            "Authorization": "Bearer " + token
        },
        data: formData
    }  


    try {

        let createVarient = await axios.request(config)

        const newPromise = new Promise((resolve, reject) => {
            
            if(createVarient.status >= 200 && createVarient.status <= 299){
                resolve(
                    dispatch({
                        type: CREATE_VARIENT_SUCCESS,
                        payload: {
                            isVarientLoading: false,
                            message: createVarient.data.message,
                            isCreationSuccess: true
                        }
                    })
                );
            }
            else{
                reject('Something wen wrong creating varient')
            }

        });

        return newPromise;
        
    } catch (err) {
        // console.log(err)

        let errormsg = ''
        // Checking the reponse
        if(err.response.data.price === 'price') {
            errormsg =  err.response.data.price[0]
        }
        else if (err.response.data.sku === 'sku') {
            errormsg =  err.response.data.sku[0]
        }
        else{
            errormsg = "Algo salió mal al crear variante."
        }

        return dispatch({
            type: CREATE_VARIENT_FAIL,
            payload: {
                isVarientLoading: false,
                message: errormsg,
                isCreationSuccess: false
            }
        })
    }
        
 }



//  Delete Varient
 export const deleteVarient = (productId, varientId) => async dispatch => {

    const token = Cookies.get("access");  

    getAccessCookie(token)

    const config = {
        method: 'delete', 
        maxBodyLength: Infinity,
        url: `${HOST_URL}/api/product/${productId}/varient/${varientId}/delete/`,
        headers: { 
            "Authorization": "Bearer " + token
        },
    }  

    axios.request(config)
    .then( response => { 
        if (response.status >= 200 && response.status <= 299) { 
            dispatch({
                type: DELETE_VARIENT_SUCCESS,
                payload: {
                    isLoading: false
                }
            })
        } 
    })
    .catch( err => {
        dispatch({
            type: DELETE_VARIENT_FAIL,
            payload: ''
        })
        console.log(err)
    });

 }