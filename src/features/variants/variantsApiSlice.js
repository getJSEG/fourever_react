import { apiSlice } from "../../app/api/apiSlice";

const variantApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Variant'],
    endpoints: builder => ( {
        deleteVariant: builder.mutation({
            query: ({id}) => ({
                url: `/product/varient/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Variants']
        })
    })
 })

 export const {
    useDeleteVariantMutation,
 } = variantApiSlice

 export default variantApiSlice