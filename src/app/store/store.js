import { applyMiddleware, configureStore, compose } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from 'app/store/root-reducer';
import logger from 'redux-logger';
import { middlewares } from 'app/store/middlewares';
/*
const customLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log({ type: action.type, payload: action.payload });
  console.log({ currentState: store.getState() });

  next(action);

  console.log({ currentState: store.getState() });
};
*/

// const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(
//   Boolean
// );

// const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
