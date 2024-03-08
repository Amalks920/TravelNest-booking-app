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
            query:(data)=>`/room/get-all-rooms-by-location/${data.hotelName}`
        }),
        getHotelsByLocationHome:builder.mutation({
            query:(data)=>({
                url:`/hotel/get-hotel-by-location-home/${data?.location}`,
                method:'get'
            })
        }),
        getHotelRoomByHotelName:builder.mutation({
            query:(data)=>`/search/search-by-hotel?search=${data.location || null}&checkIn=${data.checkIn || null}
            &checkOut=${data.checkOut || null}&roomType=${data.roomType || null}&min=${data?.priceRange?.min || null}
            &max=${data?.priceRange?.max || null}&aminities=${data.aminities || null}&hotelName=${data?.hotelName}`
        })
 
    })
})



export const {useGetAllHotelQuery,
    useGetAllRoomsInHotelMutation,
    useGetAllHotelLocationQuery,
    useGetAllRoomsLocationMutation,
    useGetAllRoomsByLocaitonQuery,
    useFilterAllRoomsByLocationQuery,
    useGetHotelsByLocationHomeMutation,
    useGetHotelRoomByHotelNameMutation
}=getAllHotelsApiSlice