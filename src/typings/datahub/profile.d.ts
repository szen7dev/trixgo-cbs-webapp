import { User } from "typings/user";

export type DatahubProfileBase = {
  files: any[];
  state: number;
  _id: string;
  company: string;
  name: string;
  userCreate: string | User;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  updatedAt: DateString;
};

export type DatahubProfile<T = keyof DatahubProfileBase> = Pick<DatahubProfileBase, T>;

export type DatahubProfileBody = {
  company: string;
  name: string;
};

export type DatahubProfileUpdate = {
  datahubProfileID: string;
  name?: string;
  files?: Array<string>;
};
