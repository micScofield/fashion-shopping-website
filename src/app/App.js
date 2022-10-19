import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'routes/home/Home';
import Navigation from 'routes/navigation/Navigation';
import Authentication from 'routes/authentication/Authentication';
import Shop from 'routes/shop/Shop';
import Checkout from 'routes/checkout/Checkout';
import Category from 'routes/category/Category';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'common/utils/firebase/firebase.utils';
import { setCurrentUser } from 'app/store/user.slice';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from 'app/store/api/product.api';
import { setProducts } from 'app/store/product.slice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser({
        accessToken: user ? user.accessToken : null,
        id: user ? user.uid : null
      }));
    });

    return unsubscribe;
  }, []);

  // fetching products here so that both Shop and Category screens can make use of it using redux

  const {
    data: products
  } = useGetProductsQuery();

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
