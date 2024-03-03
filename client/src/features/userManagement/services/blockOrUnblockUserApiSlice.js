import { apiSlice } from "../../../services/apiSlice";


const blockOrUnblockUserApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        blockOrUnblockUser:builder.mutation({
            query:data=>({
               url:`/user/block-or-unblock-user/${data.user_id}`,
               method:'PUT',
               body:data
            }),
            invalidatesTags: ['Users'],
           //transformResponse:(response,meta,args)=>response.response 
         
        })
    })
})



export const {useBlockOrUnblockUserMutation}=blockOrUnblockUserApiSlice;