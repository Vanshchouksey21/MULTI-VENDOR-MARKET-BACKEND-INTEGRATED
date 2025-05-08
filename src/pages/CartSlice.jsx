import { createSlice } from '@reduxjs/toolkit';

const userId = localStorage.getItem("userId");

const initialCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialCart,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      saveCart(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCart(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) item.quantity++;
      saveCart(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    setCart: (state, action) => {
      state.items = action.payload;
      saveCart(action.payload);
    }
  }
});

const saveCart = (cart) => {
  const currentUserId = localStorage.getItem("userId");
  if (currentUserId) {
    localStorage.setItem(`cart_${currentUserId}`, JSON.stringify(cart));
  }
};

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
