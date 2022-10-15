import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'app/App';
// import { UserProvider } from 'contexts/user.context';
// import { ProductProvider } from 'contexts/product.context';
import { CartProvider } from 'contexts/cart.context';
import { store } from 'app/store/store'
import 'index.scss';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <ProductProvider> */}
            <CartProvider>
              <App />
            </CartProvider>
          {/* </ProductProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
