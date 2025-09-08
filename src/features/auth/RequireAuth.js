import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";

import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./persistApiSlice";

import Template from "./Template";

import { useGetLocationQuery } from "../location/locationApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlices";
import { selectPermissions } from "../users/userSlice";
import { setStoreInfo } from "../location/locationSlice";
import { setProfile } from "../users/userSlice";
import { setUserRoles } from "../users/userRolesSlice";
import { useGetUserRolesQuery } from "../users/usersApiSlices";
import Loading from "../../components/common/Loading";

const RequireAuth = ({ allowedRoles }) => {

    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    const { data: locationData, isLoading, isSuccess, isError, error } = useGetLocationQuery();
    const { data: userData, isLoading:isUserDataLoading, isSuccess: isUserDataSuccess } = useGetUsersQuery();
    const { data: userRolesData, isLoading:isUserRolesLoading , isSuccess: isUserRolesSuccess } = useGetUserRolesQuery();
    const dispatch = useDispatch();
        
    
    // when mounting
    useEffect( () => {
        if(token)
            dispatch(setStoreInfo( {...locationData} ));
    }, [isSuccess]);

    useEffect( () => {
        if(token)
            dispatch(setProfile({...userData?.profile} ));
    }, [isUserDataSuccess]);

    useEffect( () => {
        let isMounted = true;

        try {
            dispatch(setUserRoles({...userRolesData}));
        }
        catch ( err ){
            console.log(err)
        }

        return () => isMounted = false;
    }, [isUserRolesSuccess]);

    // console.log(userRolesData?.roles)
    // console.log("This is the isSucces of the roles: ",isUserRolesLoading);

    // console.log("this is the userData: ", userData);
    // // console.log("is Superuser: ", userData.is_superuser);

    // console.log("this is the location data: ", locationData)
    
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
    // Create not authorize page
    // return content
    // console.log("Token?:",token)
    // console.log("roles?:", roles)
    return (
        
        !token
        ? <Navigate to="/login" state={{from: location }} replace /> 
            : isUserRolesLoading 
              ? <Loading /> 
                    : userRolesData?.roles.some( role => allowedRoles?.includes(role.toLowerCase())) 
                      ? <Template> <Outlet/> </Template> 
                            : <Navigate to="/unathorized" state={{from: location }} replace />
        
        // <Template> <Outlet/> </Template>
        // : roles?.find( role => allowedRoles?.includes(role.toLowerCase()))
        //     ? <Template> <Outlet/> </Template>
        //     : <Navigate to="/unathorized" state={{from: location }} replace />
         
    )
    // return (
    //     roles?.find( role => allowedRoles?.includes(role.toLowerCase()))
        
    //     ? <Template> <Outlet/> </Template>
    //     : token
    //     ? <Navigate to="/unathorized" state={{from: location }} replace />
    //     : <Navigate to="/login" state={{from: location }} replace />
    // )
}

export default RequireAuth 