import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLogin } = loginSlice.actions; // export action cho component

export default loginSlice.reducer; // export reducer cho store
