import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const LoginUserSlice = createSlice({
  name: "LoginDetails",
  initialState: {
    loginStatus: false,
    loginUserDetails: {},
  },

  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setLoginUserDetails: (state, action) => {
      state.loginUserDetails = action.payload;
    },
  },
});

export const selectLoginStatus = (state) => state.LoginDetails.loginStatus;
export const selectLoginUserDetails = (state) =>
  state.LoginDetails.loginUserDetails;

export const { setLoginStatus, setLoginUserDetails } = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
