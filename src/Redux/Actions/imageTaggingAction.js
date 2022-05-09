import ImageTaggingService from "../Services/imageTaggingService";
import {
  GET_IMAGE_DATA,
  GET_IMAGE_SERIES_NUMBER,
  UPDATE_IMAGE_COMMENT,
  IMAGE_DATA_INSERT,
} from "./types";

export const getImageSeries = () => async (dispatch) => {
  try {
    const res = await ImageTaggingService.getImageSeries();
    dispatch({
      type: GET_IMAGE_SERIES_NUMBER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getImageData = (data) => async (dispatch) => {
  try {
    const res = await ImageTaggingService.getImageData(data);
    dispatch({
      type: GET_IMAGE_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateImageComment = (data) => async (dispatch) => {
  try {
    const res = await ImageTaggingService.updateImageComment(data);
    console.log("res", res);
    dispatch({
      type: UPDATE_IMAGE_COMMENT,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const imageDataInsert = (data) => async (dispatch) => {
  try {
    const res = await ImageTaggingService.imageDataInsert(data);
    console.log("res", res);
    dispatch({
      type: IMAGE_DATA_INSERT,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
