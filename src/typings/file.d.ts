import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";

export type FilePayload = Partial<File> & {
  type: string;
  name: string;
  size: string;
  app?: string;
};

export type UploadPayload = {
  signedUrl: string;
  file: File;
  progress?: (percentCompleted: number) => void
}

export type AddFileUploadResponse = {
  _id: string | undefined;
  name: string;
}

export type FileResponse = APIResponse & {
  data: {
    infoGenerateLink: {
      error: boolean;
      data: string
    },
    infoFileAfterInsert: FileProps
  }
};

export type FileProps = {
  _id: string;
  status: number;
  state: number;
  app: string;
  name: string,
  url: string,
  size: number,
  type: string,
  userCreate: string,
  modifyAt: string,
  createAt: string,
  nameOrg: string,
}
