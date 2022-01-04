import { Dispatch } from "react";

import modalTypes from "./modal.types";

interface DispatchProps {
  type: string;
  payload?: any;
}

type Action = (
  dispatch: Dispatch<DispatchProps>
) => (...payload: any[]) => void;

interface ActionsProps {
  toggleModal: Action;
  closeModal: Action;
  openPost: Action;
  openComment: Action;
  openReply: Action;
}

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
};

export default modalActions;
