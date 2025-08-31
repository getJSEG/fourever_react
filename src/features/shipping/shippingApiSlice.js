import { apiSlice } from "../../app/api/apiSlice";

const ShippingApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Shipping', 'Package'],
    endpoints: builder => ( {
        createParcel: builder.mutation({
            query: (data) => ({ 
                url: `/shipping/parcel`,
                method: 'POST',
                body: { ...data  }
            }),
            invalidatesTags: ['Shipping','Package']
        }),
        updateParcel: builder.mutation({
            query: ({id, data}) => ({
                url:`/shipping/parcel?id=${id}`,
                method:'PATCH',
                body: { ...data }
            }),
            invalidatesTags:['Package']
        }),
        deleteParcel: builder.mutation({
            query: ({id, orderId, lineItem}) => ({
                url:`/shipping/parcel?package=${id}&order=${orderId||''}&item=${lineItem||''}`,
                method:'DELETE'
            }),
            invalidatesTags:['Package']
        }),
        getParcelPackage: builder.query({
            query: (id) => ({
                url: `/shipping/parcel?id=${id}`,
            }),
            providesTags: ['Package']
        }),


        // CustomShipping
        createPersonalizePackage: builder.mutation({
            query: (data) => ({ 
                url: `/shipping/regular`,
                method: 'POST',
                body: { ...data  }
            }),
            invalidatesTags: ['Shipping', 'Package']
        }),
        updatePersonalizePackage: builder.mutation({
            query: ({id, data}) => ({
                url: `/shipping/regular?id=${id}`,
                method:'PATCH',
                body: { ...data }
            }),
            invalidatesTags: ['Package']
        }),
        deletePersonalizePackage: builder.mutation({
            query: ({id, orderId, lineItem}) => ({
                url: `/shipping/regular?package=${id}&order=${orderId ||''}&item=${lineItem||''}`,
                method:'DELETE'
            }),
            invalidatesTags: ['Package']
        }),
        getPersonalizePackage: builder.query({
            query: (id) => ({
                url: `/shipping/regular?id=${id}`,
            }),
            providesTags: ['Package']
        }),

        // Get mutiple Packages
        getAllPackages: builder.query({
            query: () => ({
                url: `shipping/tracker`,
            }),
            providesTags: ['Package']
        }),
        getRecentlyCreated: builder.query({
            query: () => ({
                url: `packages/recently-created`,
            }),
            providesTags: ['Package']
        }),
    })
});




export const {
    useCreateParcelMutation,
    useUpdateParcelMutation,
    useDeleteParcelMutation,
    useGetParcelPackageQuery,

    useCreatePersonalizePackageMutation,
    useUpdatePersonalizePackageMutation,
    useDeletePersonalizePackageMutation,
    useGetPersonalizePackageQuery,

    useGetAllPackagesQuery,
    useGetRecentlyCreatedQuery
} = ShippingApiSlice


export default ShippingApiSlice