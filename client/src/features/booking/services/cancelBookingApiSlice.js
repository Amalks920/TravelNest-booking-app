import { apiSlice } from "../../../services/apiSlice"




const cancelBookingApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        cancelBooking:builder.mutation({
            query:(data)=>({
                url:`/booking/cancel-booking/${data.booking_id}`,
                method:'POST',
                body:{status:data.status,totalNoOfRooms:data.totalNoOfRooms,
                    user_id:data.user_id,amount:data.amount,
                    roomDetails:data.roomDetails
                }
            }),
            invalidatesTags:['single-booking-details']
        })
    })
})


export const {useCancelBookingMutation}=cancelBookingApiSlice;