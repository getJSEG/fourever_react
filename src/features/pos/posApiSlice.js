import { apiSlice } from "../../app/api/apiSlice";

const posApiSlice = apiSlice.injectEndpoints({
    // tagTypes: ['Products'],
    endpoints: builder =>( {
        getPosProducts: builder.query({
            query: () => '/pos/products',
            providesTags: ['Products']
        }),
        checkout: builder.mutation({
            query: (payment) => ({
                url: '/pos/checkout',
                method: 'POST',
                body: { ...payment }
            })
        }),

    })
})

export const {
    useGetPosProductsQuery,
    useCheckoutMutation
} = posApiSlice

export default posApiSlice