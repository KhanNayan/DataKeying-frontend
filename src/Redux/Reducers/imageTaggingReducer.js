import {
  GET_IMAGE_DATA,
  GET_IMAGE_SERIES_NUMBER,
  UPDATE_IMAGE_COMMENT,
  IMAGE_DATA_INSERT,
} from "../Actions/types";

const initialState = [];

function imageTaggingReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_IMAGE_SERIES_NUMBER:
      return payload;

    case GET_IMAGE_DATA:
      return payload;

    case UPDATE_IMAGE_COMMENT:
      return state.map((image) => {
        if (image.IMAGE_NUMBER === payload.IMAGE_NUMBER) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return image;
        }
      });
    case IMAGE_DATA_INSERT:
      return payload;

    default:
      return state;
  }
}

export default imageTaggingReducer;
