import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Project } from "./items/project";


export type SalaryParent = {
    _id: string;
    type: 1;
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
    union: number;
    share: number;
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
    timeApproved: string | null;
    state: 1;
    name: string;
    date: string;
    parent?: SalaryParent;
    human?: User;
    work: strinstring | null;
    note?: string;
    salary: number;
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
    convertFactor: number;
    project: any;
    position: any;
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

export type UpdateSalaryChildResponse = InsertSalaryChildResponse;