// import { FileProp } from "typings/common";

import { User } from "typings/user";

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface Subject {
  _id: string;
  amountLessions: number;
  amountViews: number;
  amountComments: number;
  amountStars: number;
  state: number;
  userCreate: string | User;
  userUpdate: string | User;
  type: number;
  name: string;
  description: string;
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson extends Subject {
  parent: string | Subject;
  amountUserViews: number;
  amountReaction: number;
  content: string;
}

// Type create subject body
export interface CreateSubjectBody {
  name: string;
  description: string;
  content?: string;
}

export type SubjectQueryParams = {
  subjectID?: string;
  parentID?: string;
};
