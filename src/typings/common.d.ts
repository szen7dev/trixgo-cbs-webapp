import { ReactNode } from "react";
import { APIResponse } from "./apis/response";

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

export type CommentProps = {
  _id: string;
  media: string;
  comment: {
    content: string,
    files: FileProps[] | undefined;
    images: FileProps[] | undefined;
    author: {
      _id: string;
      image: string;
      fullname: string;
    },
    amountCommentReply: number,
    amountReaction: number,
    typeReactions: number[],
  };
  parent: string;
  userCreate: {
    _id: string;
    image: string;
    fullname: string;
  };
  createAt: string,
  lastestReplyID: CommentProps;
}

export type CommentResponse = APIResponse & {
  data: CommentProps;
  message: string;
};

export type ListCommentResponse = APIResponse & {
  data: CommentProps[];
  message: string;
};