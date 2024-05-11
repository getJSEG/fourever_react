import {
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
 } from '../actions/types';

 const initialState = {
    skuInfo: null,
    isLoading: true
 }


export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case GET_SKU_SUCCESS:
            return {
                ...state,
                skuInfo: payload,
                isLoading: false
            }
        case GET_SKU_FAIL:
            return {
                ...state,
                varientCreated: payload,
                isLoading: true
            }
        default:
            return state
    }
}