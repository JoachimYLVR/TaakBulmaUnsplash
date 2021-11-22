import axios from "axios";
const START_FETCH_PHOTOS = "START_FETCH_PHOTOS";
const ERROR_FETCH_PHOTOS = "ERROR_FETCH_PHOTOS";
const SUCCESS_FETCH_PHOTOS = "SUCCESS_FETCH_PHOTOS";
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";

export const setSearchValue = (str) => ({
  type: SET_SEARCH_VALUE,
  payload: str
});

export const getPhotos = () => async (dispatch, getState) => {
  dispatch({ type: START_FETCH_PHOTOS });
  try {
    const {
      data: { drinks }
    } = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().photosState.searchStr
      }`
    );
    dispatch({
      type: SUCCESS_FETCH_PHOTOS,
      payload: drinks ?? []
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCH_PHOTOS,
      payload: error.message
    });
  }
};

const photos = {
  searchStr: "",
  loading: false,
  error: {
    status: false,
    message: ""
  },
  photos: []
};

export default (state = photos, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_VALUE:
      return { ...state, searchStr: payload };
    case START_FETCH_PHOTOS:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ""
        },
        photos: []
      };
    case ERROR_FETCH_PHOTOS:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: payload
        }
      };
    case SUCCESS_FETCH_PHOTOS:
      return {
        ...state,
        loading: false,
        error: { status: false, message: "" },
        photos: payload
      };
    default:
      return state;
  }
};

