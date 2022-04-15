import type { QueryParam, APIResponse } from '../common';

export type DatahubContact = { 
    _id: string;
    name: string;
    sign: string;
    address: string;
    taxid: string;
    note: string;
    userCreate: string;
    userUpdate?: string;
    modifyAt?: string;
    createAt?: string;
}

export type DatahubContactListParams = QueryParam & {}

export type DatahubContactListResponse = APIResponse & {
    data: {
        listRecords: DatahubContact[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type DatahubContactInfoParams = {
    DatahubContactID: string;
    select?: string;
    populates?: string;
}

export type DatahubContactInfoResponse = APIResponse & {
    data: DatahubContact;
}