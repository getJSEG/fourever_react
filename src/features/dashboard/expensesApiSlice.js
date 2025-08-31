import { apiSlice } from "../../app/api/apiSlice";

// This will get the All of the expeses of the store
const expensesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Expenses'],
    endpoints: builder => ( {
        getExpenses:  builder.query({
            query: () => `/accounting/expenses`,
        })
    })
 })

 export const { useGetExpensesQuery } = expensesApiSlice

 export default expensesApiSlice