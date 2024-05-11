import React, { useEffect, Fragment, useState } from "react";
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import Layout from "./Layout";


// request 
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';
import { load_location_info } from "../actions/Location";
import { connect } from "react-redux";


//loading page
import Loading from "../components/Loading";

const PrivateRoute = ({checkAuthenticated, load_user, load_location_info, isAuthenticated, isLoading}) => {
    
    useEffect(() => {
        checkAuthenticated();
        load_user();
        load_location_info();
    }, []);
    
    if (isLoading){
        return (<Loading />)
    }
    
    return isAuthenticated ? <Layout> <Outlet/>  </Layout> : <Navigate to='/login' state={{prevUrl: location.pathname}} />
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps,  { checkAuthenticated, load_user, load_location_info})(PrivateRoute);