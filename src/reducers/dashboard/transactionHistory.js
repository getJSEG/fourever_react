import {
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_TRANSACTION_HISTORY_FAIL,
} from '../../actions/types';

const initialState = {
    transactionHistoryData: [],
    isLoading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_TRANSACTION_HISTORY_SUCCESS:
            return {
                ...state,
                transactionHistoryData: payload.transactionHistoryData,
                isLoading: payload.isLoading
            }
        case GET_TRANSACTION_HISTORY_FAIL:
            return {
                ...state,
                transactionHistoryData: [],
                isLoading: payload.isLoading
            }
        default:
            return state
    };
};