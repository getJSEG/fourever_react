import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import varients from './varients';
import posSystem from './posSystem';
import location from './location'
// Inventory
import products from './inventory/products';
import product from './inventory/product';
// Discount
import discount from './discount';
// dashboard Reducer
import revenue from './dashboard/revenue';
import lowInventory from './dashboard/lowInventory';
import transactionHistory from './dashboard/transactionHistory';

export default combineReducers({
    auth,
    profile,
    products,
    product,
    varients,
    posSystem,
    location,
    discount,
    revenue,
    lowInventory,
    transactionHistory
});

//applyMiddleware(logger(), thunk)