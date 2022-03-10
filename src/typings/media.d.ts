import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";
import type { User } from 'typings/user';
import type { FileProps } from 'typings/common';

/**
 * ============================ ********** ===============================
 * ============================ 	 MEDIA   ===============================
 * ============================ ********** ===============================
 */

export type PostType = 
  | 'company'
  | 'department'
  | 'digital-conversion'
  | 'system'
  | 'just-me'

export type MediaPayload = {
  mediaID?: string;
  companyID?: string;
  departmentID?: string;
  otherID?: string;
  title: string;
  content: string;
  files?: Array<FileProps>;
  images?: Array<FileProps>;
  type: string;
};

export type ListMediasPayload = {
  lastestID?: string;
  limit?: number;
  type?: string;
  keyword?: string;
  isRelated?: boolean;
  mediaID?: string;
  companyID?: string;
  departmentID?: string;
  otherID?: string;
  parentID?: string;
  select?: string;
  populates?: string;
};

export type FetchMediaPayload = {
  isFetchMedias?: boolean;
  isFetchReactions?: boolean;
  isFetchSeens?: boolean;
}

export type MediaProps = {
  _id: string;
  title: string;
  content: string;
  type: number;
  files: FileProps[] | undefined;
  images: FileProps[] | undefined;
  tagFriends: Array<{
    _id: string;
    fullname: string;
  }>;
  status: number;
  kind: number;
  state: number;
  author: User;
  location: {
    type: string;
    _id: string;
    coordinates: [number, number];
  };
  company: {
    _id: string;
    name: string;
    sign: string;
  };
  department: {
    _id: string;
    name: string;
    sign: string;
    members: string[];
  };
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
  receivers?: string[],
  amountReaction?: number,
  amountComment?: number,
  amountView?: number,
};

export type MediaInfoResponse = APIResponse & {
  data: MediaProps;
  message: string;
};

export type ListMediaResponse = APIResponse & {
  data: {
    listRecords: Array<any>;
    totalRecord: number;
    totalPages?: number;
  };
};

// export type FilePropsUpload = {
//   _id: string;
//   id: number;
//   file: File | FileProps;
//   progress: number;
//   cancelTokenSource: CancelTokenSource;
//   proimise?: Interval;
// };

// export type PostFileProps = {
//   files?: Array<FileProps | FilePropsUpload>;
//   onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
// };

// export type PostImageProps = {
//   images?: Array<FileProps | FilePropsUpload>;
//   onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
// };

// interface FileProp {
//   _id: number | string;
//   path: string;
//   name: string;
//   nameOrg: string;
//   size: number;
//   type: string;
// }

// export type FileProps = {
// 	file?: FileProp
//   _id: number | string;
//   path: string;
//   name: string;
//   nameOrg: string;
//   size: number;
//   type: string;
// };

// export type ImageProps = {
//   file?: FileProp
//   _id: number | string;
//   path: string;
//   name: string;
//   nameOrg: string;
//   size: number;
//   type: string;
// };

/**
 * ============================ ******************* ===============================
 * ============================ 	 REACTION, SEEN   ===============================
 * ============================ ******************* ===============================
 */

export type MediaReactionPayload = {
  mediaID: string;
  typeReaction?: number;
};

export type ReactionProps = {
  _id: number | string;
  reaction: {
    type: number
  };
  userCreate: {
    _id: string,
    fullname: string,
    bizfullname: string,
    image: string
  };
};

export type ListSeenPayload = {
  lastestID?: string;
  limit?: number;
  mediaID?: string;
  select?: string;
  populates?: string;
};

export type ListReactionPayload = {
  lastestID?: string;
  limit?: number;
  mediaID?: string;
  select?: string;
  populates?: string;
};

/**
 * ============================ ************ ===============================
 * ============================ 	 COMMENT   ===============================
 * ============================ ************ ===============================
 */

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
  receivers?: string[]
}

export type ListCommentsPayload = {
  lastestID?: string;
  limit?: number;
  mediaID?: string;
  companyID?: string;
  parentID?: string;
  select?: string;
  populates?: string;
};

export type CommentPayload = {
  mediaID: string;
  commentID?: string;
  parentID?: string;
  content: string;
  files?: string[];
  images?: string[];
};

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
interface ModalProps {
  show: boolean;
  toggle(): void;
  modalType?: "create" | "update";
  initialValues?: {
    mediaID?: string;
    title: string;
    content: string;
    type: string;
  };
  files?: FileProps[] | undefined;
  images?: FileProps[] | undefined;
}