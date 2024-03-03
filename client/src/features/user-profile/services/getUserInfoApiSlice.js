import { apiSlice } from "../../../services/apiSlice";

const getUserInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfoForUser: builder.query({
      query: (data) => `/user/get-user-details-for-user/${data.user_id}`,
      providesTags:['user']
    }),
    getWalletDetails: builder.query({
      query: (data) => `/user/get-wallet-details/${data.user_id}`,
    }),
    getWalletHistory: builder.query({
      query: (data) =>
        `/wallet/get-wallet-history/${data.wallet_id}/${data.pageNumber}`,
    }),
    getWalletHistoryLength: builder.query({
      query: (data) => `/wallet/get-wallet-history-length/${data.wallet_id}`,
    }),
    editUserName:builder.mutation({
      query:(data)=>({
        url: `/user/edit-user-name-user/${data.user_id}`,
        method:'post',
        body:data
        }),
        invalidatesTags:['user']
    }),
    verifyEmailSignup:builder.mutation({
      query:(data)=>({
        url:'/auth/verify-email-signup',
        method:'post',
        body:data
      })
    }),
    verifyOtp:builder.mutation({
      query:(data)=>({
        url:`/auth/verify-otp`
      })
    }),
    changeEmail:builder.mutation({
      query:(data)=>({
        url:`/user/change-email`,
        method:'post',
        body:data
      })
    }),

  }),
});

export const {
  useGetUserInfoForUserQuery,
  useGetWalletDetailsQuery,
  useGetWalletHistoryQuery,
  useGetWalletHistoryLengthQuery,
  useEditUserNameMutation,useVerifyEmailSignupMutation,
  useVerifyOtpMutation,useChangeEmailMutation
} = getUserInfoApiSlice;
