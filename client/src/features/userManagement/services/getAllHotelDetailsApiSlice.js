import { apiSlice } from "../../../services/apiSlice"




export const getAllHotelDetailsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllHotelDetails:builder.query({
            query:(data)=>`/hotel/get-all-hotel-details/${data._id}`,
            providesTags: ['Hotels'],
        })
    })
})


export const {useGetAllHotelDetailsQuery}=getAllHotelDetailsApiSlice;