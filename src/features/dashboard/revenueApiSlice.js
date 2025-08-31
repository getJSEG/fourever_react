import { apiSlice } from "../../app/api/apiSlice";

const revenueApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        getRevenue:  builder.query({
            query: (optionId) => `/accounting/revenue`,

        })
    })
 })

 export const { useGetRevenueQuery } = revenueApiSlice

 export default revenueApiSlice