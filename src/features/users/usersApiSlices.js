import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/profile',
            keepUnusedDataFor: 300
        })
    })
})


export const {
    useGetUsersQuery
} = usersApiSlice