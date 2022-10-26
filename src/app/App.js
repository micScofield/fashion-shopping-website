import { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { setCurrentUser } from 'app/store/slices/user.slice';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'common/utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import Authentication from 'routes/authentication/Authentication';
import Category from 'routes/category/Category';
import Checkout from 'routes/checkout/Checkout';
import Home from 'routes/home/Home';
import Test from 'routes/test/Test';
import Navigation from 'routes/navigation/Navigation';
import Shop from 'routes/shop/Shop';
import { selectProducts, setProducts } from './store/slices/product.slice';
import { useGetProductsQuery } from './store/services/product.api';

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

  // Commenting this out as I want to make separate API calls in both Shop and Category component. Currently, endpoints are same but ideally we should limit the data in one screen and show all in other
  /*
  // fetching products here so that both Shop and Category screens can make use of it using redux
  const { data: products } = useGetProductsQuery();

  products && dispatch(setProducts(products));
  */

  return (
    <Fragment>
      <Navigation />
      {/* Pushing rest of the content down to accommodate navigation bar */}
      <div style={{ position: 'relative', top: '4rem' }}>
        <Routes>
          <Route path='/auth' element={<Authentication />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:category' element={<Category />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/test' element={<Test />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
