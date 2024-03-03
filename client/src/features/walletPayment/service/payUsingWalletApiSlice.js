import { apiSlice } from "../../../services/apiSlice";


const payUsingWalletApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        payUsingWallet:builder.mutation({
            query:(data)=>({
                url:`/payment/payment-using-wallet`,
                method:'post',
                body:data
            })
        })
    })
})



export const {usePayUsingWalletMutation}=payUsingWalletApiSlice;