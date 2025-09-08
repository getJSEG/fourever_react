import { apiSlice } from "../../app/api/apiSlice";


 export const locationApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Location'],
    endpoints: builder => ( {
        getLocation: builder.query({
            query: () => ({
                url: 'location',
                providesTags: ['Location']
            })
        }),
        createLocation: builder.mutation({
            query: (data) => ({ 
                url: `location/create`,
                method: 'POST',
                body: { ...data  }
            }),
            invalidatesTags: ['Location']
        }),
        searchLocation: builder.query({
            query: (params) => ({
                url: 'location/search',
                params: params,
                providesTags: ['Location']
            })
        })
    })
 })


 export const {
    useGetLocationQuery,
    useLazySearchLocationQuery,
    useCreateLocationMutation
 } = locationApiSlice