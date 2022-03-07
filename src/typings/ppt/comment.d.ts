import { APIResponse } from "typings/apis/response";
import type { CommentProps, FileProps } from "typings/common";
import type { User } from "typings/user";

export type CommentDetail = {
  _id: string;
  content: string;
  files: FileProps[] | undefined;
  images: FileProps[] | undefined;
  author?: User;
  amountCommentReply: number;
  amountReaction: number;
  typeReactions?: number[];
  createAt: string;
};

export type Comment = CommentProps;

export type CommentWithReply = Comment & {
  listReply: { data: Comment[]; nextCursor?: string | null };
};

export type CommentBody = {
  mediaID: string; // *required
  content: string; // *required
  fileID?: string; // *required

  parentID?: string;
  files?: string[];
  images?: string[];
};

export type CommentPayload = {
  mediaID: string;
  commentID?: string;
  parentID?: string;
  content: string;
  files?: string[];
  images?: string[];
};

export type ListCommentResponse = APIResponse & {
  data: {
    listRecords: Comment[];
    limit: number;
    totalRecord: number;
    nextCursor: string;
  };
  message: string;
};

export type ListCommentResponse2 = APIResponse & {
  data: {
    listRecords: CommentWithReply[];
    limit: number;
    totalRecord: number;
    nextCursor: string;
  };
  message: string;
};

// ========= RESPONSE =========
export type Response<T> = {
  error: boolean;
  data: T;
  status: number;
  message?: string;
  code?: number;
};

export type ListRecord<T> = {
  listRecords: T[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: null | string;
};
