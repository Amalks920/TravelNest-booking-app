import { apiSlice } from "../../../services/apiSlice";



const getAHotelForUserApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
       getAHotelForUser:builder.query({
        query:(data)=>`/hotel/get-a-hotel-user/${data.hotel_id}/${data.room_id}`
       }),
       getARoomForUser:builder.query({
        query:(data)=>{
        return `/room/get-a-room/${data?.room_id}?checkIn=${data.checkIn}&checkOut=${data.checkOut}`
        }
       })
    })
})



export const {useGetAHotelForUserQuery,useGetARoomForUserQuery}=getAHotelForUserApiSlice;