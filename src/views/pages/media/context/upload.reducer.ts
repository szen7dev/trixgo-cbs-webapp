import uploadFileTypes from "./upload.types";
import { modifyFiles } from "./upload.utils";

import { ISTATE, TReducer } from "./upload.d";

export const INITIAL_STATE: ISTATE = {
  files: {
    // format will be like below
    // 1: {  --> this interpreted as uploaded file #1
    //   id: 1,
    //   file,
    //   progress: 0,
    // },
  },
  images: {},
};

const fileUploadReducer: TReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uploadFileTypes.SET_UPLOAD_FILE:
      return {
        ...state,
        files: {
          ...state.files,
          ...modifyFiles(state.files, action.payload),
        },
      };
    case uploadFileTypes.SET_UPLOAD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          ...modifyFiles(state.images, action.payload),
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
    case uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.id]: {
            ...state.images[action.payload.id],
            progress: action.payload.progress,
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
    case uploadFileTypes.SUCCESS_UPLOAD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload]: {
            ...state.images[action.payload],
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
    case uploadFileTypes.FAILURE_UPLOAD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload]: {
            ...state.images[action.payload],
            status: 0,
            progress: 0,
          },
        },
      };
    case uploadFileTypes.CANCEL_UPLOAD_FILE:
      // eslint-disable-next-line no-case-declarations
      const cloneFiles = { ...state.files };
      delete cloneFiles[action.payload];
      return {
        ...state,
        files: cloneFiles,
      };
    case uploadFileTypes.CANCEL_UPLOAD_IMAGE:
      // eslint-disable-next-line no-case-declarations
      const cloneImages = { ...state.images };
      delete cloneImages[action.payload];
      return {
        ...state,
        images: cloneImages,
      };

    default:
      return state;
  }
};

export default fileUploadReducer;
