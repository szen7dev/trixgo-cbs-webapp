import { User } from "typings/user";

interface QueryParam {
    companyID?: string;
    limit?: number;
    select?: string;
    keyword?: string;
    lastestID?: string;
}

export interface DataResponse {
    listRecords: AppCompanyProps[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export interface AppCompanResponse {
    error: boolean;
    data: DataResponse;
    status: number;
}

export type AppCompanyPayload = {
    appCompanyID?: string,
    app: string,
    company: string,
    maxCount: number,
    maxData: number,
    startTime: string,
    endTime: string,
}

export type AppCompanyProps = {
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
    maxCount: number,
    maxData: number,
    startTime: string,
    endTime: string,
    status: number,
    traffic: number,
    userCreate: User,
}

interface ModalProps {
    show: boolean;
    toggle(): void;
    modalType?: "create" | "update";
    initialValues?: {
        appCompanyID?: string,
        app: string,
        company: string,
        maxCount: number,
        maxData: number,
        startTime: string,
        endTime: string,
    };
    onConfirm?(values: AppCompanyProps): void
}