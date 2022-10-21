import { userApi } from "./services/user.api"

const { productApi } = require("app/store/services/product.api")

export const middlewares = (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'userApi/executeMutation/fulfilled'], // Ignore these action types
    // ignoredActionPaths: ['meta.arg', 'payload.timestamp'], // Ignore these field paths in all actions
    // ignoredPaths: ['items.dates'], // Ignore these paths in the state
  },
}).concat([productApi.middleware, userApi.middleware])