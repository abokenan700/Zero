import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CartLine} from '@/types/domain';

type CartState = {lines: CartLine[]; promoCode?: string};

const initialState: CartState = {lines: []};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const line = state.lines.find(item => item.productId === action.payload);
      if (line) line.quantity += 1;
      else state.lines.push({productId: action.payload, quantity: 1});
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const line = state.lines.find(item => item.productId === action.payload);
      if (!line) return;
      line.quantity -= 1;
      if (line.quantity <= 0) state.lines = state.lines.filter(item => item.productId !== action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter(item => item.productId !== action.payload);
    },
    applyPromo: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload.toUpperCase();
    },
    clearCart: state => {
      state.lines = [];
      state.promoCode = undefined;
    },
  },
});

export const {addToCart, decrementItem, removeItem, applyPromo, clearCart} = cartSlice.actions;
