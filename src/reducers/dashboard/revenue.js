import {
    GET_REVENUE_SUCCESS,
    GET_REVENUE_FAIL,
} from '../../actions/types';

const initialState = {
    revenueData: [],
    isLoading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_REVENUE_SUCCESS:
            return {
                ...state,
                revenueData: payload.revenueData,
                isLoading: payload.isLoading
            }
        case GET_REVENUE_FAIL:
            return {
                ...state,
                isLoading: payload.isLoading
            }
        default:
            return state
    };
};