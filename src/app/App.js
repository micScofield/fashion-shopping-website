import { Fragment, useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from 'app/store/slices/user.slice';
// import { selectProducts, setProducts } from './store/slices/product.slice';
// import { useGetProductsQuery } from './store/services/product.api';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'common/utils/firebase/firebase.utils';
import DarkSpinner from 'common/components/spinner/dark/DarkSpinner';

import Home from 'routes/home/Home';
import Navigation from 'routes/navigation/Navigation';
import NoInternetWrapper from 'common/components/no-internet-wrapper/NoInternet';
import NullSpacer from 'common/components/null-spacer/NullSpacer';

const Authentication = lazy(() =>
  import('routes/authentication/Authentication')
);
const Checkout = lazy(() => import('routes/checkout/Checkout'));
const Test = lazy(() => import('routes/test/Test'));
const Shop = lazy(() => import('routes/shop/Shop'));
const Category = lazy(() => import('routes/category/Category'));

const App = () => {
  const dispatch = useDispatch();

  // Auth implementation: Using firebase observables
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user)
      dispatch(
        setCurrentUser({
          accessToken: user ? user.accessToken : null,
          id: user ? user.uid : null,
          displayName: user.displayName
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
      <NullSpacer />
      <Navigation />
      {/* <div style={{ position: 'relative', top: '4rem' }}> */}
      <div>
        <Suspense fallback={<DarkSpinner />}>
          <Routes>
            <Route path='/auth' element={<Authentication />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:category' element={<Category />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/test' element={<Test />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Fragment>
  );
};

export default App;
