import { UPDATE_IMAGE_PATH } from '../constants/action-types';
import { combineReducers } from 'redux';
const initialState = {
  image: {
    path: null
  }
};

const imageReducer = (state = initialState.image, action) => {
  switch (action.type) {
    case UPDATE_IMAGE_PATH:
      console.log(`image uri is ${action.imagePath}`);
      return { ...state, path: action.imagePath };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  image: imageReducer
});

export default rootReducer;
