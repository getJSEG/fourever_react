import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectCurrentToken } from "./authSlice";
import { selectPersist } from "./persistSlice";

import { usePersistMutation } from "./persistApiSlice";
import { setCredentials } from "./authSlice";
import { setPersist } from "./persistSlice";

import { useLazyGetUserRolesQuery } from "../users/usersApiSlices";
import { setUserRoles } from "../users/userRolesSlice";
import Loading from "../../components/common/Loading";


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(selectCurrentToken)
    
    const dispatch = useDispatch();
    const [persist] = usePersistMutation();
    const [getUserRoles] = useLazyGetUserRolesQuery();

    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try{
                const persistData = await persist().unwrap();
                const userRoles = await getUserRoles().unwrap();
                // setting user roles
                dispatch(setUserRoles({...userRoles}));
                dispatch(setCredentials({...persistData}));

            } catch( err ) {
                console.log("this ERROR IS INSIDE THE PERSIST", err);
            }
            finally {
                setIsLoading(false);
            }
        }
        // Avoid unwated calls to verifyRefreshToken
        !token ? verifyRefreshToken() : setIsLoading(false)
        // Unmount everything
        return () => isMounted = false;
    }, []);

    

    return (
        <>
            {
                token
                ? <Outlet />
                : isLoading ? <Loading /> : <Outlet />
            }
        </>
    )
}

export default PersistLogin 