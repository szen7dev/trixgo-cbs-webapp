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

export type Assignee = {
  _id: string;
  image: string;
  fullname: string;
};

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
  name: string;
  expiredTime: string;
  typeStatus: number;
  checklist: string;
  description: string;
  lastLog?: LastLog;
  assignee: Assignee;
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
