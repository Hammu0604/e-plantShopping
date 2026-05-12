import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // ADD ITEM TO CART
    addItem: (state, action) => {
      const { id, name, image, cost } = action.payload;

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // REMOVE ITEM FROM CART
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;