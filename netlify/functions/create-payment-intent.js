require('dotenv').config()
const Stripe = require('stripe')

// consider this as a express function to understand better
exports.handler = async (e) => {
	const stripe = new Stripe(
		process.env.STRIPE_SECRET_KEY
	)

	try {
		console.log(e.body)
		const {
			amount,
			name,
			description,
			address: { line1, postal_code, city, state, country },
		} = JSON.parse(e.body)

		// send a payment intent to stripe
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'usd',
			payment_method_types: ['card'],
			description: description,
			shipping: {
				name,
				address: {
					line1,
					postal_code,
					city,
					state,
					country,
				},
			},
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
