import { ReactNode } from "react";
import { APIResponse } from "./apis/response";
import { User } from "./user";

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

export type Company = {
  _id: string;
  name: string;
  sign: string;
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

export type CommentProps = {
  _id: string;
  media: {
    _id: string;
    author: User;
    createAt: string
  };
  content: string,
  files: FileProps[] | undefined;
  images: FileProps[] | undefined;
  author: User,
  amountCommentReply: number,
  amountReaction: number,
  parent: string;
  createAt: string,
  lastestReplyID: CommentProps;
}

export type CommentResponse = APIResponse & {
  data: {
    data: CommentProps;
    message: string;
    error: boolean;
  };
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
