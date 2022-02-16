export interface APIResponse {
    error?: boolean;
    status?: number;
}

export interface Populate {
    path?: string;
    select?: string;
    populate?: Populate
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

export * from './Document.d';
