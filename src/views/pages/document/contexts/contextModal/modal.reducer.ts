import modalTypes from "./modal.types";

// Typescript
import { DispatchProps } from "typings/ppt/reducer";

interface StateProps {
  isShow: boolean;
}

export const INITIAL_STATE = {
  isShow: false,
};

const modalReducers = (state: StateProps, action: DispatchProps): StateProps => {
  switch (action.type) {
    case modalTypes.TOGGLE_MODAL:
      return {
        ...state,
        isShow: !state.isShow,
      };
    default:
      return state;
  }
};

export default modalReducers;
