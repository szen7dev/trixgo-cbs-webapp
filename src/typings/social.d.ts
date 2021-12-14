import { APIResponse } from "./apis/response";
import { CancelTokenSource } from "axios";

export type MediaPayload = {
  mediaID?: string,
  title: string;
  content: string;
  files?: Array<FileProps>,
  images?: Array<FileProps>,
  type: string;
};

export type PostResponse = APIResponse & {
  data: MediaProps,
  message: string,
};

export type infoMediaResponse = APIResponse & {
  data: MediaProps
};

export type PostFileProps = {
  files?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload): void;
};

export type PostImageProps = {
  images?: Array<FileProps | FilePropsUpload>;
  onRemove?(file: FileProps | FilePropsUpload): void;
};

export type FileProps = {
  _id: number | string;
  url: string;
  name: string;
  size: number;
  file?: {
    _id: number | string;
    url: string;
    name: string;
    size: number;
  }
};

export type ImageProps = {
  _id: number | string;
  url: string;
  name: string;
  size: number;
  file?: {
    _id: number | string;
    url: string;
    name: string;
    size: number;
  }
};

export type ListMediasPayload = {
  lastestID?: string;
  limit?: number;
  companyID?: string;
};

export type ListMediasResponse = APIResponse & {
  data: {
    listRecords: Array<any>;
    totalRecord: number;
    totalPages?: number;
  };
};

export type MediaProps = {
  _id: string,
  title: string,
  content: string,
  type: number,
  files: FileProps[] | undefined,
  images: FileProps[] | undefined,
  tagFriends: Array<{
    _id: string;
    fullname: string;
  }>;
  status: number,
  kind: number,
  state: number,
  author: {
    _id: string,
    image: string,
    company: Array<{
      _id: string,
      name: string
    }>,
    fullname: string
  },
  location: {
    type: string;
    _id: string;
    coordinates: [number, number];
  };
  company: {
    _id: string;
    name: string;
  };
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
};

export type FilePropsUpload = {
  _id: string;
  id: number;
  file: File;
  progress: number;
  cancelTokenSource: CancelTokenSource;
  proimise?: Interval;
};

interface ModalProps {
  show: boolean;
  toggle(): void;
  modalType?: 'create' | 'update';
  initialValues?: {
    mediaID?: string;
    title: string;
    content: string;
    type: string;
  };
  files?: FileProps[] | undefined;
  images?: FileProps[] | undefined;
}
