import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from 'store/root-reducer'

const customLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log({ type: action.type, payload: action.payload });
  console.log({ currentState: store.getState() });

  next(action);

  console.log({ currentState: store.getState() });
};

const middleWares = [customLoggerMiddleware];

export const store = configureStore({ reducer: rootReducer })
