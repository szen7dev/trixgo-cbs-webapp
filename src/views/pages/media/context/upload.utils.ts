import axios from "axios";
import { size } from "lodash";
import { FileProps } from "typings/social";
import { IFile, ISTATE } from "./upload";

export const modifyFiles = (existingFiles: IFile, files: FileList): IFile => {
  let fileToUpload = {};
  for (let i = 0; i < files.length; i++) {
    const cancelTokenSource = axios.CancelToken.source();
    const id = size(existingFiles) + i + 1;
    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        progress: 0,
        cancelTokenSource,
      },
    };
  }

  return fileToUpload;
};

export const modifyUploadedFiles = (
  initialState: ISTATE,
  files?: FileProps[],
  images?: FileProps[]
): ISTATE => {
  const fileUploaded: ISTATE =JSON.parse(JSON.stringify(initialState));
  if (files?.length) {
    for (let i = 0; i < files.length; i++) {
      fileUploaded.files[files[i]._id] = files[i];
    }
  }
  if (images?.length) {
    for (let i = 0; i < images.length; i++) {
      fileUploaded.images[images[i]._id] = images[i];
    }
  }
  return fileUploaded;
};
