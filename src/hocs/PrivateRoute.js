import React, { useEffect, Fragment, useState } from "react";
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import Layout from "./Layout";


// request 
import { checkAuthenticated } from '../actions/auth';
import { tokenRefresh } from "../actions/auth";
import { loadUserProfile } from '../actions/profile';
import { loadLocationInformation } from "../actions/Location";
import { connect } from "react-redux";


//loading page
import Loading from "../components/Loading";

const PrivateRoute = ({checkAuthenticated, tokenRefresh, loadUserProfile, loadLocationInformation, isAuthenticated, isLoading}) => {
    
    useEffect(() => {
        checkAuthenticated();
        loadUserProfile();
        loadLocationInformation();
    }, []);

    useEffect( () => {

        let interval = setInterval( ()=> {
            // checkAuthenticated()
            tokenRefresh();
            // if(isAuthenticated){
            //     RefresnToken()
            // }
        }, 50000)

        return () => clearInterval(interval)
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

export default connect(mapStateToProps,  { checkAuthenticated, tokenRefresh, loadUserProfile, loadLocationInformation})(PrivateRoute);