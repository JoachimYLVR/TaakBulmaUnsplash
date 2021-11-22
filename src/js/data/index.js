import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import photosState from "./photos";
const rootReducer = combineReducers({
  photosState
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;