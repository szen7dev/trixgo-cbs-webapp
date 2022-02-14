import modalTypes from "./modal.types";

// Typescript;
import { Action } from "typings/ppt/reducer";

type ActionsProps = {
  toggleModal: Action<() => void>;
  updateModal: Action<(payload: any) => void>;
};

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
