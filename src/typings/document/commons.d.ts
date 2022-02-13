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

export interface Member {
    _id: string;
    image?: string;
    fullName?: string;
}

export interface Author {
    _id: string;
    image?: string;
    fullName?: string;
}

export interface Project {
    _id: string;
    image?: string;
}

export interface Company {
    name?: string;
    sign?: string;
    _id: string;
}

export interface Contract {
    _id: string;
    name: string;
    sign?: string;
}