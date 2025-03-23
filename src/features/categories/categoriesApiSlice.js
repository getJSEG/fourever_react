import { apiSlice } from "../../app/api/apiSlice";

//This get the list of products
// TODO: RENAME TO categories
const categoriesApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Categories'],
    endpoints: builder => ( {
        getCategories: builder.query({
            query: () => `/product/category`,
            providesTags: ['Categories']
        }),
    })
 })

 export const  { 
    useGetCategoriesQuery,
} = categoriesApiSlice

 export default categoriesApiSlice