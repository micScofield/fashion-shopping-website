import { selectCartTotal } from 'app/store/slices/cart.slice'
import { selectUser } from 'app/store/slices/user.slice'
import Button from 'common/components/button/Button'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

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

		const stripePaymentBody = {
			amount: amount * 100, // in centes
			name: currentUser?.displayName ? currentUser.displayName : 'Guest',
			description: 'Payment Remarks',
			address: {
				line1: '510 Townsend St',
				postal_code: '000000',
				city: 'San Francisco',
				state: 'CA',
				country: 'US',
			},
		}

		// create a payment intent
		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(stripePaymentBody),
		}).then((res) => res.json())

		const clientSecret = response.paymentIntent?.client_secret

		let paymentResult

		if (clientSecret) {
			paymentResult = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			// any element can only exist once. Stripe knows these elements and we should be using them.

			if (paymentResult.error) {
				alert(paymentResult.error)
				console.log(paymentResult.error)
			} else {
				if (paymentResult.paymentIntent.status === 'succeeded') {
					alert('Payment Succeeded')
				}
			}
		}

		setIsPaymentProcessing(false)
	}

	return (
		<div className='payment-form-container'>
			<form className='payment-container' onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<div className='mb-2'></div>
				<Button
					text='Pay Now'
					type='submit'
					isLoading={isPaymentProcessing}
					disabled={isPaymentProcessing}
					onClick={paymentHandler}
				/>
			</form>
		</div>
	)
}

export default PaymentForm
