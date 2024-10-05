import {
    GET_LOW_INVENTORY_SUCCESS,
    GET_LOW_INVENTORY_FAIL,
} from '../../actions/types';

const initialState = {
    lowStockData: [],
    isLoading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_LOW_INVENTORY_SUCCESS:
            return {
                ...state,
                lowStockData: payload.lowStockData,
                isLoading: payload.isLoading
            }
        case GET_LOW_INVENTORY_FAIL:
            return {
                ...state,
                isLoading: payload.isLoading
            }
        default:
            return state
    };
};