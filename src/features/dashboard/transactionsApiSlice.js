import { apiSlice } from "../../app/api/apiSlice";

// Getting transactions
const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        getTransactions: builder.query({
            query: () => '/accounting/transaction-history',
            keepUnusedDataFor: 10,
        })
    })
 });


 export const { useGetTransactionsQuery } = transactionApiSlice

 export default transactionApiSlice;