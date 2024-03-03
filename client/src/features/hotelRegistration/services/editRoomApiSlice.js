import { apiSlice } from "../../../services/apiSlice";

const editRoomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editRoom: builder.mutation({
      query: (data) => ({
        url: `/room/edit-room/${data.get("hotel_id")}/${data.get('room_id')}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const { useEditRoomMutation } = editRoomApiSlice;