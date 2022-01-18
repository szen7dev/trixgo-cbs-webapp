import { type } from "os";
import { APIResponse } from "./apis/response";
import {Human} from "./human";

//1. LIST HISTORY TRAFFIC
type APIResponse = {
    error?: boolean;
    status?: number;
}
type Populate = {
    path?: string;
    select?: string;
    populate?: Populate
}

type QueryParam = {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    populates?: Populate;
}
type Filter = {
    type: 1,
    app: 1,
    menu: 1,
    companyOfAuthor: 1,
    createdAt: 1,
    userCreate: 1
}
export type ListHistoryTrafficPayload = {
    filter?: string,
    limit?: number,
    keyword?: string,
    lastestID?: string,
    populates?: string,
    fromDate?: string,
    toDate?: string
};

type companyOfAuthor = {
    _id: string,
    name: string,
    sign: string,
    image: string
}
type userCreate = {
    _id: string,
    image: string,
    fullname: string
}
type App = {
    _id: string,
    name: string,
    image: string
}
type Menu = {
    _id: string,
    name: string,
    image: string
}
export type HistoryTraffic = {
    listRecords?: {
        _id: string,
        type: 1,
        companyOfAuthor?: companyOfAuthor,
        userCreate?: userCreate,
        app?: App,
        menu?: Menu,
        createdAt: string
    };
}
export interface ListParam {
    _id: string,
    type: number,
    companyOfAuthor: companyOfAuthor,
    userCreate: userCreate,
    app: App,
    menu: Menu,
    createdAt: string

    map(param: (item: any) => any): any;
}
export type ListHistoryTrafficResponse = APIResponse & {
    error: boolean,
    data?: {
        listRecords?: ListParam[],
        limit: number,
        totalRecord: number,
        totalPage: number,
        nextCursor: string
    },
    status: number
};
//2. THỐNG KÊ THEO THIẾT BỊ THEO NĂM
export type ListDevicePayload = {
    year?: number;
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
    fromDate?: string;
    toDate?: string;
    year?: number;
};
export type ListCompanyAccessResponse = APIResponse & {
    data?: {
        listCompanyAccess?: listCompany[];
    }
};

type listCompany = {
    amountAccesses: number;
    company: {
        name: string
    }
};