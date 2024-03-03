import { apiSlice } from "../../../services/apiSlice";



const changeHotelStatusApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        changeHotelStatus:builder.mutation({
            query:(data)=>({
                url:`/hotel/change-hotel-status/${data.hotel_id}/${data.status}`,
                method:'PUT'
            }),
            invalidatesTags:['Hotels']
        })
    })
})

export const {useChangeHotelStatusMutation}=changeHotelStatusApiSlice;