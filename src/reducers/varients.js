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
    isLoading: true,
    varientCreated: false
 }


export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case CREATE_VARIENT_SUCCESS:
            return {
                ...state,
                varientCreated: payload,
                isLoading: false
            }
        case CREATE_VARIENT_FAIL:
            return {
                ...state,
                varientCreated: payload,
                isLoading: true
            }
        case LOAD_VARIENTS_SUCCESS:
            return {
                ...state,
                varients: payload.data,
                isLoading: false
            }
        case LOAD_VARIENTS_FAIL:
            return {
                ...state,
                varients: "",
                isLoading: true
            }
        case UPDATE_VARIENT_SUCCESS:
        case UPDATE_VARIENT_FAIL:
        case DELETE_VARIENT_SUCCESS:
        case DELETE_VARIENT_FAIL:
        default:
            return state
    }
}