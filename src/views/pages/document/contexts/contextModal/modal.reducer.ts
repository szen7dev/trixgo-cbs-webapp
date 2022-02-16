import modalTypes from "./modal.types";

// Typescript
import type { DispatchProps } from "typings/ppt/reducer";

interface StateProps {
  isShow: boolean;
  title: string;
  initialValues: {
    [k: string]: any
  };
  documentID?: string;
  departmentId: string;  
  onSubmit?: (values: any) => void;
  departmentInfo: {
    company?: {
      _id: string
    };
  }
}

export const INITIAL_STATE: StateProps = {
  isShow: false,
  title: '',
  documentID: '',
  departmentId: '',
  departmentInfo: {},
  onSubmit: (values) => values,
  initialValues: {},
};

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
