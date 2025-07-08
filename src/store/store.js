import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/feautures/userSlice";
import countryReducer from "@/feautures/countrySlice";
import cityReducer from "@/feautures/citySlice";
import placeReducer from "@/feautures/placeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
    city: cityReducer,
    place: placeReducer,
  },
});
