import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from 'app/App';
// import { UserProvider } from 'contexts/user.context';
// import { ProductProvider } from 'contexts/product.context';
// import { CartProvider } from 'contexts/cart.context';
import { store, persistor } from 'app/store/store';

import 'index.scss';
import NoInternetWrapper from 'common/components/no-internet-wrapper/NoInternet';
import { InternetConnectionStatusProvider } from 'contexts/internetConnectivity.context';

const root = createRoot(document.getElementById('root'));
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
            <App />
          </InternetConnectionStatusProvider>
          {/* </CartProvider> */}
          {/* </ProductProvider> */}
          {/* </UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
