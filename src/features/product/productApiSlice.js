import { apiSlice } from "../../app/api/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Product', 'Variants'],
    endpoints: builder => ( {
        getProduct: builder.query({
            query: (productId) => `/product?product=${productId}`,
            providesTags: ['Variants', 'Product']
        })
    })
 })

 export const {
    useGetProductQuery
 } = productApiSlice

 export default productApiSlice