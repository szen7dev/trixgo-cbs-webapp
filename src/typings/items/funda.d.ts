import type { QueryParam, APIResponse } from './commons';

export interface Funda {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
    map: any; // Chưa rõ cái này để làm gì
    members: any,
}

export type FundaQueryPayload = QueryParam & {
    option?: number;
    companyID?: string;
    parentID?: string;
    populates?: any;
    isListParentOfListChilds?: string;
    fundaID?: string;
    isMember?: any;
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