
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find(
        (item) => item.name === plant.name
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const name =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload.name;

      state.items = state.items.filter(
        (item) => item.name !== name
      );
    },

    updateQuantity: (state, action) => {
      const { name } = action.payload;
      const item = state.items.find(
        (product) => product.name === name
      );

      const quantity =
        action.payload.quantity ?? action.payload.amount;

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (product) => product.name !== name
        );
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
