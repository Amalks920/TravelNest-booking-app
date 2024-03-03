import { apiSlice } from "../../../services/apiSlice";



export const verifyEmailSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        verifyEmail: builder.mutation({
            query:credentials=>({
                url:'/auth/verify-email',
                method:'POST',
                body:{...credentials}
            }),
            invalidatesTags:['auth']
        }),
        verifyEmailSignup: builder.mutation({
            query:credentials=>({
                url:'/auth/verify-email-signup',
                method:'POST',
                body:{...credentials}
            }),
            invalidatesTags:['auth']
        }),
    })
})


export const {useVerifyEmailMutation,useVerifyEmailSignupMutation}=verifyEmailSlice;