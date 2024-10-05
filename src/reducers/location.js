import {
    LOAD_LOCATION_INFO_SUCCESS,
    LOAD_LOCATION_INFO_FAIL,
    UPDATE_LOCATION_INFO_SUCCESS,
    UPDATE_LOCATION_INFO_FAIL
} from '../actions/types';

const initialState = {
    address: '',
    city: '',
    country:'',
    department:'',
    email:'',
    type:'',
    status:'',
    tax:'',
    isPreTaxed:'',
    isLoading: true,
    infoUpdated: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOAD_LOCATION_INFO_SUCCESS:
            return {
                ...state,
                address: payload.address,
                city: payload.city,
                country: payload.country,
                department: payload.department,
                email: payload.email,
                type: payload.type,
                status: payload.status,
                tax: payload.tax,
                isPreTaxed: payload.isPreTaxed,
                isLoading: payload.isLoading
            }
        case LOAD_LOCATION_INFO_FAIL:
            return {
                ...state,
            }
        case UPDATE_LOCATION_INFO_SUCCESS:
            return {
                ...state,
                location_info: '',
            }
        case UPDATE_LOCATION_INFO_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};