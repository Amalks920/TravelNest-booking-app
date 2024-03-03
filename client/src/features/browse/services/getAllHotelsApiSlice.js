import { apiSlice } from "../../../services/apiSlice";


const getAllHotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllHotel:builder.query({
            query:()=> '/hotel/get-all-hotels-user',
             transformErrorResponse:(response)=>response.response
        }),
        getAllRoomsInHotel:builder.mutation({
            query:(data)=>({
                url:`/room/get-all-rooms-user/${data.hotel_id}`,
                method:'POST',
                body:data
            })
        }),
        getAllHotelLocation:builder.query({
            query:()=>`/room/get-all-rooms-by-location`
        }),
        getAllRoomsLocation:builder.mutation({
            query:(data)=>`/room/get-all-rooms-by-location`
        }),
        filterAllRoomsByLocation:builder.query({
            query:(data)=>`/room/get-all-rooms-by-location/${data.location}`
        })
 
    })
})



export const {useGetAllHotelQuery,
    useGetAllRoomsInHotelMutation,
    useGetAllHotelLocationQuery,
    useGetAllRoomsLocationMutation,
    useGetAllRoomsByLocaitonQuery,
    useFilterAllRoomsByLocationQuery
}=getAllHotelsApiSlice