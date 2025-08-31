import { apiSlice } from "../../app/api/apiSlice";

const SalesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        getSales:  builder.query({
            query: (optionId) => `/accounting/sales-by-category?option=${optionId}`,

        })
    })
 })

 export const { useGetSalesQuery } = SalesApiSlice

 export default SalesApiSlice