import { User } from "typings/user";

interface QueryParam {
    arrayID?: string;
    companyID?: string;
    projectID?: string;
    keyword?: string;
    select?: string;
    populates?: string;
    lastestID?: string;
    limit?: number;
    isFetch?: boolean;
}

export interface DataResponse {
    data: {
        listRecords: UserSystemProps[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string;
    }
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
    level: number,
    status: number,
    phone?: string,
    note?: string,
    startingTime?: string,
    storageUse?: number,
    newPass?: string,
    currentPass?: string,
    resetPass?: string,
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
    contacts?: any,
    email?: string,
    phone?: string,
    note?: string,
    image: string,
    fullname: string,
    bizfullname: string,
    birthday: string,
    level: number,
    status: number,
    lastLog: string,
    numLog: number,
    lang: string,
    imgUrl?: string;
    startingTime?: string;
    storageUse?: number;
    createAt?: any
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
        positionName?: string,
        status: number
        startingTime?: string;
        storageUse?: number;
        phone?: string;
    }
    onConfirm?(): void
}

export type ListUserInProjectPayload = {
    projectID: string;
    limit?: number;
    keyword?: string;
    select?: string;
    populates?: string;
    lastestID?: string;
};