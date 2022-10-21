import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useGetProductsQuery } from 'app/store/services/product.api';
import { setProducts } from 'app/store/slices/product.slice';
import { setCurrentUser } from 'app/store/slices/user.slice';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from 'common/utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import Authentication from 'routes/authentication/Authentication';
import Category from 'routes/category/Category';
import Checkout from 'routes/checkout/Checkout';
import Home from 'routes/home/Home';
import Navigation from 'routes/navigation/Navigation';
import Shop from 'routes/shop/Shop';

const App = () => {
  const dispatch = useDispatch();

  // Auth implementation: Using firebase observables
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(
        setCurrentUser({
          accessToken: user ? user.accessToken : null,
          id: user ? user.uid : null,
        })
      );
    });

    return unsubscribe;
  }, []);

  // fetching products here so that both Shop and Category screens can make use of it using redux

  const { data: products } = useGetProductsQuery();

  products && dispatch(setProducts(products));

  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path='/auth' element={<Authentication />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:category' element={<Category />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Fragment>
  );
};

export default App;
