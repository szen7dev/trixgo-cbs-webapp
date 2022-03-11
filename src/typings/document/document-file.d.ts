import type { APIResponse, QueryParam } from './commons';

interface FileProps {
    _id: string;
    name: string;
    nameOrg: string;
    size: number;
    path: string;
    author: {
        _id: string;
        bizfullname: string;
        fullname: string;
        image: string;
    }
}

export interface DocumentFileProps {
    "_id": string,
    "createAt": "2021-09-28T08:21:36.000Z",
    "file": FileProps,
    "document": string;
}

export interface DocumentFileQueryPayload extends QueryParam {
    documentID: string;
}

export interface DocumentFileQueryResponse extends APIResponse {
    data: {
        listRecords: Department[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}
