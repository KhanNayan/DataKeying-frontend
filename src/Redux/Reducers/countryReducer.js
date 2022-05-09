//////////////////COUNTRY ACTION TYPES/////////////////////////
import {
  CREATE_COUNTRY,
  GET_COUNTRY_ALL,
  GET_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
} from "../Actions/types";
//////////////////END OF COUNTRY ACTION TYPES/////////////////////////

const initialState = [];

function countryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COUNTRY:
      return [...state, payload];

    case GET_COUNTRY:
      return [payload];

    case GET_COUNTRY_ALL:
      return payload;

    case UPDATE_COUNTRY:
      return state.map((country) => {
        if (country.id === country.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return country;
        }
      });

    case DELETE_COUNTRY:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
}

export default countryReducer;
