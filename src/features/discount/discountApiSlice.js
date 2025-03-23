import { apiSlice } from "../../app/api/apiSlice";

// getting, creating, deleting Discount Codes
 export const discountApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Discount'],
    endpoints: builder => ( {
        getDiscount: builder.query({
            query: (code) => ({
                url: `/discount?discount_code=${code}`,
                providesTags: ['Discount']
            })
        }),
    })
 })


 export const {
    useGetDiscountQuery,
 } = discountApiSlice