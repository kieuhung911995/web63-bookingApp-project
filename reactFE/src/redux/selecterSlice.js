import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityFromValue: "",
  cityToValue: "",
  tripValue: "",
  startDate: "",
  endDate: "",
  arrayDate: [],
  isSearch: false,
};

export const selecterSlice = createSlice({
  name: "selecter",
  initialState,
  reducers: {
    setCityFromValue: (state, action) => {
      state.cityFromValue = action.payload;
    },
    setCityToValue: (state, action) => {
      state.cityToValue = action.payload;
    },
    setTripValue: (state, action) => {
      state.tripValue = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setArrayDate: (state, action) => {
      state.arrayDate = action.payload;
    },
  },
});

export const {
  setCityFromValue,
  setCityToValue,
  setTripValue,
  setIsSearch,
  setStartDate,
  setEndDate,
  setArrayDate,
} = selecterSlice.actions;

export default selecterSlice.reducer;
