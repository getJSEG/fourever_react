import { apiSlice } from "../../app/api/apiSlice";

// Getting transactions
const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        getTransactions: builder.query({
            query: ({month, year}) => `/transaction-history?month=${month}&year=${year}`,
            keepUnusedDataFor: 10,
        })
    })
 });


 export const { useLazyGetTransactionsQuery } = transactionApiSlice

 export default transactionApiSlice;