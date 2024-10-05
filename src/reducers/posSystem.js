import {
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    CHECKOUT_SUCCESS,
    GET_POS_PRODUCTS_SUCCESS,
    GET_POS_PRODUCTS_FAIL,
    CHECKOUT_FAIL,
    SKU_CLEAR
 } from '../actions/types';

 const initialState = {
    productVarientInformation: [],
    checkoutInfo: null,
    productsPOS: [],
    isLoading: true
 }


export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case GET_SKU_SUCCESS:
            return {
                ...state,
                productVarientInformation: payload.productVarientInformation,
                isLoading: false
            }
        case GET_SKU_FAIL:
            return {
                ...state,
                varientCreated: payload,
                isLoading: true
            }
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                checkoutInfo: payload.checkoutInfo,
                isLoading: false
            }
        case CHECKOUT_FAIL:
            return {
                ...state,
                checkoutInfo: payload,
                isLoading: true
            }
        case SKU_CLEAR:
            return {
                ...state,
                productVarientInformation: payload.productVarientInformation,
                isLoading: true
            }
        case GET_POS_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsPOS: payload.productsPOS,
                isLoading: true
            }
        case GET_POS_PRODUCTS_FAIL:
            return {
                ...state,
                productsPOS: [],
                isLoading: true
            }
        default:
            return state
    }
}