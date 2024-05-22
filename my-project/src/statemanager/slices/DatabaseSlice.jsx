import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const DatabaseSlice = createSlice({
  name: "Database",
  initialState: {
    allUsers: [],
  },

  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const selectAllUsers = (state) => state.Database.allUsers;

export const { setAllUsers } = DatabaseSlice.actions;
export default DatabaseSlice.reducer;
