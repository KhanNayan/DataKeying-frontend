import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import languageReducer from "./languageReducer";
import countryReducer from "./countryReducer";
import authReducer from "./authReducer";
import imageTaggingReducer from "./imageTaggingReducer";

export default combineReducers({
  projectReducer,
  languageReducer,
  countryReducer,
  authReducer,
  imageTaggingReducer,
});
