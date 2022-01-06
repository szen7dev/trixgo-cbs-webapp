export type Project = {
  _id: string;
  name: string;
  image: string;
  sign: string;
};

export type Author = {
  _id: string;
  image: string;
  fullname: string;
};

export type Group = {
  _id: string;
  name: string;
  author: Author;
  sign: string;
};

export type Author2 = {
  _id: string;
  image: string;
  fullname: string;
};

export type Assignee = {
  _id: string;
  image: string;
  fullname: string;
};

export type SearchListRecord = {
  _id: string;
  actualFinishTime: Date;
  project: Project;
  group: Group;
  author: Author2;
  name: string;
  description: string;
  assignee: Assignee;
  amountChecklist: number;
  amountFinishChecklist: number;
};

export type Data = {
  listRecords: SearchListRecord[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string;
};

export type SearchResultResponse = {
  error: boolean;
  data: Data;
  status: number;
};

export type SearchPayload = {
  keyword?: string;
  lastestID?: string;
  select?: string;
  populates?: string;
};