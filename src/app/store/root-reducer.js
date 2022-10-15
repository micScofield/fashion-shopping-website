import UserReducer from "app/store/user.slice"
import ProductReducer from "app/store/product.slice"

export const rootReducer = {
    user: UserReducer,
    product: ProductReducer
}