import { apiSlice } from "../../../services/apiSlice";


const getReviewsOfHotelApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getReviewsOfHotel:builder.query({
            query:(data)=>`/review/get-hotel-reviews-for-owner/${data.hotel_id}`
        })
    })
})

export const {useGetReviewsOfHotelQuery}=getReviewsOfHotelApiSlice;