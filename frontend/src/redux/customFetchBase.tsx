/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { baseUrl } from '../components/global/config/config';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include',
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let res = await baseQuery(args, api, extraOptions);
  if ((res.error?.data as any)?.message === 'Unauthorized') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refresh = await baseQuery(
          { url: '/auth/refresh', method: 'GET', credentials: 'include' },
          api,
          extraOptions
        );
        if (refresh.data) {
          res = await baseQuery(args, api, extraOptions);
        } else {
          window.location.href = '/login';
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      res = await baseQuery(args, api, extraOptions);
    }
  }
  return res;
};

export default customFetchBase;
