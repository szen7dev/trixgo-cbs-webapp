import uploadFileTypes from "./comment.types";

import { TAction } from "./comment";

interface IImageActions {
  setUploadImage: TAction;
  setUploadImageProgress: TAction;
  setIDImageUploaded: TAction;
  successUploadImage: TAction;
  failureUploadImage: TAction;
  removeUploadedImage: TAction;
}

const actionsComment: IImageActions = {
  setUploadImage: (dispatch) => (payload: File[]) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_IMAGE,
      payload: payload,
    }),
  setUploadImageProgress: (dispatch) => (id: number, progress: number) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
      payload: {
        id,
        progress,
      },
    }),
  setIDImageUploaded: (dispatch) => (id: number, key: string) =>
    dispatch({
      type: uploadFileTypes.SET_ID_IMAGE_UPLOADED,
      payload: { id, key },
    }),
  successUploadImage: (dispatch) => (id: number) =>
    dispatch({
      type: uploadFileTypes.SUCCESS_UPLOAD_IMAGE,
      payload: id,
    }),
  failureUploadImage: (dispatch) => (id: number) =>
    dispatch({
      type: uploadFileTypes.FAILURE_UPLOAD_IMAGE,
      payload: id,
    }),
  removeUploadedImage: (dispatch) => (id: number) => {
    dispatch({
      type: uploadFileTypes.REMOVE_UPLOADED_IMAGE,
      payload: id,
    });
    return true;
  },
};


const uploadActions = {
  ...actionsComment,
};

export default uploadActions;
