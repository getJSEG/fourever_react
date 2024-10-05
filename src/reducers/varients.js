import {
    CREATE_VARIENT_SUCCESS,
    CREATE_VARIENT_FAIL,
    LOAD_VARIENTS_SUCCESS,
    LOAD_VARIENTS_FAIL,
    UPDATE_VARIENT_SUCCESS,
    UPDATE_VARIENT_FAIL,
    DELETE_VARIENT_SUCCESS,
    DELETE_VARIENT_FAIL
 } from '../actions/types';

 const initialState = {
    varients: null,
    isVarientLoading: true,
    message: '',
    isCreationSuccess: false
 }


export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case CREATE_VARIENT_SUCCESS:
            return {
                ...state,
                isVarientLoading: payload.isVarientLoading,
                message: payload.message,
                isCreationSuccess: payload.isCreationSuccess
            }
        case CREATE_VARIENT_FAIL:
            return {
                ...state,
                isVarientLoading: payload.isVarientLoading,
                message: payload.message,
                isCreationSuccess: payload.isCreationSuccess
            }
        case LOAD_VARIENTS_SUCCESS:
            return {
                ...state,
                varients: payload.data,
                isVarientLoading: payload.isVarientLoading,
            }
        case LOAD_VARIENTS_FAIL:
            return {
                ...state,
                varients: "",
                isVarientLoading: payload.isVarientLoading
            }
        case UPDATE_VARIENT_SUCCESS:
        case UPDATE_VARIENT_FAIL:
        case DELETE_VARIENT_SUCCESS:
        case DELETE_VARIENT_FAIL:
        case "DEFAULT":
            return {
                ...state,
                varients: null,
                isVarientLoading: true,
                message: '',
                isCreationSuccess: false
            }
        default: 
            return state

    }
}