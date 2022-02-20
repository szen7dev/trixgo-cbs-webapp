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