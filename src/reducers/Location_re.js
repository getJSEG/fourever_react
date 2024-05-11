import {
    LOAD_LOCATION_INFO_SUCCESS,
    LOAD_LOCATION_INFO_FAIL,
    UPDATE_LOCATION_INFO_SUCCESS,
    UPDATE_LOCATION_INFO_FAIL
} from '../actions/types';

const initialState = {
    location_address: '',
    location_city: '',
    location_country:'',
    location_department:'',
    location_email:'',
    location_type:'',
    location_status:'',
    location_tax:'',
    location_pre_taxed:''
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case LOAD_LOCATION_INFO_SUCCESS:
            return {
                ...state,
                location_address: payload.data[0].address,
                location_city: payload.data[0].city,
                location_country:payload.data[0].country,
                location_department:payload.data[0].department,
                location_email:payload.data[0].email,
                location_type:payload.data[0].location_type,
                location_status:payload.data[0].status,
                location_tax: payload.data[0].local_tax,
                location_pre_taxed: payload.data[0].pre_tax_items
            }
        case LOAD_LOCATION_INFO_FAIL:
            return {
                ...state,
                location_info: '',
                location_tax:'',
                location_pre_taxed:''
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