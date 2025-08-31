import { apiSlice } from "../../app/api/apiSlice";

//This get the list of products
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