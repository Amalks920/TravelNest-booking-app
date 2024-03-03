import { apiSlice } from "../../../services/apiSlice";


export const getAllUsersApiSlice=apiSlice.injectEndpoints({
        endpoints:builder=>({
            getAllUser:builder.query({
                query:(data)=> `/user/get-all-users?pageNumber=${data.pageNumber}`,
                providesTags: ['Users'],
               transformResponse:(response,meta,args)=>response.response 
            }),
            getAllUsersLength:builder.query({
                query:()=>`/user/get-all-users-length`
            })
        })
})


export const {useGetAllUserQuery,useGetAllUsersLengthQuery}=getAllUsersApiSlice;



