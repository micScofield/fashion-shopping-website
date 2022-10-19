import { createSlice, createSelector } from '@reduxjs/toolkit';

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
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
});

// Cart Dropdown
export const selectIsCartOpen = (state) => state.cart?.isCartOpen;

// Cart total for checkout
export const selectCartTotal = (state) =>
  state.cart?.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

// Cart items selector
export const selectCartItems = (state) => state.cart?.cartItems;

// Example: Memoizing cart count to prevent expensive calculations
const selectoCartCountForSelector = (state) => state.cart?.cartItems;
export const selectCartCount = createSelector(
  selectoCartCountForSelector,
  (items) => {
    console.log('cart count selector fired');
    return items.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }
);

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
  setCartTotal,
  setCartCount,
} = cartSlice.actions;
export default cartSlice.reducer;
