import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";

import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./persistApiSlice";

import Template from "./Template";

import { useGetLocationQuery } from "../location/locationApiSlice";

const RequireAuth = () => {

    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    const{
        data:
        locationData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetLocationQuery()

    // console.log({...locationData})

    
    // const getLocation = async() => {
    //     try{
    //         if(token){ 
    //             // const location = await locationData().unwrap()

    //             console.log(locationData)

    //             useDispatch( setCredentials({...locationData} ))
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }

    // console.log("This is sucess :", isSuccess);
    // if(isSuccess){

    
    
    // }
    
    // }

    // useEffect( () => {
        
    // }, [token])
    // Todo: get the location infor from here
    // console.log("This is the Require Auth Path", token)
    // Here is were i put the Position/Roles and then render the items 
    /*
        get user Roles ?
        <Outlet />
        : acces Token
            ?   <Navigate to='/unauthorized'  state={{from: location}} replace/>
            :   <Navigate to='/login' state={{from: location}} replace />
    */

    // const content = isLoading ? <Loading /> : ()

    // return content
    return (
        token
        ? <Template> <Outlet/> </Template>
        : <Navigate to="/login" state={{from: location }} replace />
    )
}

export default RequireAuth 