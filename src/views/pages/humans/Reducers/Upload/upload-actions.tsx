import { TAction } from "./upload";
import { uploadFileTypes } from "./upload-reducer";

interface IFileActions {
  setUploadFile: TAction;
  setUploadFileProgress: TAction;
  setIDFileUploaded: TAction;
  successUploadFile: TAction;
  failureUploadFile: TAction;
  removeUploadedFile: TAction;
  removeAllFiles: TAction;
}

export const actionsFiles: IFileActions = {
  setUploadFile: (dispatch) => (payload: File[]) => dispatch({
    type: uploadFileTypes.SET_UPLOAD_FILE,
    payload: {
      ...payload
    },
  }),
  setUploadFileProgress: (dispatch) => (id: number, progress: number) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_FILE_PROGRESS,
      payload: {
        id,
        progress,
      },
    }),
  setIDFileUploaded: (dispatch) => (id: number, key: string, contactDocumentID: string) =>
    dispatch({
      type: uploadFileTypes.SET_ID_FILE_UPLOADED,
      payload: { id, key, contactDocumentID },
    }),
  successUploadFile: (dispatch) => (id: number) =>
    dispatch({
      type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
      payload: id,
    }),
  failureUploadFile: (dispatch) => (id: number) =>
    dispatch({
      type: uploadFileTypes.FAILURE_UPLOAD_FILE,
      payload: id,
    }),
  removeUploadedFile: (dispatch) => (id: number) => {
    dispatch({
      type: uploadFileTypes.REMOVE_UPLOADED_FILE,
      payload: id,
    });
    return true;
  },
  removeAllFiles: (dispatch) => (id?: string) =>
    dispatch({
      type: uploadFileTypes.REMOVE_ALL_FILES,
      payload: id,
    }),
};
