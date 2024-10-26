import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },

    addNewProjectRequest(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addNewProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addNewProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    deleteProjectRequest(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.projects;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      "http:/localhost:4000/api/v1/project/getall",
      { withCredentials: true }
    );
    dispatch(
      projectSlice.actions.getAllProjectsSuccess(response.data.projects)
    );
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

export default projectSlice;