import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logout,
} from "../features/authentication/services/loginSlice";
import { BASE_URL } from "../data/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().persistedSlice.auth.user.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }else if(result?.error?.originalStatus === 402){
    console.log(result?.error)
    api.dispatch(logout())
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users','Hotels','single-hotel-owner',
  'get-rooms-of-hotel','single-booking-details',
  'messages','user','coupons','conversations'],
  endpoints: (builder) => ({}),
  //provideTags:['user','verifyEmail']
});
