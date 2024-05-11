import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import products from './products';
import varients from './varients';
import posSystem from './posSystem';
import Location_re from './Location_re'

export default combineReducers({
    auth,
    profile,
    products,
    varients,
    posSystem,
    Location_re
});