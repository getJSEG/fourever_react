import { apiSlice } from "../../app/api/apiSlice";

// getting low Sotck Levels
 export const stockLevelApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Lowstock'],
    endpoints: builder => ( {
        getStockLevel: builder.query({
            query: () => '/product/stock-level',
            providesTags: ['Lowstock']
        })
    })
 })

 // Get low Invetory '/product/stock-level'
// Get Transaction History '/accounting/transaction-history'
 export const { useGetStockLevelQuery } = stockLevelApiSlice

