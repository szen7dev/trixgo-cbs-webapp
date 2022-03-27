import type { QueryParam, APIResponse, Member, Author, Project, Contract } from './commons';

export interface Package {
    _id: string;
    name: string;
    sign: string;
    modifyAt: string;
    createAt: string;
    numberOfDocs: number;
    suid?: string;
    members?: Member[];
    author?: Author;
    project?: Project | string;
    company?: Company | string;
    userUpdate?: Author;
    contract?: Contract | string;
}

export type PackageQueryPayload = QueryParam & {
    departmentID?: string;
    keyword?: string;
}

export type PackageQueryListResponse = APIResponse & {
    data: {
        listRecords: Department[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}