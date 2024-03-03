import { apiSlice } from "../../../services/apiSlice";

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (data) =>
        `/search/?search=${data.location || null}&checkIn=${data.checkIn || null}&checkOut=${data.checkOut || null}&roomType=${data.roomType || null}&min=${data?.priceRange?.min || null}&max=${data?.priceRange?.max || null}&aminities=${data.aminities || null}`,
    }),
  }),
});



export const {useSearchMutation}=searchApiSlice;