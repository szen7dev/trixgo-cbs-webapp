import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Project } from "./items/project";
import { Warehouse } from "./items/warehouse";
import { Contact } from "./items/contact";

export type TimeSheetParent = {
    _id: string;
    type: 1;
    official: 1;
    hours: number;
    unitprice: number;
    amount: number;
    status: number;
    timeApproved: string | null;
    author: User;
    admins: User[];
    members: User[];
    userCreate: User;
    userUpdate: User;
    state: 1;
    name: string;
    assignee: User;
    project: Project;
    note: string;
    createAt: string;
    modifyAt: string;
    date: string;
    convertFactor: number;
    status: number;
    files: any;
}

export type ListTimeSheetPayload = QueryParams & {
    expertTimesheetID?: string;
};

// time sheet parent
export type QueryTimeSheetParentResponse = APIResponse & {
    data: {
        listRecords: TimeSheetParent[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type QueryDetailTimeSheetParentResponse = APIResponse & {
    data: TimeSheetParent;
}

export type InsertTimeSheetParentPayload = {
    project: Project;
    name: string;
    assignee: User;
    type: 1;
    official: 1;
    project: Project;
    note: string;
    date: string;
    convertFactor: number;
    status: number;
}

export type InsertTimeSheetParentResponse = {
    error: boolean;
    data: TimeSheetParent & {
        assignee: string;
        project: string;
        message?: string;
    }
}

export type UpdateTimeSheetParentPayload = {
    expertTimesheetID: string;
    filesID?: string[];
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
}

export type UpdateTimeSheetParentResponse = InsertTimeSheetParentResponse;

export type DeleteTimeSheetParentPayload = {
    expertTimesheetID: string;
}

export type DeleteTimeSheetParentResponse = APIResponse & {
    data: TimeSheetParent & {
        assignee: string;
        project: string;
    }
}

export type TimeSheetChild = {
    _id: string;
    type: 1;
    hours: number;
    unitprice: number;
    amount: number;
    status: number;
    subtype: any | null
    shiftType: any | null
    official: any | null
    timeApproved: string | null;
    state: 1;
    name: string;
    date: string;
    parent?: TimeSheetParent;
    assignee?: User
    budgetWork?: strinstring | null
    note?: string
    history?: string
    createAt?: string | null
    modifyAt?: string | null
    userCreate?: any
    userUpdate?: any | null
}

export type QueryListTimeSheetChildPayload = QueryParams & {
    parentID: string;
}

export type QueryTimeSheetChildResponse = APIResponse & {
    data: {
        listRecords: TimeSheetChild[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type InsertTimeSheetChildPayload = {
    device: number;
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

export type InsertTimeSheetChildResponse = {
    error: boolean;
    data: TimeSheetChild & {
        assignee?: string;
        project: string;
    }
}

export type UpdateTimeSheetChildPayload = {
    expertTimesheetID: string;
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

export type UpdateTimeSheetChildResponse = InsertTimeSheetChildResponse;