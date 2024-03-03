import { apiSlice } from "../../../services/apiSlice";


export const roomRegApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        addRoom:builder.mutation({
            query:formData=>({
                url:`/room/add-room/${formData.get(formData.get('hotel_id'))}`,
                method:'POST',
                body:formData,
                formData:true
            })
        })
    })
})


export const {useAddRoomMutation}=roomRegApiSlice;