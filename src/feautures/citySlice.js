import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: [],
  cityUpdate: {},
  isDialogOpen: false,
  isDelete: false,
};
export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.city.unshift(action.payload);
    },
    updateCity: (state, action) => {
      const index = state.city.findIndex(
        (city) => city.id === action.payload.id
      );
      if (index !== -1) {
        state.city[index] = action.payload;
      }
    },
    deleteCity: (state) => {
      state.city = state.city.filter((city) => city.id !== state.cityUpdate.id);
    },
    setCities: (state, action) => {
      state.city = action.payload;
    },
    setcityUpdate: (state, action) => {
      state.cityUpdate = action.payload;
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
  addCity,
  setCities,
  setcityUpdate,
  toggleDialog,
  updateCity,
  toggleDelete,
  deleteCity,
} = citySlice.actions;

export default citySlice.reducer;
