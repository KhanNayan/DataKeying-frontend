import { LOGIN_SUCCESS, LOGOUT, CURRENT_USER } from "./types";

import AuthService from "../Services/authService";

export const createToken = (username, password) => async (dispatch) => {
  try {
    const res = await AuthService.getToken({
      username,
      password,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await AuthService.getCurrentUser();
    dispatch({
      type: CURRENT_USER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
