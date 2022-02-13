import modalTypes from "./modal.types";

interface StateProps {
  isShow: boolean;
  title: string;
  initialValues?: any;
  documentID?: string;
  departmentId: string;  
  onSubmit?: (values: any) => void;
  departmentInfo: {
    company?: {
      _id: string
    };
  }
}

interface ActionProps {
  type: string;
  payload?: {
    title: string;
    initialValues?: any;
    documentID?: string;
    departmentId: string;
    onSubmit?: (values: any) => void;
    departmentInfo: {
      company?: {
        _id: string
      };
    }
  }
}

export const INITIAL_STATE = {
  isShow: false,
  title: '',
  initialValues: {},
  documentID: '',
  departmentId: '',
  onSubmit: () => null,
  departmentInfo: {},
};

const modalReducers = (state: StateProps, action: ActionProps): StateProps => {
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
