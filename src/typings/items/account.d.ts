import type { QueryParam, APIResponse } from './commons';

export interface Account {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
}

export type AccountQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    accountID?: string;
};

export type AccountQueryResponse = APIResponse & {
    data: {
        listRecords: Account[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type AccountQueryDetailResponse = APIResponse & {
    data: Account
}