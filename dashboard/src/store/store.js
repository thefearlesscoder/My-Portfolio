// setting up redux here.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import forgotResetPasswordReducer from "./slices/forgotResetPassword"
import messageReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messageReducer
  },
});