import { User } from "typings/user";

interface QueryParam {
    appID?: string;
    companyID?: string;
    limit?: number;
    select?: string;
    lastestID?: string;
    keyword?: string;
}

export interface DataResponse {
    listRecords: AppUserProps[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export interface AppUserResponse {
    error: boolean;
    data: DataResponse;
    status: number;
}

export type AppUserPayload = {
    appCompanyID?: string,
    maxCount: string,
    maxData: string,
    startTime: string,
    endTime: string,
}

export type AppUserProps = {
    _id: string,
    company: {
        _id: string,
        name: string,
        sign: string
    },
    app: {
        _id: string,
        name: string,
        slug: string
    },
    startTime: string,
    endTime: string,
    status: string,
    userCreate: User,
}