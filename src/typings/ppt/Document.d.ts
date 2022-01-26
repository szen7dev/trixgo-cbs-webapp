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
    project?: Project;
    name?: string;
    sign: string;
    sender?: {
        _id: string;
        name: string;
        phone: string;
        sign: string;
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
}

export interface ListDocumentQueryPayload extends QueryParam {
    departmentID: string;
    select?: string;
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
