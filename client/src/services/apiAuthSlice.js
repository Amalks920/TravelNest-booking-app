import { apiSlice } from "./apiSlice";


export const apiAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            // providesTags:['auth'],
        })
    })
})

export const { useLoginMutation ,} = apiAuthSlice;