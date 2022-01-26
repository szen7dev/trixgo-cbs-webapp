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
    populates?: Populate;
}

export * from './Document';
