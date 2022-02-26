/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import modalTypes from "./modal.types";

// Typescript
import { DispatchAction } from "typings/ppt/reducer";

const modalActions = (dispatch: DispatchAction) => ({
  toggleModal: () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
  closeModal: () => {
    return dispatch({
      type: modalTypes.CLOSE_MODAL,
    });
  },
  openPost: (payload: {
    mediaId: string;
    images: any[];
    index: number;
    author: any;
    createAt: string;
  }) => {
    return dispatch({
      type: modalTypes.OPEN_POST,
      payload,
    });
  },
  openComment: (payload: {
    mediaId: string;
    images: any[];
    index: number;
    author: any;
    createAt: string;
  }) => {
    return dispatch({
      type: modalTypes.OPEN_COMMENT,
      payload,
    });
  },
  openReply: (payload: any) => {
    return dispatch({
      type: modalTypes.OPEN_REPLY,
      payload,
    });
  },
  setIndex: (payload: any) => {
    return dispatch({
      type: modalTypes.SET_INDEX,
      payload,
    });
  },
});

export default modalActions;
