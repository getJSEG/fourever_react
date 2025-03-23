import { apiSlice } from "../../app/api/apiSlice";


 export const locationApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Location'],
    endpoints: builder => ( {
        getLocation: builder.query({
            query: () => ({
                url: '/location',
                providesTags: ['Location']
            })
        }),
    })
 })


 export const {
    useGetLocationQuery,
 } = locationApiSlice