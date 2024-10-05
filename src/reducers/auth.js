import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    fieldErr: "",
    error: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                isLoading: payload.isLoading,
                fieldErr:payload.fieldErr
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                isLoading: payload.isLoading,
                fieldErr: payload.fieldErr,
                error: payload.error
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                isLoading: payload.isAuthenticated,
                fieldErr:""
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                isLoading: payload.isAuthenticated,
                fieldErr: payload.fieldErr,
                error: payload.error
            }
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
        return {
            ...state,
            loading: false
        }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                isLoading: payload.isAuthenticated,
                fieldErr:""
            }
        case REGISTER_FAIL:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case DELETE_USER_FAIL:
            return state
        default:
            return state
    };
};