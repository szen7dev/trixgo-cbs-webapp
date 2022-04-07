import { ReactNode } from "react";
import { APIResponse } from "./apis/response";
import { User } from "./user";

/**
 * ============================ ********* ===============================
 * ============================ 	 FILE   ===============================
 * ============================ ********* ===============================
 */

interface FileProp {
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
  mimeType?: string;
  author: User;
  createAt: string;
  description: string;
}

export type FileProps = {
	file?: FileProp
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
  mimeType?: string;
  author: User;
  createAt: string;
  description: string;
};

export type ImageProps = {
  file?: FileProp
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
  mimeType?: string;
  author?: User;
  createAt?: string;
  description?: string;
};

export type FilePropsUpload = {
  _id: string;
  id: number;
  file: File | FileProps;
  progress: number;
  cancelTokenSource: CancelTokenSource;
  proimise?: Interval;
};

export type PostFileProps = {
  files?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
};

export type PostImageProps = {
  images?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
};

/**
 * ============================ ************ ===============================
 * ============================ 	 COMMENT   ===============================
 * ============================ ************ ===============================
 */

export type Comment = CommentProps;

export type CommentResponse = APIResponse & {
  data: CommentProps;
  message: string;
  error: boolean;
};

export type ListCommentResponse = APIResponse & {
  data: {
    listRecords: CommentProps[],
    limit: number,
    totalRecord: number,
    nextCursor: string
  };
  message: string;
};

/**
 * ============================ ********** ===============================
 * ============================ 	 OTHER   ===============================
 * ============================ ********** ===============================
 */

export type QueryParams = {
  limit?: number;
  lastestID?: string;
  keyword?: string;
  select?: string;
  populates?: Populate;
}

export type Company = {
  _id: string;
  name: string;
  sign: string;
}

export type Department = {
  _id: string;
  name: string;
  sign: string;
}

export type Position = {
  _id: string;
  name: string;
  sign: string;
}

export type Locale = {
  id: string;
  code: string;
  name: string;
  flag: ReactNode;
  grayFlag: ReactNode;
};

export type NavLink = {
  id: string;
  label: string;
  url: string;
  pathname: string;
  icon: ReactNode;
};

export type TaskManagementNavLink = {
  title: string;
  navLink: NavLink[];
};

export type NavLinkAccounting = {
  id: string;
  label: string;
  url: string;
  pathname: string;
  icon?: ReactNode;
}

export type NavLinkTaskDashboard = {
  id: string;
  label: string;
  url: string;
  pathname: string;
  icon?: ReactNode;
}

declare global {
  interface Date {
      addHours: (h: number) => this;
      addMinutes: (m: number) => this;
      addDays: (d: number) => this;
  }
}