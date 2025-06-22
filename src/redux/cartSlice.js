import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    resetCart: (state) => {
      state.count = 0;
    }
  }
});

export const { increment, setCount, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
