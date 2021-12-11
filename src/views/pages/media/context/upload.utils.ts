import axios from "axios";
import { size } from "lodash";
import { IFile } from "./upload";

export const modifyFiles = (existingFiles: IFile, files: File[]): IFile => {
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
				cancelTokenSource
      },
    };
  }

  return fileToUpload;
};
