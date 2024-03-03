import { apiSlice } from "../../../services/apiSlice";



export const RemoveImageApiSlice=apiSlice.injectEndpoints({
        endpoints:builder=>({
            removeHotelImage:builder.mutation({
                query:data=>({
                    url:`/hotel/delete-image/${data.hotel_id}/${data.imageToBeRemoved}`,
                    method:'DELETE'
                }),
                invalidatesTags: ['Hotels'],
            })
        })
})


export const {useRemoveHotelImageMutation}=RemoveImageApiSlice;


