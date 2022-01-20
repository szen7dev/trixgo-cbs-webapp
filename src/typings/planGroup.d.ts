interface QueryParam {
    limit?: number;
    select?: string;
    keyword?: string;
    lastestID?: string;
    filter?: string;
    populates?: string;
    projectID?: string;
}

export interface GroupResponse {
    error: boolean;
    data: Data;
    status: number;
}

export interface GroupItem {
    _id: string;
    name: string;
    project: Project;
    company: string;
    sign: string;
}

export interface Data {
    listRecords: GroupItem[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor?: any;
    currentPage: number;
}