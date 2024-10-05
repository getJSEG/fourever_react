import {
    GET_DISCOUNT_SUCCESS,
    GET_DISCOUNT_FAIL,
} from '../actions/types';

const initialState = {
    discountInfo: 0,
    discountMessage: "",
    discountFail: false,
    isLoading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_DISCOUNT_SUCCESS:
            return {
                ...state,
                discountInfo: payload.discountInfo.discount,
                discountFail: payload.discountFail,
                isLoading: payload.isLoading
            }
        case GET_DISCOUNT_FAIL:
            return {
                ...state,
                discountMessage: payload.discountMessage.message,
                discountFail: payload.discountFail,
                isLoading: payload.isLoading
            }
        default:
            return state
    };
};