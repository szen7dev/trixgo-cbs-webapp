import { User } from "typings/user";

interface QueryParam {
    keyword?: string;
    select?: string;
    populates?: string;
    lastestID?: string;
    limit?: number;
}

export interface DataResponse {
    listRecords: AppUserProps[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export type AppProps = {
    _id: string,
    name: string,
    slug: string,
    description: string,
    image: string,
    companies: any[],
    members: User[],
    userCreate: User,
}