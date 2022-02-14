import { DEPARTMENT_STATUS } from "helpers/constants/department";

export interface APIResponse {
  error?: boolean;
  status?: number;
}

export interface Populate {
  path?: string;
  select?: string;
  populate?: Populate;
}

export interface QueryParam {
  limit?: number;
  lastestID?: string;
  keyword?: string;
  populates?: Populate;
}

export enum DepartmentEnumType {
  DEPARTMENT = 1,
  PROJECT = 2,
}

export type DepartmentOnTimeKey = keyof typeof DEPARTMENT_STATUS;
export type DepartmentOnBudgetKey =
  keyof typeof DEPARTMENT_STATUS[keyof typeof DEPARTMENT_STATUS];

export * from "./Document.d";
