import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    LOAD_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL 
} from '../../actions/types';

const initialState = {
    products: [],
    isLoading: true,
    productCreated: false,
    next: null,
    totalVarients: 0,
    totalInvestedValue: 0,
    count: 0,
    prev: null

}

// TODO: ON  Strict mode the product state mutates the array has multiple duplicates
// delete the duplicates of state.products

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products,
                next: payload.next,
                prev: payload.prev,
                isLoading: payload.isLoading,
                totalVarients: payload.totalVarients,
                totalInvestedValue: payload.totalInvestedValue,
                count: payload.count,
            }
        case LOAD_PRODUCTS_FAIL:
            return {
                ...state,
                products: payload.products,
                isLoading: payload.isLoading
            }
        default:
            return state
    }
}