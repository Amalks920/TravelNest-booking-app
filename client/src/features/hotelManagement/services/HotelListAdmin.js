import { apiSlice } from "../../../services/apiSlice"

export const hotelsAdminApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getHotelsForAdmin:builder.query({
            query:(data)=>`/hotel/get-all-hotels-admin/${data.pageNumber}`,
             providesTags:['Hotels']
        }),
        getHotelsForAdminLength:builder.query({
            query:(data)=>`/hotel/get-all-hotels-admin-length`
        })
        
    })
})


export const {useGetHotelsForAdminQuery,useGetHotelsForAdminLengthQuery}=hotelsAdminApiSlice