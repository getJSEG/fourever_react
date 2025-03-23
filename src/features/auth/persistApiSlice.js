import { apiSlice } from "../../app/api/apiSlice";

 export const persistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        persist: builder.mutation({
            query: () => ({
                url: '/refresh/',
                method: 'POST',
                body: {}
            })
        }),
    })
 })


 export const {
    usePersistMutation
 } = persistApiSlice