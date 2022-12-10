import type { QueryParam, APIResponse } from './commons';

export interface Funda {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
    map: any; // Chưa rõ cái này để làm gì
}

export type FundaQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    fundaID?: string;
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