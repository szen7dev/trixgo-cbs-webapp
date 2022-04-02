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
  select?: string;
}

export enum DepartmentEnumType {
  DEPARTMENT = 1,
  PROJECT = 2,
}

export const DEPARTMENT_STATUS = {
  1: {
    1: { message: "Đúng tiến độ, đúng ngân sách", className: "bg-green-400" },
    2: { message: "Đúng tiến độ, vượt ngân sách", className: "bg-cbs-purple" },
  },
  2: {
    1: { message: "Chậm tiến độ, đúng ngân sách", className: "bg-cbs-schedule-nextweek" },
    2: { message: "Chậm tiến độ, vượt ngân sách", className: "bg-red-400" },
  },
};

export type DepartmentOnTimeKey = keyof typeof DEPARTMENT_STATUS;
export type DepartmentOnBudgetKey =
  keyof typeof DEPARTMENT_STATUS[keyof typeof DEPARTMENT_STATUS];

export * from "./Document.d";
