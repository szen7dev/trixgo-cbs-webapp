import type { QueryParam, Company, Human } from './commons';

export type Department = {
    _id: string;
    name: string;
    sign: string;
    description?: string;
    image?: string;
    numberOfDocs?: number;
    company: Company;
    actualStartTime: string;
    actualFinishTime: string;
    numberFinishOfDocs: number;
    admins: string[];
    members: string[];
    pm: Human;
    assistant: Human;
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

export type DepartmentDetailPayload = QueryParam & {
    departmentID: string;
}

export type DepartmentDetailResponse = APIResponse & {
    data: Department;
}