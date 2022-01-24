interface QueryParam {
    limit?: number;
    select?: string;
    keyword?: string;
    lastestID?: string;
}


export interface CompanyItem {
    _id: string;
    name: string;
    sign: string;
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
