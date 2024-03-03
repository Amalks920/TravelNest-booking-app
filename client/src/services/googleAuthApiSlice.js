import { apiSlice } from "./apiSlice";


const googleAuthApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        googleSignIn:builder.mutation({
            query:(data)=>({
                url:'/auth/google-signin',
                method:'post',
                body:data
            })
        })
    })
})


export const {useGoogleSignInMutation}=googleAuthApiSlice;