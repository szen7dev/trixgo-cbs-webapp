import { ISTATE, TReducer } from "./upload";

export const uploadFileTypes = {
  SET_UPLOAD_FILE: "SET_UPLOAD_FILE",
  SET_UPLOAD_FILE_PROGRESS: "SET_UPLOAD_FILE_PROGRESS",
  SUCCESS_UPLOAD_FILE: "SUCCESS_UPLOAD_FILE",
  SET_ID_FILE_UPLOADED: "SET_ID_FILE_UPLOADED",
  FAILURE_UPLOAD_FILE: "FAILURE_UPLOAD_FILE",
  CANCEL_UPLOAD_FILE: "CANCEL_UPLOAD_FILE",
  REMOVE_UPLOADED_FILE: "REMOVE_UPLOADED_FILE",
  REMOVE_ALL_FILES: "REMOVE_ALL_FILES",
};

export const INITIAL_STATE: ISTATE = {
  files: {
    // format will be like below
    // 1: {  --> this interpreted as uploaded file #1
    //   id: 1,
    //   file,
    //   progress: 0,
    // },
  },
};

const fileUploadReducer: TReducer = (state, action) => {
  let cloneFiles;
  switch (action.type) {
    case uploadFileTypes.SET_UPLOAD_FILE:
      return {
        ...state,
        files: {
          ...state.files,
          ...action.payload,
        },
      };
    case uploadFileTypes.SET_UPLOAD_FILE_PROGRESS:
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload.id]: {
            ...state.files[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case uploadFileTypes.SET_ID_FILE_UPLOADED:
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload.id]: {
            ...state.files[action.payload.id],
            _id: action.payload.key,
            contactDocumentID: action.payload.contactDocumentID
          },
        },
      };
    case uploadFileTypes.SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload]: {
            ...state.files[action.payload],
            status: 1,
          },
        },
      };
    case uploadFileTypes.FAILURE_UPLOAD_FILE:
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload]: {
            ...state.files[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case uploadFileTypes.CANCEL_UPLOAD_FILE:
      cloneFiles = { ...state.files };
      delete cloneFiles[action.payload];
      return {
        ...state,
        files: cloneFiles,
      };
    case uploadFileTypes.REMOVE_UPLOADED_FILE:
      cloneFiles = { ...state.files };
      delete cloneFiles[action.payload];
      return {
        ...state,
        files: cloneFiles,
      };
    case uploadFileTypes.REMOVE_ALL_FILES:
      return {
        ...state,
        files: [],
      };
    default:
      return state;
  }
};

export default fileUploadReducer;
