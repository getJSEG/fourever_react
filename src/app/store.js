import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import locationReducer from '../features/location/locationSlice'
import persistReducer  from '../features/auth/persistSlice'
import userSlice from '../features/users/userSlice';
import userRolesSlice from '../features/users/userRolesSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        location: locationReducer,
        user: userSlice, 
        userRoles: userRolesSlice,
        persist: persistReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

// import { applyMiddleware } from 'redux';

// import { legacy_createStore as createStore } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { thunk } from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import rootReducer from './reducers';

// const initialState = {};
// const logger = createLogger()

// const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;