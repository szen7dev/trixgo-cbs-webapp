import axios, { CancelTokenSource } from "axios";
import { size } from "lodash";
import { v4 as uuid } from "uuid";

import { FileProp } from "typings/common";
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
  images?: Array<FileProp | { file: FileProp }>
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
  files: FileList | Blob[]
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

/**
 *
 * @param file
 * @param options the options to upload the file
 * @returns
 */
export function uploadImageWithProgressPromise(
  file: File,
  options?: {
    id?: number | string;
    timer?: Record<string | number, NodeJS.Timeout>;
    speed?: number; // in kB per second
    onUploadProgress?: (progress: number) => void;
    stepUpdate?: number; // milisecond
  }
): Promise<{ _id: string }> {
  return new Promise((resolve, reject) => {
    let _progress = 0;

    // milisecond
    const timeUpload =
      Math.floor((file.size / 1024 / (options?.speed || 1024)) * 1000) / 10;

    const percentage =
      Math.floor(((options?.stepUpdate || 300) / timeUpload) * 1000) / 100;

    const interval = setInterval(() => {
      _progress += percentage;
      options?.onUploadProgress?.(_progress);
      if (_progress >= 100) {
        clearInterval(interval);
        resolve({ _id: uuid() });
      }
    }, options?.stepUpdate || 300);
    if (options?.timer && options.id) {
      options.timer[options.id] = interval;
    }
  });
}
// Queue upload
export class QueueUpload<
  T extends Array<{
    key: string;
    promise: (...args: any[]) => Promise<any>;
  }>
> {
  private _queue: Array<{
    key: string;
    promise: (...args: any[]) => Promise<any>;
  }> = [];
  private _running: Record<string | number, () => void> = {};
  public isRunning = false;

  add(tasks: T): void {
    this._queue.push(...tasks);
  }

  run(): void {
    if (this._queue.length) {
      this.isRunning = true;
      const queue = this._queue.shift();
      if (queue) {
        const { key, promise } = queue;
        console.log("Runing queue id", key);
        const wrappedPromise = new Promise((resolve, reject) => {
          this._running[key] = reject;
          return promise().then(resolve).catch(reject);
        });
        wrappedPromise
          .then(() => {
            this.run();
          })
          .catch(() => {
            if (this._running[key]) {
              delete this._running[key];
            }
          });
      } else {
        this.run();
      }
    } else {
      this.isRunning = false;
      console.log("no more task");
    }
  }
  cancel(key: string): void {
    if (this._running[key]) {
      this._running[key]();
      delete this._running[key];
    } else if (this._queue.findIndex((item) => item.key === key) !== -1) {
      this._queue.splice(
        this._queue.findIndex((item) => item.key === key),
        1
      );
    }
    if (this._queue.length === 0) {
      this.isRunning = false;
    } else {
      this.run();
    }
  }
  abord(): void {
    Object.keys(this._running).forEach((key) => {
      this._running[key]();
    });
    this._running = {};
    this._queue = [];
    this.isRunning = false;
  }
}
