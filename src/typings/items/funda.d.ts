import type { QueryParam, APIResponse } from './commons';

export interface Funda {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
}

export type FundaQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    FundaID?: string;
};

export type FundaQueryResponse = APIResponse & {
    data: {
        listRecords: Funda[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type FundaQueryDetailResponse = APIResponse & {
    data: Funda
}