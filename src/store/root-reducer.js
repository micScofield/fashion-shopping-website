import UserReducer from "store/user/user.slice"
import ProductReducer from "store/product/product.slice"

export const rootReducer = {
    user: UserReducer,
    product: ProductReducer
}