interface APIResponse {
    error?: boolean;
    status?: number;
}

interface Populate {
    path?: string;
    select?: string;
    populate?: Populate
}

interface QueryParam {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    populates?: Populate;
}

interface Assignee {
    _id: string;
    fullname: string;
}

interface Project {
    _id: string;
    name: string;
}

interface UserCreate {
    _id: string;
    fullname: string;
}

export type TimeSheetParent = {
    "_id": string;
    "type": 1;
    "hours": number;
    "unitprice": number;
    "amount": number;
    "status": number;
    "timeApproved": string | null;
    userCreate: UserCreate;
    "state": 1;
    "name": string;
    "assignee": Assignee;
    "project": Project;
    "note": string;
    "createdAt": string;
    "updatedAt": string;
}

export type ListTimeSheetPayload = QueryParam & {
    expertTimesheetID?: string;
};
// time sheet parent
export type QueryTimeSheetParentResponse = APIResponse & {
    data: {
        listRecords: TimeSheetParent[];
        "limit": number;
        "totalRecord": number;
        "totalPage": number;
        "nextCursor": string | null;
    };
}
export type QueryDetailTimeSheetParentResponse = APIResponse & {
    data: TimeSheetParent;
}
export type InsertTimeSheetParentPayload = {
    name: string;
    assigneeID: string;
    type: 1;
    projectID: string;
    note: string;
}
export type InsertTimeSheetParentResponse = {
    error: boolean;
    data: TimeSheetParent & {
        assignee: string;
        project: string;
    }
}
export type UpdateTimeSheetParentPayload = InsertTimeSheetParentPayload & {
    expertTimesheetID: string;
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
// time sheet children
export type TimeSheetChild = {
    "_id": string;
    "type": 1;
    "hours": number;
    "unitprice": number;
    "amount": number;
    "status": number;
    "timeApproved": string | null;
    "state": 1;
    "name": string;
    "date": string;
    "parent"?: TimeSheetParent;
    assignee?: Assignee,
    note?: string,
}
export type QueryListTimeSheetChildPayload = QueryParam & {
    parentID: string;
}
export type QueryTimeSheetChildResponse = APIResponse & {
    data: {
        listRecords: TimeSheetChild[];
        "limit": number;
        "totalRecord": number;
        "totalPage": number;
        "nextCursor": string | null;
    };
}
export type InsertTimeSheetChildPayload = {
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
export type UpdateTimeSheetChildPayload = InsertTimeSheetChildPayload & {
    expertTimesheetID: string;
}
export type UpdateTimeSheetChildResponse = InsertTimeSheetChildResponse;
