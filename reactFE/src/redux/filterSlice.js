import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceMin: 0,
  priceMax: 200,
  departureTimeMin: 0,
  departureTimeMax: 23,
  rate: 0,
  airline: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
    setPriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    setDepartureTimeMin: (state, action) => {
      state.departureTimeMin = action.payload;
    },
    setDepartureTimeMax: (state, action) => {
      state.departureTimeMax = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setAirline: (state, action) => {
      state.airline = action.payload;
    },
  },
});

export const {
  setPriceMin,
  setPriceMax,
  setDepartureTimeMin,
  setDepartureTimeMax,
  setRate,
  setAirline,
} = filterSlice.actions;

export default filterSlice.reducer;
