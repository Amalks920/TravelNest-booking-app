// import { apiSlice } from "./apiSlice"


// export const checkIfBlockedOrNotApiSlice=apiSlice.injectEndpoints({
//     endpoints:builder=>({
//         chekckBlockedOrNot:builder.query({
//             query:(data)=>{
//                 console.log(data.user_id)
//                return  `/user/check-blocked-or-not/${data?.user_id}`
//             },
//             transformResponse:(response)=>response.response
//         })
        
//     })
// })


// export const {useChekckBlockedOrNotQuery}=checkIfBlockedOrNotApiSlice;