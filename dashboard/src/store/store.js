// setting up redux here.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import forgotResetPasswordReducer from "./slices/forgotResetPassword"
import messageReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice"
import skillReducer from "./slices/skillSlice"
import softwareApplicationReducer from "./slices/softwareApplicationSlice"
import projectReducer from "./slices/projectSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    softwareApplications: softwareApplicationReducer,
    project: projectReducer,
  },
});