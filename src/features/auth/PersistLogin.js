import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectCurrentToken } from "./authSlice";
import { selectPersist } from "./persistSlice";

import { usePersistMutation } from "./persistApiSlice";
import { setCredentials } from "./authSlice";
import { setPersist } from "./persistSlice";

import Loading from "../../components/common/Loading";
// import Template from "./Template";

// Create a new mutation Refresh

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const token = useSelector(selectCurrentToken)

    // const [persist, setPersist] = useState(false)
    // const persist = useSelector(selectPersist)
    
    const dispatch = useDispatch();
    const [persist] = usePersistMutation();

    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            // TOdo: First chec if the auth has token
            try{
                const persistData = await persist().unwrap();
                dispatch(setCredentials({...persistData}))
        
            } catch( err ) {
                console.log(err);
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