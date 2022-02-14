import type { QueryParam, APIResponse, Member, Author, Project, Contract } from './commons';

export interface Package {
    _id: string;
    name: string;
    sign: string;
    modifyAt: string;
    createAt: string;
    numberOfDocs: number;
    suid?: string;
    members?: Member[] | string[];
    author?: Author | string;
    project?: Project | string;
    company?: Company | string;
    userUpdate?: Author | string;
    contract?: Contract | string;
}

export type PackageQueryPayload = QueryParam & {
    departmentID?: string;
}

export type PackageQueryListResponse = APIResponse & {
    data: {
        listRecords: Department[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}