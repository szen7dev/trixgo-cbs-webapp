import { APIResponse } from "./apis/response";
import { User } from "typings/user";
import type { Company, FileProps, QueryParams, Populate } from "typings/common";
import { Contract } from "./cmcs";

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
  address: string;
  company: string | Company,
  startTime: string
};

export type Group = {
  _id: string;
  name: string;
  sign: string;
  members: User[];
};

export type Field = {
  _id: string;
  name: string;
  type: string;
  description: string;
};

export type Task = {
  _id: string;
  name: string;
  sign: string;
  status: number;
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
  contract: Contract,
  field: Field,
  startTime: string,
  subType: number,
  type: number,
  related: Array<User>;
  signatures: Array<{
    _id: string;
    author: User;
    createAt: string
  }>;
  actualStartTime: string;
  actualFinishTime: string;
  amountResponse: number;
  amountMarkedResponse: number;
  amountChecklist: number;
  amountComment: number;
  amountFinishedChecklist: number;
  createAt: string
  author: Author,
};

export interface addTaskPayload {
  name: string;
  description: string;
  projectID: string;
  fieldID: string;
  groupID: string;
  assigneeID: string;
  subType: number;
  type: number;
  startTime: string;
  expiredTime: string;
  relatedIDs: string[];
  authorAttachs: string[];
}

export interface updateTaskPayload {
  taskID: string;
  contractID?: string;
  name?: string;
  status?: number;
  priority?: number;
  draft?: number;
  milestone?: number;
  actualFinishTime?: string;
  isAddSignature?: boolean;
  flags?: Array<string>;
  flagsRemoves?: Array<string>;
  authorAttachs?: Array<string>;
  assigneeAttachs?: Array<string>;
}

export interface addTaskResponse {
  error: boolean;
  data: Data;
  status: number;
  message: string;
}

export type TaskListParams = QueryParams & {
  keyword?: string;
  typeStatus?: string;
  statusNe?: string;
  groupID?: string;
  companyOfAssignee?: string;
  isPassPermision?: string;
  projectID?: string;
  milestone?: string;
  type?: number;
  status?: string;
  sortKey?: string;
}

export type TaskInfoParams = {
  taskID?: string;
  select?: string;
  populates?: Populate | string;
}

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
  taskID: string;
  related?: Array<string>;
};

export type CopyTaskPayload = {
  taskID: string;
};

export type MoveTaskToParentPayload = {
  parentID: string;
  taskID: string;
};

export type MoveTaskToGroupPayload = {
  groupID: string;
  taskID: string;
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
  type: number;
  parent: string;
  checklist: string;
  assignee: Assignee;
  actualFinishTime: string;
};

export type CheckListPayload = {
  parentID: string;
  name: string;
  type: number;
  assigneeID: string;
  expiredTime: string;
};

export type UpdateStatusCheckListPayload = {
  checklistID: string,
  status: number,
}

export type UpdateCheckListPayload = {
  checklistID: string,
  name: string;
  assigneeID: string;
  expiredTime: string;
}

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
  type: number;
  parent: string;
  status: number;
  assignee: Assignee;
  actualFinishTime: string;
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
  project: Project | string,
  content: string,
  files: FileProps[] | undefined,
  images: FileProps[] | undefined,
  amountCommentReply: number,
  amountReaction: number,
  author: User,
  createAt: string
}

export type ResponsePayload = {
  taskID?: string,
  projectID?: string;
  type: number;
  switchType?: string;
  content: string;
  files?: Array<string>;
  images?: Array<string>;
};

export type UpdateResponsePayload = {
  taskID?: string;
  projectID?: string;
  switchType?: string;
  commentID: string;
  files?: string[];
  images?: string[];
};

export type ResponseResponse = APIResponse & {
  data: {
    result: ResponseProps,
    receivers: Array<string>,
  };
};

export type ListResponsePayload = {
  taskID?: string;
  projectID?: string;
  lastestID?: string;
  switchType?: 'TASK' | 'PROJECT';
  isGetReaction?: boolean;
  limit?: number;
  official?: boolean;
  populates?: string;
  select?: string;
  sortKey?: string;
};

export type SearchResponsePayload = {
  taskID?: string;
  switchType?: 'TASK' | 'PROJECT',
  projectID?: string;
  commentID: string;
  select?: string;
  populates?: string;
};

/**
 * ============================ ****************** ===============================
 * ============================ 	 BÌNH LUẬN PCM   ===============================
 * ============================ ****************** ===============================
 */

export type Comment = CommentProps;

export type ListCommentsPayload = {
  lastestID?: string;
  type?: number;
  limit?: number;
  taskID?: string;
  companyID?: string;
  contractID?: string;
  parentID?: string;
  isHaveImage?: boolean;
  select?: string;
  populates?: string;
};

export type CommentPayload = {
  taskID: string;
  commentID?: string;
  parentID?: string;
  type: number;
  content: string;
  files?: string[];
  images?: string[];
};

export type CommentProps = {
  _id: string;
  task: {
    _id: string;
    name: string;
    author: User;
    createAt: string;
    company: string;
    project: string;
    group: string;
  };
  type: number;
  content: string;
  files: FileProps[] | undefined;
  images: FileProps[] | undefined;
  author: User;
  amountCommentReply: number;
  amountReaction: number;
  parent: string;
  createAt: string;
  lastestReplyID: CommentProps;
  reaction?: {
    type: number
  };
}

export type CommentResponse = APIResponse & {
  data: {
    data: CommentProps;
    message: string;
    error: boolean;
  };
};

/**
 * ============================ *************************** ===============================
 * ============================ 	 REACTION BÌNH LUẬN PCM   ===============================
 * ============================ *************************** ===============================
 */

export type ReactionCommentPayload = {
  commentID: string,
  typeReaction?: number
}

export type ListReactionPayload = {
  lastestID?: string;
  type?: number;
  limit?: number;
  commentID?: string;
  select?: string;
  populates?: string;
  isGetTotal?: string;
};

export type ReactionCommentProps = {
  _id: string;
  comment: string;
  type: number;
  author: User;
}