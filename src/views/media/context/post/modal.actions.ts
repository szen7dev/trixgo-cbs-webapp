/* eslint-disable @typescript-eslint/no-explicit-any */
import modalTypes from "./modal.types";

// Typescript
import { Action } from "typings/ppt/reducer";

type ActionsProps = {
  toggleModal: Action<() => void>;
  closeModal: Action<() => void>;
  openPost: Action<(payload: any) => void>;
  openComment: Action<(payload: any) => void>;
  openReply: Action<(payload: any) => void>;
  setIndex: Action<(payload: any) => void>;
};

const modalActions: ActionsProps = {
  toggleModal: (dispatch) => () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
  closeModal: (dispatch) => () => {
    return dispatch({
      type: modalTypes.CLOSE_MODAL,
    });
  },
  openPost: (dispatch) => (payload) => {
    return dispatch({
      type: modalTypes.OPEN_POST,
      payload,
    });
  },
  openComment: (dispatch) => (payload) => {
    return dispatch({
      type: modalTypes.OPEN_COMMENT,
      payload,
    });
  },
  openReply: (dispatch) => (payload) => {
    return dispatch({
      type: modalTypes.OPEN_REPLY,
      payload,
    });
  },
  setIndex: (dispatch) => (payload) => {
    return dispatch({
      type: modalTypes.SET_INDEX,
      payload,
    });
  },
};

export default modalActions;
