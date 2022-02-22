import modalTypes from "./modal.types";

// Typescript
import type { DispatchProps } from "typings/ppt/reducer";
import { StateProps } from "./modal.state";

const modalReducers = (state: StateProps, action: DispatchProps): StateProps => {
  switch (action.type) {
    case modalTypes.TOGGLE_MODAL: {
      return {
        ...state,
        isShow: !state.isShow,
      };
    }
    case modalTypes.UPDATE_MODAL: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state;
  }
};

export default modalReducers;
