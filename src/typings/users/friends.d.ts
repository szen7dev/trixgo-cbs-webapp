import { Company } from "typings/human";

interface APIResponse {
    error?: boolean;
    status?: number;
}

interface Populate {
    path?: string;
    select?: string;
    populate?: Populate
}

interface QueryParam {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    populates?: Populate;
}

export interface Friend {
    _id: string;
    fullname: string;
    imgUrl?: string;
    company?: Company;
}

export interface ListFriendPayload extends QueryParam {
    select?: string;
}
interface QueryFriendResponse extends APIResponse {
    data: {
        listRecords: Friend[];
        "limit": number;
        "totalRecord": number;
        "totalPage": number;
        "nextCursor": string | null;
    };
}
