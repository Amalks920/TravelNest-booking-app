import { apiSlice } from "../../../services/apiSlice";

const postReviewDetails=apiSlice.injectEndpoints({
    endpoints:builder=>({
        postReviewDetails:builder.mutation({
            query:(data)=>({
                url:`/review/add-review`,
                method:'post',
                body:data,
                formData:true   
            }),
            invalidatesTags:['single-booking-details']
        })
    })
});


export const {usePostReviewDetailsMutation}=postReviewDetails