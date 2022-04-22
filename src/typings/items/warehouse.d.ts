import type { QueryParam, APIResponse } from './commons';

export interface Warehouse {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
}

export type WarehouseQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    WarehouseID?: string;
};

export type WarehouseQueryResponse = APIResponse & {
    data: {
        listRecords: Warehouse[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type WarehouseQueryDetailResponse = APIResponse & {
    data: Warehouse
}