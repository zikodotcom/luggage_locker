import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    activeUser: (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].is_active = !state.users[userIndex].is_active;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, setUsers, activeUser } = userSlice.actions;

export default userSlice.reducer;
