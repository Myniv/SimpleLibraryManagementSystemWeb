import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
