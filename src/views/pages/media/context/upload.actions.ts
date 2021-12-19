import uploadFileTypes from "./upload.types";

import { TAction } from "./upload.d";

interface IImageActions {
  setUploadImage: TAction;
  setUploadImageProgress: TAction;
  setIDImageUploaded: TAction;
  successUploadImage: TAction;
  failureUploadImage: TAction;
  removeUploadedImage: TAction;
}
interface IFileActions {
  setUploadFile: TAction;
  setUploadFileProgress: TAction;
  setIDFileUploaded: TAction;
  successUploadFile: TAction;
  failureUploadFile: TAction;
  removeUploadedFile: TAction;
}

// const actionsImages: IImageActions = {
//   setUploadImage: (dispatch) => (payload: File[]) =>
//     dispatch({
//       type: uploadFileTypes.SET_UPLOAD_IMAGE,
//       payload: payload,
//     }),
//   setUploadImageProgress: (dispatch) => (id: number, progress: number) =>
//     dispatch({
//       type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
//       payload: {
//         id,
//         progress,
//       },
//     }),
//   successUploadImage: (dispatch) => (id: number) =>
//     dispatch({
//       type: uploadFileTypes.SUCCESS_UPLOAD_IMAGE,
//       payload: id,
//     }),
//   failureUploadImage: (dispatch) => (id: number) =>
//     dispatch({
//       type: uploadFileTypes.FAILURE_UPLOAD_IMAGE,
//       payload: id,
//     }),
//   uploadImage:
//     (dispatch) =>
//     (
//       files: FilePropsUpload[],
//       isUnmounted: boolean,
//       refs: { [key: string]: NodeJS.Timeout }
//     ) => {
//       if (files.length) {
//         files.forEach(async (file) => {
//           // const formPayload = new FormData();
//           // formPayload.append("file", file.file);
//           try {
//             // Demo loading
//             let loaded = 0;
//             const total = 100;
//             await new Promise((resolve, reject) => {
//               refs[file.id] = setInterval(() => {
//                 loaded += 2;
//                 const percentageProgress = Math.floor((loaded / total) * 100);
//                 if (isUnmounted) {
//                   clearInterval(refs[file.id]);
//                   return;
//                 }
//                 dispatch({
//                   type: uploadFileTypes.SET_UPLOAD_IMAGE_PROGRESS,
//                   payload: {
//                     id: file.id,
//                     progress: percentageProgress,
//                   },
//                 });
//                 if (loaded >= 100) {
//                   clearInterval(refs[file.id]);
//                   resolve(true);
//                 }
//               }, 200);
//             });

//             // Call api post method to get image url here!
//             // Add { cancelToken: ourRequest.token } to configs axios to use cancel method

//             dispatch({
//               type: uploadFileTypes.SUCCESS_UPLOAD_IMAGE,
//               payload: file.id,
//             });
//           } catch (error) {
//             dispatch({
//               type: uploadFileTypes.FAILURE_UPLOAD_IMAGE,
//               payload: file.id,
//             });
//           }
//         });
//       }
//     },
//   cancelUploadImage: (dispatch) => (file: FilePropsUpload) => {
//     if (file.progress !== 100) {
//       // This method to cancel axios post request upload;
//       // file.cancelTokenSource.cancel();
//     }

//     dispatch({
//       type: uploadFileTypes.CANCEL_UPLOAD_IMAGE,
//       payload: file.id,
//     });
//     return true;
//   },
// 	removeUploadedImage: (dispatch) => (file: FileProps) => {
//     dispatch({
//       type: uploadFileTypes.REMOVE_UPLOADED_IMAGE,
//       payload: file._id,
//     });
//     return true;
//   },
// };

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

const actionsFiles: IFileActions = {
  setUploadFile: (dispatch) => (payload: File[]) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_FILE,
      payload: payload,
    }),
  setUploadFileProgress: (dispatch) => (id: number, progress: number) =>
    dispatch({
      type: uploadFileTypes.SET_UPLOAD_FILE_PROGRESS,
      payload: {
        id,
        progress,
      },
    }),
  setIDFileUploaded: (dispatch) => (id: number, key: string) =>
    dispatch({
      type: uploadFileTypes.SET_ID_FILE_UPLOADED,
      payload: { id, key },
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
};

const uploadActions = {
  ...actionsImages,
	...actionsFiles
};

export default uploadActions;
