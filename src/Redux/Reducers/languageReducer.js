//////////////////LANGUAGE ACTION TYPES/////////////////////////
import {
  CREATE_LANGUAGE,
  GET_LANGUAGE_ALL,
  GET_LANGUAGE,
  UPDATE_LANGUAGE,
  DELETE_LANGUAGE,
} from "../Actions/types";
//////////////////END OF LANGUAGE ACTION TYPES/////////////////////////

const initialState = [];

function languageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LANGUAGE:
      return [...state, payload];

    case GET_LANGUAGE:
      return [payload];

    case GET_LANGUAGE_ALL:
      return payload;

    case UPDATE_LANGUAGE:
      return state.map((language) => {
        if (language.id === language.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return language;
        }
      });

    case DELETE_LANGUAGE:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default languageReducer;
