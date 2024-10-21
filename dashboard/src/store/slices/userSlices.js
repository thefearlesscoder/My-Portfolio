import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      console.log("action: ",action);
      console.log("action pay: ",action.payload);
      
      state.user = action.payload;

      state.message = action.message;
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFail(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    //=====================================================
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    //================================================================
    //update profile
    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
//====================================================================
    updateProfileResetAfterUpdate(state, action){
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },

    clearAllError(state, actions) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest);
  try {
    console.log(" inside tryy");

    const response = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      { withCredentials: true },
      { headers: { "Content-Type": "application/json" } }
    );
    const { data } = response;
    
    console.log("data in login function : ", data);
    console.log("data mil gya");

    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());

    console.log("data chala gya");
  } catch (error) {
    console.log("error mil gya");
    dispatch(
      userSlice.actions.loginFail(
        error.response?.data?.message || "Network error"
      )
    );
    // dispatch(userSlice.actions.clearAllError());
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest);
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());

  } catch (error) {
    console.log("error mil gya");
    dispatch(
      userSlice.actions.loadUserFail(
        error.response?.data?.message || "Network error"
      )
    );
    // dispatch(userSlice.actions.clearAllError());
  }
};

export const logout = () => async (dispatch) => {

  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    console.log("error mil gya");
    dispatch(
      userSlice.actions.logoutFail(
        error.response?.data?.message || "Network error"
      )
    );
    // dispatch(userSlice.actions.clearAllError());
  }
};
//==================================================================
//update passoword
export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try{
      const {data} = await axios.put("http://localhost:4000/api/v1/user/update/password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      dispatch(userSlice.actions.updatePasswordSuccess());
      dispatch(userSlice.actions.clearAllError());
    }catch(error) {
      console.log("error aya");
      dispatch(userSlice.actions.updateProfileFailed(error?.response?.data?.message));

    }
  };
//===================================================================
//update profile
export const updateProfile=
  (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update/me",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(userSlice.actions.updateProfileSuccess());
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      console.log("error aya");
      dispatch(
        userSlice.actions.updateProfileFailed(error?.response?.data?.message)
      );
    }
  };
//=====================================================================
//reset profile
export const resetProfile = () =>async(dispatch) =>{
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError);
};

export default userSlice.reducer;
