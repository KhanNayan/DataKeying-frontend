import {
  CREATE_COUNTRY,
  GET_COUNTRY_ALL,
  GET_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
} from "./types";

import CountryService from "../Services/countryService";

export const createCountry =
  (countryName, description, status) => async (dispatch) => {
    try {
      const res = await CountryService.create({
        countryName,
        description,
        status,
      });

      dispatch({
        type: CREATE_COUNTRY,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getCountries = () => async (dispatch) => {
  try {
    const res = await CountryService.getAll();
    dispatch({
      type: GET_COUNTRY_ALL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCountry = (id) => async (dispatch) => {
  try {
    const res = await CountryService.get(id);
    dispatch({
      type: GET_COUNTRY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCountry = (id, data) => async (dispatch) => {
  try {
    await CountryService.update(id, data);
    dispatch({
      type: UPDATE_COUNTRY,
      payload: data,
    });

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCountry = (id) => async (dispatch) => {
  try {
    await CountryService.remove(id);
    dispatch({
      type: DELETE_COUNTRY,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
