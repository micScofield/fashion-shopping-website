import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from 'common/utils/firebase/firebase.utils'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		signInWithGoogle: builder.mutation({
			async queryFn() {
				console.log('signInWithGoogle: Making firebase utility calls')
				const { user } = await signInWithGooglePopup()
				return await createUserDocumentFromAuth(user)
			},
		}),
		signInWithEmailAndPassword: builder.mutation({
			async queryFn({ email, password }) {
				console.log('signInWithEmailAndPassword: Making firebase utility calls')
				return await signInAuthUserWithEmailAndPassword(email, password)
			},
			// invalidatesTags: ['Product'], // The provide tag neeeds to be present in this slice to achieve this. Typically, for one base url, you should have only one slice. For ex. /posts/delete, posts/view should be on same and will be useful
		}),
		signUpWithEmailAndPassword: builder.mutation({
			async queryFn({ email, password, displayName }) {
				console.log(
					'signUpWithEmailAndPassword: Making firebase utility calls',
					email,
					password,
					displayName
				)
				const { user } = await createAuthUserWithEmailAndPassword(
					email,
					password
				)

				return await createUserDocumentFromAuth(user, { displayName })
			},
		}),
	}),
})

export const {
	useSignInWithGoogleMutation,
	useSignInWithEmailAndPasswordMutation,
	useSignUpWithEmailAndPasswordMutation,
} = userApi
