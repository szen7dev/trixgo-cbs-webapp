import type { QueryParam, APIResponse } from './commons';

export interface Goods {
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

export type GoodsQueryPayload = QueryParam & {
    companyID?: string;
    parentID?: string;
    isListParentOfListChilds?: string;
    goodsID?: string;
    // populates?: any;
};

export type GoodsQueryResponse = APIResponse & {
    data: {
        listRecords: Goods[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type GoodsQueryDetailResponse = APIResponse & {
    data: Goods
}