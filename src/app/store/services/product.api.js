import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCategoriesAndDocuments } from 'common/utils/firebase/firebase.utils';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn() {
        try {
          console.log(`API request made to fetch products...`)
          const products = await getCategoriesAndDocuments();
          return { data: products };
        } catch (err) {
          console.error({ err });
        }
      },
      providesTags: ['Product'],
      keepUnusedDataFor: 86400 // 1 day
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

/*
Note on automated refetching-
Tags: Slice identifier
Provide tags: Used in query endpoints
Invalidate tags: Used in mutation endpoints: EX. Whenever mutation endpoint is hit, all the query endpoints which mention this tag type make a refetch call automatically
*/
