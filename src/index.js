import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'

import App from 'app/App'
// import { UserProvider } from 'contexts/user.context';
// import { ProductProvider } from 'contexts/product.context';
// import { CartProvider } from 'contexts/cart.context';
import { store, persistor } from 'app/store/store'
import { InternetConnectionStatusProvider } from 'contexts/internetConnectivity.context'
import { stripePromise } from 'common/utils/stripe/stripe.utils'

import 'index.scss'

const root = createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				loading={<div>Loading state from local storage...</div>}
				persistor={persistor}
			>
				<BrowserRouter>
					{/* <UserProvider> */}
					{/* <ProductProvider> */}
					{/* <CartProvider> */}
					<InternetConnectionStatusProvider>
						<Elements stripe={stripePromise}>
							<App />
						</Elements>
					</InternetConnectionStatusProvider>
					{/* </CartProvider> */}
					{/* </ProductProvider> */}
					{/* </UserProvider> */}
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
)
