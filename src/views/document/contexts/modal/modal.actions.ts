/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import modalTypes from "./modal.types";

// Typescript;
import { DispatchAction } from "typings/ppt/reducer";

const modalActions = (dispatch: DispatchAction) => ({
  toggleModal: (): void => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
  updateModal: (payload: any): void => {
    return dispatch({
      type: modalTypes.UPDATE_MODAL,
      payload,
    });
  },
});

export default modalActions;
