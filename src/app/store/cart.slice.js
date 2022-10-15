import { createSlice } from '@reduxjs/toolkit';

let addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

let removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

let clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addCartItem(state.cartItems, action.payload)
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload)
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload
    }
  },
});

export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectCartTotal = (state) => state.cart.cartTotal;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectCartItems = (state) => state.cart.cartItems;

export const { addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen, setCartTotal, setCartCount } =
  cartSlice.actions;
export default cartSlice.reducer;
