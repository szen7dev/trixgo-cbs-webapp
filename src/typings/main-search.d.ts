import { Task } from "./task";
import { User } from "./user";

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
  author: User;
  sign: string;
};

export type Assignee = {
  _id: string;
  image: string;
  fullname: string;
};

export type SearchListRecord = Task;
// {
//   _id: string;
//   actualFinishTime: Date;
//   project: Project;
//   group: Group;
//   author: User;
//   name: string;
//   description: string;
//   assignee: User;
//   amountChecklist: number;
//   amountFinishChecklist: number;
// };

export type Data = {
  listRecords: SearchListRecord[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
};

export type SearchResultResponse = {
  error: boolean;
  data: Data;
  status: number;
};

export type SearchPayload = {
  keyword?: string;
  limit?: number;
  lastestID?: string;
  select?: string;
  populates?: string;
};