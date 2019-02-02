import { UPDATE_IMAGE_PATH } from '../constants/action-types';

export const updateImagePath = path => ({
  type: UPDATE_IMAGE_PATH,
  imagePath: path
});
