import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./persistApiSlice";

import Template from "./Template";

import { useGetLocationQuery } from "../location/locationApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlices";
import { selectPermissions } from "../users/userSlice";
import { setStoreInfo } from "../location/locationSlice";
import { setProfile } from "../users/userSlice";
import { selectRoles } from "../users/userRolesSlice";
import Loading from "../../components/common/Loading";

const RequireAuth = ({ allowedRoles }) => {

    const token = useSelector(selectCurrentToken);
    const roles =  useSelector(selectRoles);
    const location = useLocation();

    const { data: locationData, isLoading, isSuccess, isError, error } = useGetLocationQuery();
    const { data: userData, isLoading:isUserDataLoading, isSuccess: isUserDataSuccess } = useGetUsersQuery();
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

    return (
        !token
        ? <Navigate to="/login" state={{from: location }} replace /> 
            : roles?.length === 0
                ? <Loading />
                    : roles?.some( role => allowedRoles?.includes(role.toLowerCase())) 
                        ? <Template> <Outlet/> </Template> 
                            : <Navigate to="/unathorized" state={{from: location }} replace /> 
    )
}

export default RequireAuth 