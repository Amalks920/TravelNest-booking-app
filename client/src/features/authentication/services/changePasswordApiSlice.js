import { apiSlice } from "../../../services/apiSlice";


const changePasswordApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        changePassword: builder.mutation({
            query:credentials=>({
                url:'/auth/change-password',
                method:'POST',
                body:credentials
            }),
        })
    })
})


export const {useChangePasswordMutation}=changePasswordApiSlice;