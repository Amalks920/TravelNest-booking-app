import { apiSlice } from "../../../services/apiSlice";





const checkAvailabilityApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        checkAvailabilityOfRoom:builder.mutation({
            query:(data)=>({
                url:`/room/check-availability-of-room/${data?.room_id}?checkIn=${data.checkIn}&checkOut=${data.checkOut}`,
                method:'get'
            })
        })
    })
})


export const {useCheckAvailabilityOfRoomMutation}=checkAvailabilityApiSlice;