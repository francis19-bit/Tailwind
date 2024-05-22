import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const AdminLoginUserSlice = createSlice({
  name: "AdminLoginDetails",
  initialState: {
    AdminloginStatus: false,
    AdminloginUserDetails: {},
  },

  reducers: {
    setAdminLoginStatus: (state, action) => {
      state.AdminloginStatus = action.payload;
    },
    setAdminLoginUserDetails: (state, action) => {
      state.AdminloginUserDetails = action.payload;
    },
  },
});

export const selectAdminLoginStatus = (state) =>
  state.AdminLoginDetails.AdminloginStatus;
export const selectAdminLoginUserDetails = (state) =>
  state.AdminLoginDetails.AdminloginUserDetails;

export const { setAdminLoginStatus, setAdminLoginUserDetails } =
  AdminLoginUserSlice.actions;
export default AdminLoginUserSlice.reducer;
