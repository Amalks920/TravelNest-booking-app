import { apiSlice } from "../../../services/apiSlice";

const editHotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editHotel: builder.mutation({
      query: (data) => ({
        url: `/hotel/edit-hotel/${data.get("hotel_id")}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags:['Hotels']
    }),
  }),
});

export const { useEditHotelMutation } = editHotelApiSlice;
