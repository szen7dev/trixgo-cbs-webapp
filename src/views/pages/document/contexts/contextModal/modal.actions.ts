import modalTypes from "./modal.types";

// Typescript;
import { Action } from "typings/ppt/reducer";

type ActionsProps = {
  toggleModal: Action<() => void>;
};

const modalActions: ActionsProps = {
  toggleModal: (dispatch) => () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
};

export default modalActions;
