import modalTypes from "./modal.types";

interface StateProps {
  isShow: boolean;
}

interface ActionProps {
  type: string;
}

export const INITIAL_STATE = {
  isShow: false,
};

const modalReducers = (state: StateProps, action: ActionProps): StateProps => {
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
