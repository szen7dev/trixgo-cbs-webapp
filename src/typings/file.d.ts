import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";

export type FilePayload = {
  type: string;
  name: string;
  size: string;
  app?: string;
} & Partial<File>;

export type UploadPayload = {
  signedUrl: string;
  file: FilePayload;
  progress?: (percentCompleted: number) => void
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
}
