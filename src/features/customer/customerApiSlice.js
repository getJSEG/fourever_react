import { apiSlice } from "../../app/api/apiSlice";

// getting, creating, deleting Discount Codes
 export const customerApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Customer'],
    endpoints: builder => ( {
        getCustomer: builder.query({
            query: (phoneNumber) => ({
                url: `customer/search?phone_number=${phoneNumber}`,
                providesTags: ['Customer']
            })
        }),
    })
 })


 export const {
    useGetCustomerQuery,
 } = customerApiSlice