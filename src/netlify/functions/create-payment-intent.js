require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// consider this as a express function to understand better
exports.handler = async (e) => {
	try {
		const { amount } = JSON.parse(e.body)

		// send a payment intent to stripe
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'usd',
			payment_method_types: ['card'],
		})

		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent }),
		}
	} catch (err) {
		console.log(err)

		return {
			statusCode: 400,
			body: JSON.stringify({ err }),
		}
	}
}
