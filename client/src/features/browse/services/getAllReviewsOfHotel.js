import { apiSlice } from "../../../services/apiSlice";




const getAllReviewsHotel=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllReviews:builder.query({
            query:(data)=>`/review/get-review-of-hotel-user/${data.hotel_id}`
        })
    })
});


export const {useGetAllReviewsQuery}=getAllReviewsHotel;