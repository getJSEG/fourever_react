import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    LOAD_PRODUCT_SUCCESS,
    LOAD_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL
} from '../../actions/types';

const initialState = {
    product: null,
    isLoading: true,
    productCreated: false,
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) { 
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                productCreated: payload,
                isLoading: false
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                productCreated: payload,
                isLoading: true
            }
        case LOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product,
                isLoading: payload.isLoading
            }
        case LOAD_PRODUCT_FAIL:
            return {
                ...state,
                product: "",
                isLoading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_SUCCESS:
        case DELETE_PRODUCT_FAIL:
        default:
            return state
    }
}