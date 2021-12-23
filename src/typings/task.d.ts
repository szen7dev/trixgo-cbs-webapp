import { APIResponse } from "./apis/response";

export type ListTaskPayload = {
  lastestID?: string;
  limit?: number;
  populates?: string;
  populates1?: string;
  filter?: string;
  type?: numer;
  typeStatus?: number;
};

export type User = {
  _id: string;
  image: string;
  fullname: string;
};

export type Assignee = User;
export type Author = User;

export type LastLog = {
  _id: string;
  content: string;
  createAt: string;
  author: {
    _id: string;
    fullname: string;
  };
};

export type Task = {
  _id: string;
  name: string;
  expiredTime: string;
  typeStatus: number;
  checklist: string;
  description: string;
  lastLog?: LastLog;
  assignee: Assignee;
  percentage: number;
};

export type ListTaskResponse = APIResponse & {
  data: {
    listRecords: Array<Task>;
    totalRecord: number;
    totalPages?: number;
    nextCursor: string;
    limit: number;
  };
};

export type CheckList = {
  _id: string;
  name: string;
  expiredTime: string;
  typeStatus: number;
  checklist: string;
  assignee: Assignee;
};

export type ListCheckListPayload = {
  lastestID?: string;
  limit?: number;
  populates?: string;
  filter?: string;
  type?: numer;
  typeStatus?: number;
  parentID?: string;
};

export type ListCheckListResponse = APIResponse & {
  data: {
    listRecords: Array<CheckList>;
    totalRecord: number;
    totalPages?: number;
    nextCursor: string;
    limit: number;
  };
};
