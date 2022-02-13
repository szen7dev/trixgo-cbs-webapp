import { configureStore } from "@reduxjs/toolkit";
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
  updateModal: Action;
}

const modalActions: ActionsProps = {
  toggleModal: (dispatch) => () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
  updateModal: (dispatch) => (payload) => {
    return dispatch({
      type: modalTypes.UPDATE_MODAL,
      payload,
    })
  }
};

export default modalActions;
