import { User } from "typings/user";

interface QueryParam {
    appID?: string;
    companyID?: string;
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

export interface AppUserResponse {
    error: boolean;
    data: DataResponse;
    status: number;
}

export type AppUserPayload = {
    appID?: string,
    companyID?: string,
    userID: string,
}

export type AddMemberToUserAppPayload = {
    appID: string,
    companyID: string,
    users: string[]
}

export type UpdateMemberAppUserPayload = {
    appID: string,
    companyID: string,
    memberID: string,
    level: number
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
    user: User,
    endTime: string,
    numLog: number,
    level: number,
    userCreate: User,
}