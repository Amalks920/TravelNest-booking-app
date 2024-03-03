import { apiSlice } from "../../../services/apiSlice";



export const hotelRegApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        registerHotel: builder.mutation({
            query:credentials=>({
                url:'/hotel/add-hotel',
                method:'POST',
                body:credentials,
                formData:true
            }),

            
        })
    })
})


export const {useRegisterHotelMutation}=hotelRegApiSlice;