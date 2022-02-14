import type { APIResponse, QueryParam} from '.';

interface Author {
    _id: string;
    fullname: string;
    sign: string;
    image: string;
}

interface Project {
    _id: string;
    name: string;
    sign: string;
}

export interface Document {
    _id: string;
    author?: Author;
    project: Project;
    name?: string;
    sign: string;
    sender?: {
        _id: string;
        name: string;
    };
    receiver?: {
        _id: string;
        name: string;
    };
    date: string;
    storeSign?: {
        _id: string;
        name: string;
    };
    amount: number;
    status: string;
    note: string;
    storage: {
        _id: string;
        name: string;
    };
    createAt: string;
    userCreate?: Author;
    package?: {
        _id: string;
        name: string;
    };
    field?: {
        _id: string;
        name: string;
    };
}

export interface ListDocumentQueryPayload extends QueryParam {
    departmentID: string;
}

export interface ListDocumentQueryResponse extends APIResponse {
    data: {
        listRecords: Document[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export interface DocumentInfoQueryPayload extends QueryParam {
    documentID: string;
}

export interface DocumentInfoQueryResponse extends APIResponse {
    data: Document;
}
