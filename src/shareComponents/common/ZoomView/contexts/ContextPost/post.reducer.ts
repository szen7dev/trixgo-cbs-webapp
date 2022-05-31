import postTypes from "./post.types";

import { DispatchProps } from "typings/ppt/reducer";
import { PostState } from "./post.state";

const postReducer = (state: PostState, action: DispatchProps): PostState => {
  switch (action.type) {
    case postTypes.SET_INDEX_IMAGE:
      return {
        ...state,
        index: action.payload,
      };
    case postTypes.SET_INFO_IMAGE: {
      const { index, info } = action.payload;
      const images = [...state.images];
      images[index] = info;

      return {
        ...state,
        images,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
