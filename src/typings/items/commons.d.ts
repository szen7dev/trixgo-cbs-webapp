export interface APIResponse {
    error?: boolean;
    status?: number;
}

export interface Populate {
    path?: string;
    select?: string;
    populate?: Populate
}

export interface QueryParam {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    select?: string;
    populates?: Populate;
}

export interface Company {
    name?: string;
    sign?: string;
    _id?: string;
}

export interface Human {
    _id: string;
    fullname?: string;
    image?: string;
}