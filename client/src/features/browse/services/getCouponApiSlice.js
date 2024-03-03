import { apiSlice } from "../../../services/apiSlice";


const getCouponApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAllCoupons:builder.query({
            query:()=>`/coupon/get-all-coupon-owner`
        }),
        getAllCouponsForUser:builder.query({
            query:()=>`/coupon/get-all-coupon-user`
        })
    })
})


export const {useGetAllCouponsQuery,useGetAllCouponsForUserQuery}=getCouponApiSlice;