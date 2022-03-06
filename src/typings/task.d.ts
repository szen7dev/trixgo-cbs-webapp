import { APIResponse } from "./apis/response";
import { User } from "typings/user";
import { Company } from "typings/common";

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

export type Group = {
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
  company: Company,
  group: Group,
  amountResponse: number;
  amountMarkedResponse: number;
};

export type ListTaskResponse = APIResponse & {
  data: {
    listRecords: Array<Task>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
    limit: number;
  };
};

export type AddRelationUserPayload = {
  taskID: string,
  related?: Array<string>;
};

/**
 * ============================ ************** ===============================
 * ============================ 	 CHECKLIST   ===============================
 * ============================ ************** ===============================
 */

export type CheckList = {
  _id: string;
  name: string;
  expiredTime: string;
  typeStatus: number;
  status: number;
  checklist: string;
  assignee: Assignee;
};

export type CheckListPayload = {
  parentID: string;
  name: string;
  type: number;
  assigneeID: string;
  expiredTime: string;
};

export type ListCheckListPayload = {
  isChecklist?: number;
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
    totalPage?: number;
    nextCursor: string;
    limit: number;
  };
};

/**
 * ============================ ************************** ===============================
 * ============================ 	 VIỆC CON (CHILD TASK)   ===============================
 * ============================ ************************** ===============================
 */

export type ListChildTaskResponse = APIResponse & {
  data: {
    listRecords: Array<ChildTask>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
    limit: number;
  };
};

export type ChildTask = {
  _id: string;
  name: string;
  expiredTime: string;
  typeStatus: number;
  status: number;
  assignee: Assignee;
};

export type ChildTaskPayload = {
  parentID: string;
  name: string;
  type: number;
  assigneeID: string;
  expiredTime: string;
};

export type ListChildTaskPayload = {
  isChildTask?: number;
  lastestID?: string;
  limit?: number;
  populates?: string;
  select?: string;
  type?: number;
  typeStatus?: number;
  isSortChildTask: number;
  parentID?: string;
};

export type ListChildTaskResponse = APIResponse & {
  data: {
    listRecords: Array<ChildTask>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
    limit: number;
  };
};

/**
 * ============================ *********************** ===============================
 * ============================ 	 PHẢN HỒI LIÊN QUAN   ===============================
 * ============================ *********************** ===============================
 */

export type ResponseProps = {
  _id: string,
  type: number,
  official: boolean,
  task: {
    _id: string,
    name: string
  },
  content: string,
  files: FileProps[] | undefined,
  images: FileProps[] | undefined,
  amountCommentReply: number,
  amountReaction: number,
  author: User,
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
  taskID?: string;
  lastestID?: string;
  limit?: number;
  official?: boolean;
  populates?: string;
  select?: string;
  sortKey?: string;
};

export type SearchResponsePayload = {
  taskID: string;
  commentID: string;
  select?: string;
  populates?: string;
};