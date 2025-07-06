import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: [],
  countryUpdate: {},
  isDialogOpen: false,
  isDelete: false,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.country.unshift(action.payload);
    },
    updateCountry: (state, action) => {
      const index = state.country.findIndex(
        (country) => country.id === action.payload.id
      );
      console.log(index);
      if (index !== -1) {
        state.country[index] = action.payload;
      }
    },
    deleteCountry: (state) => {
      state.country = state.country.filter(
        (country) => country.id !== state.countryUpdate.id
      );
    },
    setCountries: (state, action) => {
      state.country = action.payload;
    },
    setCountryUpdate: (state, action) => {
      state.countryUpdate = action.payload;
    },
    toggleDialog: (state) => {
      state.isDialogOpen = !state.isDialogOpen;
    },
    toggleDelete: (state) => {
      state.isDelete = !state.isDelete;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCountry,
  setCountries,
  setCountryUpdate,
  toggleDialog,
  updateCountry,
  toggleDelete,
  deleteCountry,
} = countrySlice.actions;

export default countrySlice.reducer;
