import uploadFileTypes from "./upload.types";

import { TAction } from "./upload.d";
import { FilePropsUpload } from "typings/social";

interface IImageActions {
  setUploadImage: TAction;
  setUploadImageProgress: TAction;
  successUploadImage: TAction;
  failureUploadImage: TAction;
  uploadImage: TAction;
  cancelUploadImage: TAction;
}
interface IFileActions {
  setUploadFile: TAction;
  setUploadFileProgress: TAction;
  successUploadFile: TAction;
  failureUploadFile: TAction;
  uploadFile: TAction;
  cancelUploadFile: TAction;
}

const actionsImages: IImageActions = {
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
  uploadImage:
    (dispatch) =>
    (
      files: FilePropsUpload[],
      isUnmounted: boolean,
      refs: { [key: string]: NodeJS.Timeout }
    ) => {
      if (files.length) {
        files.forEach(async (file) => {
          // const formPayload = new FormData();
          // formPayload.append("file", file.file);
          try {
            // Demo loading
            let loaded = 0;
            const total = 100;
            await new Promise((resolve, reject) => {
              refs[file.id] = setInterval(() => {
                loaded += 2;
                const percentageProgress = Math.floor((loaded / total) * 100);
                if (isUnmounted) {
                  clearInterval(refs[file.id]);
                  return;
                }
                dispatch({
                  type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
                  payload: {
                    id: file.id,
                    progress: percentageProgress,
                  },
                });
                if (loaded >= 100) {
                  clearInterval(refs[file.id]);
                  resolve(true);
                }
              }, 200);
            });

            // Call api post method to get image url here!
            // Add { cancelToken: ourRequest.token } to configs axios to use cancel method

            dispatch({
              type: uploadFileTypes.SUCCESS_UPLOAD_IMAGE,
              payload: file.id,
            });
          } catch (error) {
            dispatch({
              type: uploadFileTypes.FAILURE_UPLOAD_IMAGE,
              payload: file.id,
            });
          }
        });
      }
    },
  cancelUploadImage: (dispatch) => (file: FilePropsUpload) => {
    if (file.progress !== 100) {
      // This method to cancel axios post request upload;
      // file.cancelTokenSource.cancel();
    }

    dispatch({
      type: uploadFileTypes.CANCEL_UPLOAD_IMAGE,
      payload: file.id,
    });
    return true;
  },
};
const actionsFiles: IFileActions = {
  setUploadFile: (dispatch) => (payload: File[]) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_FILE,
      payload: payload,
    }),
  setUploadFileProgress: (dispatch) => (id: number, progress: number) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
      payload: {
        id,
        progress,
      },
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
  uploadFile:
    (dispatch) =>
    (
      files: FilePropsUpload[],
      isUnmounted: boolean,
      refs: { [key: string]: NodeJS.Timeout }
    ) => {
      if (files.length) {
        files.forEach(async (file) => {
          // const formPayload = new FormData();
          // formPayload.append("file", file.file);
          try {
            // Demo loading
            let loaded = 0;
            const total = 100;
            await new Promise((resolve, reject) => {
              refs[file.id] = setInterval(() => {
                loaded += 2;
                const percentageProgress = Math.floor((loaded / total) * 100);
                if (isUnmounted) {
                  clearInterval(refs[file.id]);
                  return;
                }
                dispatch({
                  type: uploadFileTypes.SET_UPLOAD_FILE_PROGRESS,
                  payload: {
                    id: file.id,
                    progress: percentageProgress,
                  },
                });
                if (loaded >= 100) {
                  clearInterval(refs[file.id]);
                  resolve(true);
                }
              }, 200);
            });

            // Call api post method to get image url here!
            // Add { cancelToken: ourRequest.token } to configs axios to use cancel method

            dispatch({
              type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
              payload: file.id,
            });
          } catch (error) {
            dispatch({
              type: uploadFileTypes.FAILURE_UPLOAD_FILE,
              payload: file.id,
            });
          }
        });
      }
    },
  cancelUploadFile: (dispatch) => (file: FilePropsUpload) => {
    if (file.progress !== 100) {
      // This method to cancel axios post request upload;
      // file.cancelTokenSource.cancel();
    }
    dispatch({
      type: uploadFileTypes.CANCEL_UPLOAD_FILE,
      payload: file.id,
    });
    return true;
  },
};

const uploadActions = {
  ...actionsImages,
  ...actionsFiles,
};

export default uploadActions;
