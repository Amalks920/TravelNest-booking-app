import { apiSlice } from "../../../services/apiSlice";


const verifyOtpApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        verifyOtp:builder.mutation({
            query:data=>({
                url:'/auth/verify-otp',
                method:'POST',
                body:data
            })
        })
    })
})



export const {useVerifyOtpMutation}=verifyOtpApiSlice;