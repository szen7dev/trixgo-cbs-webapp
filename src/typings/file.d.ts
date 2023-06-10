import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";
import { User } from "./user";

export type GenerateLinkPayload = {
  appID?: string;
  companyID?: string;
  projectID?: string;
  groupID?: string;
  packageID?: string;
  conversationID?: string;
  taskID?: string;
  typeUpload?: string;
  type?: number;
  mimeType?: string;
  name?: string;
  size?: string;
}

export type FilePayload = Partial<File> & {
  mimeType: string;
  name: string;
  size: string;
  type: string;
}

export type FileUpdatePayload = {
  fileID: string,
  status?: number,
  description?: string
}

export type UploadPayload = {
  signedUrl: string;
  file: File;
  progress?: (percentCompleted: number, _id?: string) => void;
  source?: any;
  _id?: string
}

export type AddFileUploadResponse = {
  _id?: string | undefined;
  name?: string | undefined;
  nameOrg?: string | undefined;
  path?: string | undefined;
  mimeType?: string | undefined;
  createAt?: string | undefined;
  error: boolean;
}

export type FileResponse = APIResponse & {
  data: {
    infoGenerateLink: {
      error: boolean;
      data: string;
      fileName: string;
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
	path:	string,
  size: number,
  type: string,
  mimeType: string,
  userCreate: string,
  modifyAt: string,
  createAt: string,
  nameOrg: string,
}
