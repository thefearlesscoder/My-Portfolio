import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    // /==========================================
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    //==================================================================
    clearAllError(state, actions) {
      state.error = null;
      state = state;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
    dispatch(forgotResetPassSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.resetPasswordFail(
        error?.response?.data?.message
      )
    );
  }
};

export const resetPassword =
  (resetToken, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "conctent-type": "application/json" },
        }
      );
      dispatch(forgotResetPassSlice.actions.resetPasswordSuccess());
      dispatch(forgotResetPassSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFail(
          error?.response?.data?.message
        )
      );
    }
  };

export const logout = () => async (dispatch) => {};

export const clearAllForgotPasswordErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllError);
};

export default forgotResetPassSlice.reducer;
