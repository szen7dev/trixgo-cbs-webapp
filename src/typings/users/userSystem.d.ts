import { User } from "typings/user";

interface QueryParam {
    companyID?: string;
    keyword?: string;
    select?: string;
    populates?: string;
    lastestID?: string;
    limit?: number;
    isFetch?: boolean;
}

export interface DataResponse {
    listRecords: UserSystemProps[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export interface UserSystemResponse {
    error: boolean;
    data: DataResponse;
    status: number;
}

export type UserSystemPayload = {
    userID?: string,
    email: string,
    fullname: string,
    companyID: string,
    departmentID: string,
    positionID: string,
    level: number
}

export type UserSystemProps = {
    _id: string,
    company: {
        _id: string,
        name: string,
        sign: string
    },
    department: {
        _id: string,
        name: string,
        sign: string
    },
    position: {
        _id: string,
        name: string,
        sign: string
    },
    email: string,
    phone: string,
    fullname: string,
    bizfullname: string,
    birthday: string,
    level: number,
    status: number,
    lastLog: string,
    numLog: number,
    lang: string,
}

interface ModalProps {
    show: boolean;
    toggle(): void;
    modalType?: "create" | "update";
    initialValues?: {
        userID: string,
        email: string,
        fullname: string,
        companyID: string,
        departmentID: string,
        positionID: string,
        level: number,
        departmentName?: string,
        positionName?: string
    }
    onConfirm?(): void
}