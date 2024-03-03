import { apiSlice } from "../../../services/apiSlice";


const paymentApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        payment:builder.mutation({
            query:(data)=>({
                url: `/payment/payment`,
                method: "POST",
                body: data,       
            })
        }),
        getWalletAmount:builder.query({
            query:(data)=>`/wallet/wallet-amount/${data.user_id}`
        })
    })
})


export const {usePaymentMutation,useGetWalletAmountQuery}=paymentApiSlice

