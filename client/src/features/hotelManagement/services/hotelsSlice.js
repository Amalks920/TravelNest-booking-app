import { apiSlice } from "../../../services/apiSlice"

export const hotelsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHotels:builder.query({
            query:(data)=>`/hotel/get-all-hotels/${data.userId}?pageNumber=${data.pageNumber}`,
            providesTags:['Hotels']
        }),
        getHotelsLength:builder.query({
            query:(data)=>`/hotel/get-all-hotels-length/${data.userId}`
        })
        
    })
})


export const {useGetHotelsQuery,useGetHotelsLengthQuery}=hotelsApiSlice;