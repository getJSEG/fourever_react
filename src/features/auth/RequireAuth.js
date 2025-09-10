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
        try {
            dispatch(setUserRoles({...userRolesData}));
        }catch ( err ){
            console.log(err);
        }
    }, []);

    return (
        
        !token
        ? <Navigate to="/login" state={{from: location }} replace /> 
            : isUserRolesLoading 
                ? <Loading /> 
                    : userRolesData?.roles.some( role => allowedRoles?.includes(role.toLowerCase())) 
                        ? <Template> <Outlet/> </Template> 
                            : <Navigate to="/unathorized" state={{from: location }} replace /> 
    )
}

export default RequireAuth 