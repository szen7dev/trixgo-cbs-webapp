import uploadFileTypes from "./upload.types";

import { DispatchAction } from "typings/ppt/reducer";

const actionsFileCommon = {
  removeAllFiles: (dispatch: DispatchAction) => (id?: string) =>
    dispatch({
      type: uploadFileTypes.REMOVE_ALL_FILES,
      payload: id,
    }),
};

const actionsImages = {
  setUploadImage: (dispatch: DispatchAction) => (payload: any) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_IMAGE,
      payload: payload,
    }),
  setUploadImageProgress:
    (dispatch: DispatchAction) => (id: number | string, progress: number) =>
      dispatch({
        type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
        payload: {
          id,
          progress,
        },
      }),
  setIDImageUploaded:
    (dispatch: DispatchAction) => (id: number | string, key?: string) =>
      dispatch({
        type: uploadFileTypes.SET_ID_IMAGE_UPLOADED,
        payload: { id, key },
      }),
  successUploadImage: (dispatch: DispatchAction) => (id: number) =>
    dispatch({
      type: uploadFileTypes.SUCCESS_UPLOAD_IMAGE,
      payload: id,
    }),
  failureUploadImage: (dispatch: DispatchAction) => (id: number) =>
    dispatch({
      type: uploadFileTypes.FAILURE_UPLOAD_IMAGE,
      payload: id,
    }),
  removeUploadedImage: (dispatch: DispatchAction) => (id: number | string) => {
    dispatch({
      type: uploadFileTypes.REMOVE_UPLOADED_IMAGE,
      payload: id,
    });
    return true;
  },
};

const actionsFiles = {
  setUploadFile: (dispatch: DispatchAction) => (payload: any) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_FILE,
      payload: payload,
    }),
  setUploadFileProgress:
    (dispatch: DispatchAction) => (id: number | string, progress: number) =>
      dispatch({
        type: uploadFileTypes.SET_UPLOAD_FILE_PROGRESS,
        payload: {
          id,
          progress,
        },
      }),
  setIDFileUploaded:
    (dispatch: DispatchAction) => (id: number | string, key?: string) =>
      dispatch({
        type: uploadFileTypes.SET_ID_FILE_UPLOADED,
        payload: { id, key },
      }),
  successUploadFile: (dispatch: DispatchAction) => (id: number) =>
    dispatch({
      type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
      payload: id,
    }),
  failureUploadFile: (dispatch: DispatchAction) => (id: number) =>
    dispatch({
      type: uploadFileTypes.FAILURE_UPLOAD_FILE,
      payload: id,
    }),
  removeUploadedFile: (dispatch: DispatchAction) => (id: number | string) => {
    dispatch({
      type: uploadFileTypes.REMOVE_UPLOADED_FILE,
      payload: id,
    });
    return true;
  },
};

const uploadActions = {
  ...actionsFileCommon,
  ...actionsImages,
  ...actionsFiles,
};

export default uploadActions;
