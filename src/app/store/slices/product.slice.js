import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const selectProducts = (state) => state.product?.products;

// use selector if you are making expensive operations
/*
export const selectProducts = createSelector(
  selectProductsForSelector,
  (items) => {
    console.log('product selector fired');
    return items;
  }
);
*/

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
