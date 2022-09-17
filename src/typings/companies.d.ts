interface QueryParam {
    limit?: number;
    select?: string;
    keyword?: string;
    lastestID?: string;
}


export interface CompanyItem {
    _id: string;
    name: string,
    sign: string,
    taxid: string,
    phone: string,
    email: string,
    address: string,
    cover: string,
    image: string,
    area: {
        _id: string,
        name: string,
    },
    scale: string,
    createAt: string,
}

export interface Data {
    listRecords: CompanyItem[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export interface CompaniesResponse {
    error: boolean;
    data: Data;
    status: number;
}

export type CompanyPayload = {
    companyID?: string,
    name?: string,
    sign?: string,
    taxid?: string,
    address?: string,
    area?: string,
    email?: string,
    phone?: string,
    areaName?: string,
    description?: string,
    birthDay?: string,
    image?: string
}
