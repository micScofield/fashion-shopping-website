import UserReducer from "app/store/user.slice"
import ProductReducer from "app/store/product.slice"
import CartReducer from "app/store/cart.slice"
import { combineReducers } from "@reduxjs/toolkit"
import { productApi } from "app/store/api/product.api"

export const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer,
    [productApi.reducerPath]: productApi.reducer
})