import { selectCartTotal } from 'app/store/slices/cart.slice'
import { selectUser } from 'app/store/slices/user.slice'
import Button from 'common/components/button/Button'

const {
	CardElement,
	useStripe,
	useElements,
} = require('@stripe/react-stripe-js')

import 'features/payment/PaymentForm.styles.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()

	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
	const amount = useSelector(selectCartTotal)
	const currentUser = useSelector(selectUser)

	const paymentHandler = async (e) => {
		e.preventDefault()

        // enable loading and disable button
        setIsPaymentProcessing(true)

		if (!stripe || !elements) return

		// create a payment intent
		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json())

		// PS. what user enters is considered as cents, hence converting above

		console.log(response)

		const clientSecret = response.paymentIntent.client_secret

		console.log(clientSecret)

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		})
		// any element can only exist once. Stripe knows these elements and we should be using them.

		if (paymentResult.error) {
			alert(paymentResult.error)
			console.log(paymentResult.error)
            setIsPaymentProcessing(false)
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment Succeeded')
			}
            setIsPaymentProcessing(false)
		}
	}

	return (
		<div className='payment-form-container'>
			<form className='payment-container' onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<Button text='Pay Now' type='submit' isLoading={isPaymentProcessing} disabled={isPaymentProcessing} onClick={paymentHandler} />
			</form>
		</div>
	)
}

export default PaymentForm
