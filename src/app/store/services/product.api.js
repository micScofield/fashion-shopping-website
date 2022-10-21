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
          const products = await getCategoriesAndDocuments();
          console.log(`API request made to fetch products: ${products}`)
          return { data: products };
        } catch (err) {
          console.error({ err });
        }
      },
      keepUnusedDataFor: 86400 // 1 day
      // invalidatesTags: [{type: 'Product'}]
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
