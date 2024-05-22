import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import incomeReducer from "./slices/incomeSlice";
import DatabaseReducer from "./slices/DatabaseSlice";
import LoginUserReducer from "./slices/LoginUserSlice";
import AdminLoginUserReducer from "./slices/AdminLoginUserSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["Database"],
  // whitelist:
};

const reducer = combineReducers({
  //   Videos: VideosReducer,
  Database: DatabaseReducer,
  LoginDetails: LoginUserReducer,
  AdminLoginDetails: AdminLoginUserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
