import axios from "axios";
import Cookies from "js-cookie";
import {
    HOST_URL,
    AUTHENTICATED_FAIL
} from './types';


let baseURL = HOST_URL

let accessToken = Cookies.get('access') === null ? Cookies.get('access') : null
let refreshToken = Cookies.get('refresh') === null ? Cookies.get('refresh') : null

// export const CheckAccessToken = () =>{    

//     if(accessToken === null){                                                                                //TESTING ONLY 
//         dispatch({
//             type: AUTHENTICATED_FAIL,
//             payload: false
//         });
//         return;
//     }

//     return accessToken;
// }

// export const checkRefreshToken = () => {

//     if(refreshToken === null){                                                                                //TESTING ONLY 
        
//         return;
//     }
//     return refreshToken;
// }

export const axiosInstance = axios.create({
    HOST_URL,
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
    }

});

export const axiosRefresh = axios.create({
    HOST_URL,
    headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + refreshToken
    }

});



// export default axiosInstance;