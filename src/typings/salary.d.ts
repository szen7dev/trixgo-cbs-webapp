import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Project } from "./items/project";


export type SalaryParent = {
    _id: string;
    type: 1;
    official: 1;
    status: number;
    timeApproved: string | null;
    author: User;
    admins: User[];
    members: User[];
    userCreate: User;
    userUpdate: User;
    state: 1;
    name: string;
    human: User;
    project: Project;
    note: string;
    date: string;
    createAt: string;
    modifyAt: string;
    salary: number;
    onLeaveSalary: number;
    overtimeSalary: number;
    reward: number;
    punishment: number;
    advance: number;
    remaining: number;
    paid: number;
    revenueBonus: number;
    mealAllowance: number;
    insurance: number;
    pitax: number;
    convertFactor: number;
    status: number;
    union: number;
    share: number;
    other: number;
    numberOfHuman: number;
    files: any;
}

export type ListSalaryPayload = QueryParams & {
    expertSalaryID?: string;
};

// time sheet parent
export type QuerySalaryParentResponse = APIResponse & {
    data: {
        listRecords: SalaryParent[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type QueryDetailSalaryParentResponse = APIResponse & {
    data: SalaryParent;
}

export type InsertSalaryParentPayload = {
    name: string;
    human: User;
    type: 1;
    project: Project;
    note: string;
}

export type InsertSalaryParentResponse = {
    error: boolean;
    data: SalaryParent & {
        human: string;
        project: string;
        message?: string;
    }
}

export type UpdateSalaryParentPayload = {
    expertSalaryID: string;
    filesID?: string[];
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
}

export type UpdateSalaryParentResponse = InsertSalaryParentResponse;

export type DeleteSalaryParentPayload = {
    expertSalaryID: string;
}

export type DeleteSalaryParentResponse = APIResponse & {
    data: SalaryParent & {
        human: string;
        project: string;
    }
}

export type SalaryChild = {
    _id: string;
    type: 1;
    status: number;
    hours1: number;
    hours2: number;
    hours3: number;
    hours4: number;
    timeApproved: string | null;
    state: 1;
    name: string;
    date: string;
    parent?: SalaryParent;
    human?: User;
    work: strinstring | null;
    note?: string;
    salary: number;
    onLeaveSalary: number;
    overtimeSalary: number;
    reward: number;
    punishment: number;
    advance: number;
    remaining: number;
    paid: number;
    revenueBonus: number;
    mealAllowance: number;
    insurance: number;
    pitax: number;
    union: number;
    share: number;
    other: number;
    kpiFactor: number;
    convertFactor: number;
    status: number;
    project: any;
    position: any;
    userCreate: any;
    userUpdate: any;
    createAt: any;
    modifyAt: any;
    funda: any;
    subAllowance1: number;
    subAllowance2: number;
    subAllowance3: number;
    subAllowance4: number;
    subAllowance5: number;
    subAllowance6: number;
    subAllowance7: number;
    subAllowance8: number;
    subAllowance9: number;
    subAllowance10: number;
    subAllowance11: number;
    subAllowance12: number;
    subAllowance13: number;
    subAllowance14: number;
    subAllowance15: number;
    subAllowance16: number;
    subAllowance17: number;
    subAllowance18: number;
    subAllowance19: number;
    subAllowance20: number;
    subAllowance21: number;
    subAllowance22: number;
    nowds: number;
    nowdsos: number;
}

export type QueryListSalaryChildPayload = QueryParams & {
    parentID: string;
}

export type QuerySalaryChildResponse = APIResponse & {
    data: {
        listRecords: SalaryChild[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type InsertSalaryChildPayload = {
    parentID: string;
    humanID?: string;
    name: string;
    date?: string;
    status?: string;
    salary: string;
    reward: string;
    punishment: string;
    advance: string;
    remaining: string;
    paid: string;
    human?: string;
    note?: string;
}

export type InsertSalaryChildResponse = {
    error: boolean;
    data: SalaryChild & {
        human?: string;
        project: string;
        message?: string;
    }
}

export type UpdateSalaryChildPayload = {
    expertSalaryID: string;
    humanID?: string;
    name?: string;
    date?: string;
    status?: string;
    human?: string;
    note?: string;
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
    salary: string;
    reward: string;
    punishment: string;
    advance: string;
    remaining: string;
    paid: string;
    revenueBonus: string;
    mealAllowance: string;
    insurance: string;
    pitax: string;
}

export type DeleteSalaryChildPayload = {
  arraysRemove: string[]
}

export type UpdateSalaryChildResponse = InsertSalaryChildResponse;
export type DeleteSalaryChildResponse = {
  error: boolean;
  status?: number;
  message?: string;
  data?: {
    message: string;
  }
}
