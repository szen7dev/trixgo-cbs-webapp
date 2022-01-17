import { type } from "os";
import { APIResponse } from "./apis/response";

//2. THỐNG KÊ THEO THIẾT BỊ THEO NĂM
export type ListDevicePayload = {
    year: number;
};

export type ListDeviceResponse = APIResponse & {
    data?: {
        listDevice?: Device[];
    }
};

type TypeAccesses = {
    type: number[];
    amountAccesses: number[];
}
type DataDevice = {
    type: number;
    amountAccesses: number;
};

type Device = {
    _id: {
        month: number
    }
    data: DataDevice[];
};

export type arTypeDevice = {
    type: number,
}

//3. THỐNG KÊ THEO LOẠI THIẾT BỊ(TỪ NGÀY ĐẾN NGÀY)
export type ListTypeDeviceAccessPayload = {
    fromDate?: string;
    toDate?: string;
    year?: number;
};

export type ListTypeDeviceAccessResponse = APIResponse & {
    data?: {
        listTypeDeviceAccess?: listTypeDevice[];
    }
};

type ListTypeDevice = {
    _id: {
        type: number
    },
    amountAccesses: number
};

//4. THỐNG KÊ TRUY CẬP THEO APP
export type ListAppAccessPayload = {
    fromDate?: string;
    toDate?: string;
    year?: number;
};
export type ListAppAccessResponse = APIResponse & {
    data?: {
        listAppAccess?: AppAccess[];
    }
};

type AppAccess = {
    amountAccesses: number,
    app: {
        name: string
    }
};

//5. THỐNG KÊ TRUY CẬP THEO APP VÀ THIẾT BỊ
export type ListAppDeviceAccessPayload = {
    fromDate: string;
    toDate: string;
    year: number;
};
export type ListAppDeviceAccessResponse = APIResponse & {
    data?: {
        listAppDeviceAccess?: listAppDevice[];
    }
};
type DataListAppDeviceAccess = {
    type: number,
    amountAccesses: number
};

type DataListAppDevice = {
    data: DataListAppDeviceAccess[];
    app: {
        name: string
    }
};

//6. THỐNG KÊ TRUY CẬP THEO CÔNG TY
export type ListCompanyAccessPayload = {
    fromDate: string;
    toDate: string;
    year: number;
};
export type ListCompanyAccessResponse = APIResponse & {
    data?: {
        listCompanyAccess?: listCompany[];
    }
};

type ListCompany = {
    amountAccesses: number;
    company: {
        name: string
    }
};