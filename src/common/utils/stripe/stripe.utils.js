import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

// export const stripePromise = loadStripe(
// 	'pk_test_51J2wBOSJifs6EgWZNd4usKpUD3r0V6pIAtBOEiOirCYQmuAAUWQOLsyBcPk8kGdiIXOslolRTLeWbGdP9IHY6vrv00Khkpb7O2'
// )
