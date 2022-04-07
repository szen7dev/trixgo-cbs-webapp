import type { QueryParam, APIResponse } from './commons';

export interface Storage {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
}

export type StorageQueryPayload = QueryParam & {
    companyID?: string;
    storageID?: string;
};

export type StorageQueryResponse = APIResponse & {
    data: {
        listRecords: Storage[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type StorageQueryDetailResponse = APIResponse & {
    data: Storage
}