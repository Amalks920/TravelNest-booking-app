import { apiSlice } from "../../../services/apiSlice";

const editHotelDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editHotelDetails: builder.mutation({
      query: (data) => ({
        url: `/hotel/edit-hotel-details/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["single-hotel-owner"],
    }),

    editHotelLocation: builder.mutation({
      query: (data) => ({
        url: `/hotel/edit-hotel-location/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["single-hotel-owner"],
    }),

    editHotelDescription: builder.mutation({
      query: (data) => ({
        url: `/hotel/edit-hotel-description/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["single-hotel-owner"],
    }),

    removeHotelImage: builder.mutation({
      query: (data) => ({
        url: `/hotel/delete-image/${data.hotel_id}/${data.imageToBeRemoved}`,
        method: "DELETE",
      }),
      invalidatesTags: ["single-hotel-owner"],
    }),

    addImages: builder.mutation({
      query: (data) => ({
        url:`/hotel/add-images`,
        method:'PUT',
        body:data
      }),
      invalidatesTags: ["single-hotel-owner"],
    })
  }),

});

export const {
  useEditHotelDetailsMutation,
  useEditHotelLocationMutation,
  useEditHotelDescriptionMutation,
  useRemoveHotelImageMutation,
  useAddImagesMutation
} = editHotelDetailsApiSlice;
