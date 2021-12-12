import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";

export type FilePayload = {
  type: string;
  name: string;
  size: number;
  app?: string;
};

export type UploadPayload = {
  url: string;
  file: FormDataEntryValue
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
  userCreate: string,
  modifyAt: string,
  createAt: string,
}
