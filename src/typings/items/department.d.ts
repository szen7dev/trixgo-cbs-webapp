import type { QueryParam } from './commons';

export type Department = {
    name: string;
    sign: string;
    _id: string;
    description?: string;
}

export type DepartmentPayload = QueryParam & {
    type: 1 | 2; //  1: "Phòng Ban", 2: "Dự án" 
}

export type DepartmentResponse = APIResponse & {
    data: {
        listRecords: Department[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}