//////////////////PROJECT ACTION TYPES/////////////////////////
import {
  CREATE_PROJECT,
  GET_PROJECT_ALL,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_DATABASE,
} from "../Actions/types";
//////////////////END OF PROJECT ACTION TYPES/////////////////////////

const initialState = [];

function projectReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return [...state, payload];

    case GET_PROJECT:
      return [payload];

    case GET_PROJECT_ALL:
      return payload;

    case UPDATE_PROJECT:
      return state.map((project) => {
        if (project.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return project;
        }
      });

    case DELETE_PROJECT:
      return state.filter(({ id }) => id !== payload.id);

    case CREATE_PROJECT_DATABASE:
      return [...state, payload];

    default:
      return state;
  }
}

export default projectReducer;
