import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";

export type PostType = 
  | 'company'
  | 'department'
  | 'digital-conversion'
  | 'system'
  | 'just-me'

// Định nghĩa các kiểu dữ liệu
export type MediaPayload = {
  mediaID?: string;
  companyID?: string;
  departmentID?: string;
  title: string;
  content: string;
  files?: Array<FileProps>;
  images?: Array<FileProps>;
  type: string;
};

export type MediaReactionPayload = {
  mediaID: string;
  typeReaction?: number;
};

export type PostResponse = APIResponse & {
  data: MediaProps;
  message: string;
};

export type infoMediaResponse = APIResponse & {
  data: MediaProps;
};

export type PostFileProps = {
  files?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
};

export type PostImageProps = {
  images?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload, type: 'IMAGE' | 'FILE'): void;
};

interface FileProp {
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
}

export type FileProps = {
	file?: FileProp
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
};

export type ImageProps = {
  file?: FileProp
  _id: number | string;
  path: string;
  name: string;
  nameOrg: string;
  size: number;
  type: string;
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

export type ListMediasPayload = {
  lastestID?: string;
  limit?: number;
  type?: string;
  isRelated?: boolean;
  mediaID?: string;
  companyID?: string;
  parentID?: string;
  filter?: string;
  select?: string;
  populates?: string;
};

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
  author: {
    _id: string;
    image: string;
    company: Array<{
      _id: string;
      name: string;
    }>;
    fullname: string;
    department: {
      name: string,
      sign: string
    };
    position: {
      _id: string,
      name: string,
    };
  };
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
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
  receivers?: string[],
  amountReaction?: number,
  amountComment?: number,
  amountView?: number,
};

export type FilePropsUpload = {
  _id: string;
  id: number;
  file: File | FileProps;
  progress: number;
  cancelTokenSource: CancelTokenSource;
  proimise?: Interval;
};

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

export type ListCommentsPayload = {
  key?: string,
  lastestID?: string;
  limit?: number;
  mediaID?: string;
  companyID?: string;
  parentID?: string;
  filter?: string;
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

export type ListResponse = APIResponse & {
  data: {
    listRecords: Array<any>;
    totalRecord: number;
    totalPages?: number;
  };
};
