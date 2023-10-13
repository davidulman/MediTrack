import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const registerApi = createApi({
  reducerPath: 'Register',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
