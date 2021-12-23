import { configureStore } from "@reduxjs/toolkit";
import { Dispatch } from "react";

import modalTypes from "./modal.types";

interface DispatchProps {
  type: string;
}

type Action = (dispatch: Dispatch<DispatchProps>) => () => void;

interface ActionsProps {
  toggleModal: Action;
}

const modalActions: ActionsProps = {
  toggleModal: (dispatch) => () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
};

export default modalActions;
