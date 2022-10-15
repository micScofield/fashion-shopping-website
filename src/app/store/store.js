import { configureStore, createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from 'app/store/root-reducer';

const customLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log({ type: action.type, payload: action.payload });
  console.log({ currentState: store.getState() });

  next(action);

  console.log({ currentState: store.getState() });
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore these action types
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'], // Ignore these field paths in all actions
        // ignoredPaths: ['items.dates'], // Ignore these paths in the state
      },
    }),
});

export const persistor = persistStore(store);
