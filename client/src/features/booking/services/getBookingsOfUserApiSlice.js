import { apiSlice } from "../../../services/apiSlice";



const getBookingsOfUserApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getBookingsOfUser:builder.query({
            query:(data)=>`/booking/get-bookings-of-user/${data.user_id}/${data.pageNumber}`
        }),
        getTotalPageNumberOfUserBooking:builder.query({
            query:(data)=>`/booking/get-bookings-of-user-length/${data.user_id}`
        }) 
    })
})


export const {useGetBookingsOfUserQuery,useGetTotalPageNumberOfUserBookingQuery}=getBookingsOfUserApiSlice;