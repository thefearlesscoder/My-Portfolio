// setting up redux here.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import forgotResetPasswordReducer from "./slices/forgotResetPassword"

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
  },
});