import { apiSlice } from "../../app/api/apiSlice";

const variantApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Variants', 'Products', 'Product', 'Lowstock'],
    endpoints: builder => ( {
        createVariant: builder.mutation({
            query: (data) => ({ 
                url: `/product/varient`,
                method: 'POST',
                body: { ...data }
            }),
            invalidatesTags: ['Products', 'Variants', 'Product']
        }),
        updateVariant: builder.mutation({
            query: ({id, data}) => ({ 
                url: `/product/varient/update?variant=${id}`,
                method: 'PATCH',
                body: {
                    ...data
                }
            }),
            invalidatesTags: ['Variants', 'Products', 'Product', 'Lowstock']
        }),
        deleteVariant: builder.mutation({
            query: ({id}) => ({
                url: `/product/varient/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Variants', 'Product', 'Lowstock']
        })
    })
 })

 export const {
    useCreateVariantMutation,
    useUpdateVariantMutation,
    useDeleteVariantMutation,
 } = variantApiSlice

 export default variantApiSlice