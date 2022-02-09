import { APIResponse } from "./apis/response";
import { User } from "typings/user";

export type ListTaskPayload = {
  lastestID?: string;
  limit?: number;
  populates?: string;
  select?: string;
  type?: numer;
  typeStatus?: number;
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

export type Project = {
  _id: string;
  name: string;
  sign: string;
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
  project: Project;
  amountResponse: number;
  amountResponseMarked: number;
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

export type CheckListPayload = {
  taskID?: string;
  name: string;
  description: string;
  expiredTime: string;
  type: number;
  assignee: string;
};

export type ListCheckListPayload = {
  lastestID?: string;
  limit?: number;
  populates?: string;
  select?: string;
  type?: number;
  typeStatus?: number;
  isSortChecklist: number;
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

export type ResponseProps = {
  _id: string,
  type: number,
  isMarked: boolean,
  task: string,
  comment: {
    content: string,
    files: FileProps[] | undefined,
    images: FileProps[] | undefined,
    author: User,
  },
  userCreate: User,
  createAt: string
}

export type ResponsePayload = {
  taskID: string,
  type: number;
  content: string;
  files?: Array<string>;
  images?: Array<string>;
};

export type ResponseResponse = APIResponse & {
  data: {
    result: ResponseProps,
    receivers: Array<string>,
  };
};

export type ListResponsePayload = {
  lastestID?: string;
  limit?: number;
  isMarked?: boolean;
  populates?: string;
  select?: string;
  taskID?: string;
};

export type SearchResponsePayload = {
  taskID: string;
  commentID: string;
  select?: string;
  populates?: string;
};