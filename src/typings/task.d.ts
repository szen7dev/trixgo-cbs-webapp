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
  startTime: string,
  admins: any[]
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
  priority: number;
  risk: number;
  draft: number;
  alert: number;
  expiredTime: string;
  typeStatus: number;
  checklist: string;
  description: string;
  lastLog?: LastLog;
  assignee: Assignee;
  percentage: number;
  milestone: number;
  unit: string;
  unitPrice: number;
  quantity: number;
  amountoftime: number;
  ontime: number;
  quality: number;
  judgement: string;
  project: Project;
  company: Company,
  group: Group,
  contract: Contract,
  field: Field,
  parent: Task | undefined,
  links: Task[],
  startTime: string,
  subType: number,
  subtype: number,
  type: number,
  related: Array<User>;
  viewedUsers: Array<User>;
  signatures: Array<{
    _id: string;
    author: User;
    createAt: string
  }>;
  flags?: Array<string>;
  authorAttachs: Array<FileProps>;
  assigneeAttachs: Array<FileProps>;
  accessUsers: Array<User>;
  openedUsers: Array<User>;
  linksDocs: Array<string>;
  openedStatus: number;
  actualStartTime: string;
  actualFinishTime: string;
  amountResponse: number;
  amountMarkedResponse: number;
  amountChecklist: number;
  amountFinishedChecklist: number;
  amountComment: number;
  amountCurrentStatus: number;
  amountSolution: number;
  amountCurrentStatus: number;
  amountResponseOther: number;
  createAt: string;
  modifyAt: string;
  author: Author;
  message?: string;
  timeImportExcel?: string;
  keyError?: string;
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
  isNotiEmail: boolean;
}

export interface updateTaskPayload {
  taskID: string;
  description?: string;
  contractID?: string;
  groupID?: string;
  assigneeID?: string;
  name?: string;
  status?: number;
  priority?: number;
  ontime?: number;
  subType?: number;
  quality?: number;
  judgement?: string;
  unit?: string;
  unitPrice?: number;
  quantity?: number;
  amountoftime?: number;
  draft?: number;
  milestone?: number;
  actualStartTime?: string;
  actualFinishTime?: string;
  expiredHour?: string;
  alert?: string | number;
  milestone?: number;
  isAddSignature?: boolean;
  isOpenBidding?: boolean;
  relatedRemoves?: Array<string>;
  flags?: Array<string>;
  flagsRemoves?: Array<string>;
  authorAttachs?: Array<string>;
  assigneeAttachs?: Array<string>;
  tasksLink?: Array<string>;
  linksDocs?: Array<string>;
  isUpdateNews?: boolean;
}

export interface updateStatusMultiplePayload {
  taskIDs: string[];
  parentID?: string;
  type?: number;
  option?: number;
}

export interface addTaskResponse {
  error: boolean;
  data: Data;
  status: number;
  message: string;
}

// Khai báo kiểu dữ liệu đầu vào của Getlist mà client cần truyền lên
export type TaskListParams = QueryParams & {
  keyword?: string;
  typeStatus?: string;
  statusNe?: string;
  groupID?: string;
  companyOfAssignee?: string;
  companyOfAuthor?: string;
  isPassPermision?: string;
  projectID?: string;
  parentID?: string;
  milestone?: string;
  type?: number;
  status?: string;
  sortKey?: string;
  subtype?: string;
  unlimit?: string;
  isParent?: string;
  isSortChildTask?: string;
  draft?: string;
  isActive?: string;
  isGroup?: string;
  read?: string;
  collection?: number;
}

export type TaskInfoParams = {
  taskID?: string;
  select?: string;
  populates?: Populate | string;
}

// Khai báo kiểu dữ liệu trả về của Data
export type ListTaskResponse = APIResponse & {
  data: {
    listRecords: Array<Task>;
    totalTaskDone?: number;
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
  name: string;
  description: string;
  projectID: string;
  groupID: string;
  fieldID: string;
  assigneeID: string;
  subtype: number;
  type: number;
  startTime: string;
  expiredHour?: string;
  expiredTime: string;
  relatedIDs: string[];
  authorAttachs: string[];
  isCloneChildTask: boolean;
  isDraftTask: boolean;
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
  official?: boolean;
  select?: string;
  populates?: string;
};

export type CommentPayload = {
  taskID: string;
  commentID?: string;
  parentID?: string;
  type: number;
  content: string;
  rawContent?: string;
  files?: string[];
  images?: string[];
  isOfficial?: boolean;
  receiversID?: string[];
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
  official: boolean;
  files: FileProps[] | undefined;
  images: FileProps[] | undefined;
  author: User;
  receivers?: User[];
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