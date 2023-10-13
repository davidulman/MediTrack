import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { MedicalHistoryQuery } from '../types/redux/MedicalHistoryQuery';

interface update {
  id: string;
  body: MedicalHistoryQuery;
}

export const medicalHistoryApi = createApi({
  reducerPath: 'MedicalHistory',
  baseQuery: customFetchBase,
  tagTypes: ['medicalHistory'],
  endpoints: (builder) => ({
    getMedicalHistory: builder.query<MedicalHistoryQuery[], void>({
      query: () => '/medical-history',
      serializeQueryArgs: (profile) => profile,
      providesTags: ['medicalHistory'],
    }),

    getMedicalHistoryById: builder.query<MedicalHistoryQuery, string>({
      query: (id) => `/medical-history/${id}`,
      providesTags: ['medicalHistory'],
    }),

    addMedicalHistory: builder.mutation<MedicalHistoryQuery, void>({
      query: (body) => ({
        url: '/medical-history',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['medicalHistory'],
    }),
    updateMedicalHistory: builder.mutation<MedicalHistoryQuery, update>({
      query: ({ id, body }) => ({
        url: `/medical-history/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['medicalHistory'],
    }),
    deleteMedicalHistory: builder.mutation({
      query: (id) => ({
        url: `/medical-history/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['medicalHistory'],
    }),
  }),
});

export const {
  useGetMedicalHistoryQuery,
  useGetMedicalHistoryByIdQuery,
  useAddMedicalHistoryMutation,
  useUpdateMedicalHistoryMutation,
  useDeleteMedicalHistoryMutation,
} = medicalHistoryApi;
