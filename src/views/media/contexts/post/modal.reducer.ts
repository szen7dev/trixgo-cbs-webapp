import modalTypes from "views/media/contexts/post/modal.types";

import { DispatchProps } from "typings/ppt/reducer";
import { ImageProps } from "typings/social";

export const INITIAL_STATE = {
  isShow: false,
  mediaID: "",
  isPost: false,
  isComment: false,
  isReply: false,
  images: [] as ImageProps[],
  index: 0,
};

export type StateProps = typeof INITIAL_STATE;

const modalReducers = (
  state: StateProps,
  action: DispatchProps
): StateProps => {
  switch (action.type) {
    case modalTypes.TOGGLE_MODAL:
      return {
        ...state,
        isShow: !state.isShow,
      };
    case modalTypes.CLOSE_MODAL:
      return {
        ...state,
        isShow: false,
      };
    case modalTypes.OPEN_POST:
      return {
        ...state,
        isShow: true,
        mediaID: action.payload.mediaId,
        images: action.payload.images,
        index: action.payload.index,
        isPost: true,
        isComment: false,
        isReply: false,
      };
    case modalTypes.OPEN_COMMENT:
      return {
        ...state,
        isShow: true,
        mediaID: action.payload.mediaId,
        images: action.payload.images,
        index: action.payload.index,
        isPost: false,
        isComment: true,
        isReply: false,
      };
    case modalTypes.OPEN_REPLY:
      return {
        ...state,
        isShow: true,
        mediaID: action.payload.mediaId,
        images: action.payload.images,
        index: action.payload.index,
        isPost: false,
        isComment: false,
        isReply: true,
      };
    case modalTypes.SET_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducers;
