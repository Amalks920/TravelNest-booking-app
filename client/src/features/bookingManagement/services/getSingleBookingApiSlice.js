import { apiSlice } from "../../../services/apiSlice";



const getSingleBookingForOwnerApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getSingleBookingForOwner:builder.query({
            query:(data)=>`/booking/get-a-booking-for-owner/${data.booking_id}`
        })
    })
})



export const {useGetSingleBookingForOwnerQuery} = getSingleBookingForOwnerApiSlice;