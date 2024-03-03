import { apiSlice } from "../../../services/apiSlice"

export const roomsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getRooms:builder.query({
            query:(data)=>{
                console.log(data.hotel_id)
               return  `/room/get-rooms-list/${data?.hotel_id}`
            },
            transformErrorResponse:(response)=>response.response
        })
        
    })
})


export const {useGetRoomsQuery}=roomsApiSlice