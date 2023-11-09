import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Project } from "./items/project";


export type SalaryParent = {
    _id: string;
    type: 1;
    hours: number;
    unitprice: number;
    salary: number;
    amount: number;
    status: number;
    timeApproved: string | null;
    author: User;
    admins: User[];
    members: User[];
    userCreate: User;
    state: 1;
    name: string;
    assignee: User;
    project: Project;
    note: string;
    createAt: string;
    modifyAt: string;
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
    assignee: User;
    type: 1;
    project: Project;
    note: string;
}

export type InsertSalaryParentResponse = {
    error: boolean;
    data: SalaryParent & {
        assignee: string;
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
        assignee: string;
        project: string;
    }
}

export type SalaryChild = {
    _id: string;
    type: 1;
    hours: number;
    unitprice: number;
    amount: number;
    status: number;
    timeApproved: string | null;
    state: 1;
    name: string;
    date: string;
    parent?: SalaryParent;
    assignee?: User,
    work: strinstring | null,
    note?: string,
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
    assigneeID?: string;
    name: string;
    date?: string;
    status?: string;
    hours?: string;
    unitprice?: string;
    amount?: string;
    assignee?: string;
    note?: string;
}

export type InsertSalaryChildResponse = {
    error: boolean;
    data: SalaryChild & {
        assignee?: string;
        project: string;
    }
}

export type UpdateSalaryChildPayload = {
    expertSalaryID: string;
    assigneeID?: string;
    name?: string;
    date?: string;
    status?: string;
    hours?: string;
    unitprice?: string;
    amount?: string;
    assignee?: string;
    note?: string;
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
}

export type UpdateSalaryChildResponse = InsertSalaryChildResponse;