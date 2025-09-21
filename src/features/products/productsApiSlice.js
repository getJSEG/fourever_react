import { apiSlice } from "../../app/api/apiSlice";

//This get the list of products
const productsApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Products'],
    endpoints: builder => ( {
        getProduct: builder.query({
            query: (productId) => `/product?product=${productId}`,
            providesTags: ['Product']
        }),
        getProducts: builder.query({
            query: ({page, searchQuery}) => `/product/search?page=${page}&name=${searchQuery}`,
            providesTags: ['Products']
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
        }),
        updateProduct: builder.mutation({
            query: ({id, data}) => ({ 
                url: `/product?product=${id}`,
                method: 'PATCH',
                body: {
                    ...data
                }
            }),
            invalidatesTags: ['Products', 'Product']
        }),
        deleteProduct: builder.mutation({
            query: ({id}) => ({
                url: `/product/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']

        }),
    })
 })

export const { 
    useGetProductQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice

 export default productsApiSlice