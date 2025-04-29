// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';  // <-- Apna cart slice yaha import karo

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
