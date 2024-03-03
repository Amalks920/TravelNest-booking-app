import { apiSlice } from '../../../services/apiSlice'

export const getAHotelApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAHotel:builder.query({
            query:(data)=>{
                console.log(data)
               return  `/hotel/get-a-hotel/${data}`
            }
        })
    })
})


export const {useGetAHotelQuery}=getAHotelApiSlice