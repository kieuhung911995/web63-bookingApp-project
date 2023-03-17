import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortItem: "Cheapest", //gia tri state khoi tao
};

export const sorterSlice = createSlice({
  name: "sorter",
  initialState,
  reducers: {
    setSortItem: (state, action) => {
      state.sortItem = action.payload; //setState nhu react hook
    },
  },
});

export const { setSortItem } = sorterSlice.actions; // export action cho component

export default sorterSlice.reducer; // export reducer cho store
