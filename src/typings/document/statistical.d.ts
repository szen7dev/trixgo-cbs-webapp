import type { APIResponse } from './commons';

export interface StatisticProps {
    "type": number;
    "totalDocument": number;
    "totalDocumentNew": number;
}

export interface StatisticQueryDocumentPayload {
    departmentID: string;
}

export interface StatisticQueryDocumentResponse extends APIResponse {
    data: {
        listRecords: StatisticProps[];
    }
}

// DANH SÁCH DỰ ÁN VÀ SỐ LƯỢNG VĂN BẢN
export interface ListProjectWithAmountDocumentPayload {
    fromDate?: string;
    toDate?: string;
}

export interface ListProjectWithAmountDocumentResponse extends APIResponse {
    data: {
        listProject: any,
        listAmountDocument: any,
    }
}