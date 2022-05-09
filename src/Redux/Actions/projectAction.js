import {
  CREATE_PROJECT,
  GET_PROJECT_ALL,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_DATABASE,
} from "./types";

import ProjectService from "../Services/projectService";

export const createProject =
  (projectName, startDate, endDate, language, country, description, status) =>
  async (dispatch) => {
    try {
      const res = await ProjectService.create({
        projectName,
        startDate,
        endDate,
        language,
        country,
        description,
        status,
      });

      dispatch({
        type: CREATE_PROJECT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getProjects = () => async (dispatch) => {
  try {
    const res = await ProjectService.getAll();
    dispatch({
      type: GET_PROJECT_ALL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProject = (id) => async (dispatch) => {
  try {
    const res = await ProjectService.get(id);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    await ProjectService.update(id, data);
    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await ProjectService.remove(id);
    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
export const createProjectDatebase = (databaseName) => async (dispatch) => {
  try {
    const res = await ProjectService.createDatabase({ databaseName });
    dispatch({
      type: CREATE_PROJECT_DATABASE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
