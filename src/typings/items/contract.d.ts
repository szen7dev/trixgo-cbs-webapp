import type { QueryParam, APIResponse } from './commons';

export interface Contract {
    _id: string;
    name: string;
    modifyAt: string,
    description: string | null;
    sign: string | null;
    unit: string | null;
    note: string | null;
    convert: number
    unitprice: string | null;
    userUpdate: string | null;
    convertQuantity: number
}

export type ContractQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    contractID?: string;
    // populates?: any;
};

export type ContractQueryResponse = APIResponse & {
    data: {
        listRecords: Goods[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type ContractQueryDetailResponse = APIResponse & {
    data: Contract
}