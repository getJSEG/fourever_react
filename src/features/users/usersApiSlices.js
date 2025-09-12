import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => 'profile',
            keepUnusedDataFor: 5
        }),
        getUserRoles: builder.query({
            query: () => 'user/roles',
            keepUnusedDataFor: 5
        }),
        createUser: builder.mutation({
            query: (data) => ({ 
                url: `user/create`,
                method: 'POST',
                body: { ...data  }
            }),
            invalidatesTags: ['users']
        })
    })
})


export const {
    useGetUsersQuery,
    useLazyGetUserRolesQuery,
    useCreateUserMutation
} = usersApiSlice