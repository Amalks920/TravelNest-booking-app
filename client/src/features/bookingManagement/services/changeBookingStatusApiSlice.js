import { apiSlice } from "../../../services/apiSlice";


const   changeBookingStatusApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        changeBookingStatus:builder.mutation({
            query:(data)=>({
                url:`/booking/change-status/${data.booking_id}`,
                method:'POST',
                body:data
            })

        })
    })
})


export const {useChangeBookingStatusMutation}=changeBookingStatusApiSlice;