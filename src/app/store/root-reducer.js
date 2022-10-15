import UserReducer from "app/store/user.slice"
import ProductReducer from "app/store/product.slice"
import CartReducer from "app/store/cart.slice"

export const rootReducer = {
    user: UserReducer,
    product: ProductReducer,
    cart: CartReducer
}