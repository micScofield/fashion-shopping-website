import { combineReducers } from "@reduxjs/toolkit"
import { productApi } from "app/store/services/product.api"
import CartReducer from "app/store/slices/cart.slice"
import ProductReducer from "app/store/slices/product.slice"
import UserReducer from "app/store/slices/user.slice"
import AlertReducer from "app/store/slices/alert.slice"
import { userApi } from "app/store/services/user.api"

export const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer,
    alert: AlertReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer
})