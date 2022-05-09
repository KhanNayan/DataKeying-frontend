import {
  CREATE_LANGUAGE,
  GET_LANGUAGE_ALL,
  GET_LANGUAGE,
  UPDATE_LANGUAGE,
  DELETE_LANGUAGE,
} from "./types";

import LanguageService from "../Services/languageService";

export const createLanguage =
  (languageName, description, status) => async (dispatch) => {
    try {
      const res = await LanguageService.create({
        languageName,
        description,
        status,
      });

      dispatch({
        type: CREATE_LANGUAGE,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getLanguages = () => async (dispatch) => {
  try {
    const res = await LanguageService.getAll();
    dispatch({
      type: GET_LANGUAGE_ALL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getLanguage = (id) => async (dispatch) => {
  try {
    const res = await LanguageService.get(id);
    dispatch({
      type: GET_LANGUAGE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateLanguage = (id, data) => async (dispatch) => {
  try {
    await LanguageService.update(id, data);
    dispatch({
      type: UPDATE_LANGUAGE,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteLanguage = (id) => async (dispatch) => {
  try {
    await LanguageService.remove(id);
    dispatch({
      type: DELETE_LANGUAGE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
