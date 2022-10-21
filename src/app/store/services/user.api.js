import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from 'common/utils/firebase/firebase.utils';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signInWithGoogle: builder.mutation({
      async queryFn() {
        try {
          console.log('signInWithGoogle: Making firebase utility calls');
          const { user } = await signInWithGooglePopup();
          await createUserDocumentFromAuth(user);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    signInWithEmailAndPassword: builder.mutation({
      async queryFn({ email, password }) {
        try {
          console.log('signInWithEmailAndPassword: Making firebase utility calls');
          await signInAuthUserWithEmailAndPassword(email, password);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useSignInWithGoogleMutation, useSignInWithEmailAndPasswordMutation } = userApi;
