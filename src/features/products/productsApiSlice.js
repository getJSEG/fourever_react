import { apiSlice } from "../../app/api/apiSlice";

//This get the list of products
const productsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Products'],
    endpoints: builder => ( {
        getProducts: builder.query({
            query: ({page, searchQuery}) => `/product/search?page=${page}&name=${searchQuery}`,
            providesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: ({id}) => ({
                url: `/product/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']

        }),
        createProduct: builder.mutation({
            query: (data) => ({ 
                url: `/product`,
                method: 'POST',
                body: {
                    ...data
                }
            }),
            invalidatesTags: ['Products']
        })
    })
 })

 export const  { 
    useGetProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
} = productsApiSlice

 export default productsApiSlice