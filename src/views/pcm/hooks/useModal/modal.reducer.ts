import modalTypes from "./modal.types";

import { DispatchProps } from "typings/ppt/reducer";
import { StateProps } from "./modal.state";

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
    case modalTypes.OPEN_ADD_USER_RELATION:
      return {
        ...state,
        isShow: true,
        type: "relation",
      };
    case modalTypes.OPEN_ADD_NOTIFICATION_EMAIL:
      return {
        ...state,
        isShow: true,
        type: "email",
      };
    default:
      return state;
  }
};

export default modalReducers;
