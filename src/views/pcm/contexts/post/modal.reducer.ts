import modalTypes from "./modal.types";

import { DispatchProps } from "typings/ppt/reducer";
import { ImageProps } from "typings/common";

export const INITIAL_STATE = {
  isShow: false,
  taskID: "",
  author: undefined,
  createAt: "",
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
        taskID: action.payload.taskID,
        images: action.payload.images,
        index: action.payload.index,
        author: action.payload.author,
        createAt: action.payload.createAt,

        isPost: true,
        isComment: false,
        isReply: false,
      };
    case modalTypes.OPEN_COMMENT:
      return {
        ...state,
        isShow: true,
        taskID: action.payload.taskID,
        images: action.payload.images,
        index: action.payload.index,
        author: action.payload.author,
        createAt: action.payload.createAt,

        isPost: false,
        isComment: true,
        isReply: false,
      };
    case modalTypes.OPEN_REPLY:
      return {
        ...state,
        isShow: true,
        taskID: action.payload.taskID,
        images: action.payload.images,
        index: action.payload.index,
        author: action.payload.author,
        createAt: action.payload.createAt,

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
