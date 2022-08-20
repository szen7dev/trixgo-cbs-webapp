import type { QueryParam, APIResponse } from './commons';

export interface DepartmentDirectory {
    _id: string;
    members: string;
    type: number;
    name: string,
    description: string | null;
    lock: number;
}

export type DepartmentDirectoryQueryPayload = QueryParam & {
    companyID?: string;
    DepartmentDirectoryID?: string;
};

export type DepartmentDirectoryQueryResponse = APIResponse & {
    data: {
        listRecords: DepartmentDirectory[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}
    
export type DepartmentDirectoryQueryDetailResponse = APIResponse & {
    data: DepartmentDirectory
}