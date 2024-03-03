import { apiSlice } from "../../../services/apiSlice";

const editRoomDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editRoomDescription: builder.mutation({
      query: (data) => ({
        url: `/room/edit-room-description/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["get-rooms-of-hotel"],
    }),
    addRoomImages: builder.mutation({
      query: (data) => ({
        url: `/room/add-images/${data.get("room_id")}`,
        method: "PUT",
        body: data,
        FormData: true,
      }),
      invalidatesTags: ["get-rooms-of-hotel"],
    }),
    updateRoomNumber: builder.mutation({
      query: (data) => ({
        url: `/room/update-room-number/${data.room_id}`,
        method: "PUT",
        body: data,
        FormData: true,
      }),
      invalidatesTags: ["get-rooms-of-hotel"],
    }),
  }),
});

export const {
  useEditRoomDescriptionMutation,
  useAddRoomImagesMutation,
  useUpdateRoomNumberMutation,
} = editRoomDetailsApiSlice;
