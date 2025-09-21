import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../features/auth/authSlice"

const baseUrl = "https://django-app-production-8c52.up.railway.app/api/"

const baseQuery = fetchBaseQuery ({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token =  getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401){
        // Send Refresh Token to get new aaces token
        const refreshResult = await baseQuery({ url: '/refresh/', method:'POST',
                                            }, api, extraOptions)
        if ( refreshResult?.data ) {
            // const user = api.getState().auth.user
            // Store new token
            api.dispatch( setCredentials({ ...refreshResult.data}))
            // Retry the original query with new access token
            result = await baseQuery( args, api, extraOptions)
        }else{
            api.dispatch(logOut())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})