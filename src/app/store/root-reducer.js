import UserReducer from "app/store/user.slice"
import ProductReducer from "app/store/product.slice"
import CartReducer from "app/store/cart.slice"
import { combineReducers } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer
})