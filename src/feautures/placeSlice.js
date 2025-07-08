import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: [],
  placeUpdate: {},
  isDialogOpen: false,
  isDelete: false,
  isLockerDialogOpen: false,
  isLockerUpdateDialogOpen: false,
  isDeleteLocker: false,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      state.place.unshift(action.payload);
    },
    addLocker: (state, action) => {
      const index = state.place.findIndex(
        (place) => place.id === action.payload.placeId
      );
      if (index !== -1) {
        state.place[index].lockerTypes.push(action.payload);
      }
    },
    updateLocker: (state, action) => {
      const placeIndex = state.place.findIndex(
        (place) => place.id === action.payload.placeId
      );
      if (placeIndex !== -1) {
        const lockerIndex = state.place[placeIndex].lockerTypes.findIndex(
          (locker) => locker.id === action.payload.id
        );
        if (lockerIndex !== -1) {
          state.place[placeIndex].lockerTypes[lockerIndex] = action.payload;
        }
      }
    },
    deleteLocker: (state, action) => {
      const placeIndex = state.place.findIndex(
        (place) => place.id === action.payload.placeId
      );
      if (placeIndex !== -1) {
        state.place[placeIndex].lockerTypes = state.place[
          placeIndex
        ].lockerTypes.filter((locker) => locker.id !== action.payload.lockerId);
      }
    },
    updatePlace: (state, action) => {
      const index = state.place.findIndex(
        (place) => place.id === action.payload.id
      );
      if (index !== -1) {
        state.place[index] = action.payload;
      }
    },
    deletePlace: (state) => {
      state.place = state.place.filter(
        (place) => place.id !== state.placeUpdate.id
      );
    },
    setPlaces: (state, action) => {
      state.place = action.payload;
    },
    setPlaceUpdate: (state, action) => {
      state.placeUpdate = action.payload;
    },
    toggleDialog: (state) => {
      state.isDialogOpen = !state.isDialogOpen;
    },
    toggleDelete: (state) => {
      state.isDelete = !state.isDelete;
    },
    toggleLockerDialog: (state) => {
      state.isLockerDialogOpen = !state.isLockerDialogOpen;
    },
    toggleLockerUpdateDialog: (state) => {
      state.isLockerUpdateDialogOpen = !state.isLockerUpdateDialogOpen;
    },
    toggleDeleteLocker: (state) => {
      state.isDeleteLocker = !state.isDeleteLocker;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPlace,
  setPlaces,
  setPlaceUpdate,
  toggleDialog,
  updatePlace,
  toggleDelete,
  deletePlace,
  addLocker,
  updateLocker,
  deleteLocker,
  toggleLockerDialog,
  toggleLockerUpdateDialog,
  toggleDeleteLocker,
} = placeSlice.actions;

export default placeSlice.reducer;
