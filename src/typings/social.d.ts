import { APIResponse } from "./apis/response";

export type PostPayload = {
  title: string;
  content: string;
  files: Array<File>;
  images: Array<File>;
  type: string;
};

export type PostFileProps = {
  files?: Array<File | FileProps>;
  onRemove?(index: number): void;
};
export type PostImageProps = {
  images?: Array<File>;
  onRemove(index: number): void;
};

export type FileProps = {
  id: number | string;
  url: string;
  name: string;
  size: number;
};

export type ImageProps = {
  id: number | string;
  url: string;
  name: string;
  size: number;
};

export type ListMediasPayload = {
  lastestID?: string;
};

export type ListMediasResponse = APIResponse & {
  data: {
    listRecords: Array<any>
  }
};

export type MediaProps = {
  _id: string,
  content: string,
  type: number,
  files: Array<{
    _id: string,
    name: string,
    size: string,
    url: string
  }>,
  tagFriends: Array<{
    _id: string,
    fullname: string
  }>,
  images: Array<{
    _id: string,
    name: string,
    size: string,
    url: string
  }>,
  status: number,
  kind: number,
  state: number,
  author: Array<{
    _id: string,
    image: string,
    company: Array<{
      _id: string,
      name: string
    }>,
    fullname: string
  }>,
  location: {
    type: string,
    _id: string,
    coordinates: [
      number,
      number
    ]
  },
  company: {
    _id: string,
    name: string
  },
  modifyAt: string,
  createAt: string,
  createdAt: string,
  updatedAt: string,
};