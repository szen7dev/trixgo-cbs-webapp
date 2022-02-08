import axios from "axios";
import { size } from "lodash";
import { FileProp } from "typings/social";
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
  files?: Array<FileProp | { file: FileProp }>,
  images?: Array<FileProp | { file: FileProp }>,
): ISTATE => {
  const fileUploaded: ISTATE = JSON.parse(JSON.stringify(initialState));
  if (files && files.length) {
    files.forEach((file) => {
      if ("file" in file) {
        fileUploaded.files[file.file._id] = file.file;
      } else {
        fileUploaded.files[file._id] = file;
      }
    });
  }
  if (images && images.length) {
    images.forEach((image) => {
      if ("file" in image) {
        fileUploaded.images[image.file._id] = image.file;
      } else {
        fileUploaded.images[image._id] = image;
      }
    });
  }
  return fileUploaded;
};

export const modifyUploadedFilesV2 = (
  {
    fileLastKey,
    imgLastKey,
  }: {
    fileLastKey: string | number | null;
    imgLastKey: string | number | null;
  },
  files: FileList|Blob[]
): [IFile, IFile] => {
  let currentFileIndex = 0;
  let currentImageIndex = 0;
  const imageToUpload: IFile = {};
  const fileToUpload: IFile = {};
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.toLowerCase().indexOf("image") !== -1) {
      currentImageIndex++;
      const id = Number(imgLastKey) + currentImageIndex;
      imageToUpload[id] = {
        id,
        file: files[i],
        progress: 0,
      };
    } else {
      currentFileIndex++;
      const id = Number(fileLastKey) + currentFileIndex;
      fileToUpload[id] = {
        id,
        file: files[i],
        progress: 0,
      };
    }
  }

  return [fileToUpload, imageToUpload];
};
