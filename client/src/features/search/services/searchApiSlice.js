import { apiSlice } from "../../../services/apiSlice";

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchByLocation: builder.mutation({
      query: (data) =>{
        console.log(data)

      return {
      url: `/search?location=${data.location}&checkIn=${data.checkIn}&checkout=${data.checkOut}&roomType=${data.roomType}&priceMin=${data?.priceRange?.min?data?.priceRange?.min:''}&priceMax=${data?.priceRange?.max?data?.priceRange?.max:''}`,
      }
      }
    }),
  }),
});

export const { useSearchByLocationMutation } = searchApiSlice;
