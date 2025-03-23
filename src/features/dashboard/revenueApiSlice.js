import { apiSlice } from "../../app/api/apiSlice";

const revenueApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ( {
        getRevenue:  builder.query({
            query: (optionId) => `/accounting/revenue?option=${optionId}`,
            // transformResponse: responseData => {
            //     conso
            //     // let min = 1;
            //     // const loadedPosts = responseData.map(post => {
            //     //     if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
            //     //     if (!post?.reactions) post.reactions = {
            //     //         thumbsUp: 0,
            //     //         wow: 0,
            //     //         heart: 0,
            //     //         rocket: 0,
            //     //         coffee: 0
            //     //     }
            //     //     return post;
            //     // });
            //     // return postsAdapter.setAll(initialState, loadedPosts)
            // },
            // providesTags: (result, error, arg) => [
            //     ...result?.map(id => ({ type: 'Post', id }))
            // ]
        })
    })
 })

 export const { useGetRevenueQuery } = revenueApiSlice

 export default revenueApiSlice