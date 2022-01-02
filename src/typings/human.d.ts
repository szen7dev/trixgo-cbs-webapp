type APIResponse = {
    error?: boolean;
    status?: number;
}

type Company = {
    name: string;
    sign: string;
    _id: string;
}

type Department = {
    name: string;
    sign: string;
    _id: string;
}

type Position = {
    name: string;
    _id: string;
}

type Area = {
    name: string;
    _id: string;
    sign: string;
}

type Workplace = {
    name: string;
    _id: string;
    sign: string;
}

type EducationBackground = {
    name: string;
    _id: string;
}

type Major = {
    name: string;
    _id: string;
}

type Other = {
    name: string;
    _id: string;
}

export type Human = {
    company?: Company;
    position?: Position;
    department?: Department;
    area2?: Area;
    area1?: Area;
    workplace?: Workplace[];
    educationalBackground?: EducationBackground[];
    major?: Major[];
    other?: Other;
    _id?: string;
    image?: string;
    name?: string;
    createAt?: Date;
    phone?: string;
    sign?: string;
    email?: string;
    gender?: number;
    birthday?: string;
    identity?: string;
    address?: string;
    dateProvice?: string;
    description?: string;
    place?: string;
    taxid?: string;
    insuranceDate?: string;
    insuranceNumber?: string;
    insuranceStatus?: number;
    sallarySubFactor?: string;
    sallaryFactor?: string;
    contractType?: string;
    workStartDate?: string;
    contractSign?: string;
    dayOff?: string;
    contractDate?: string;
    workingStatus?: string;
    contractValid?: string;
    contractExpire?: string;
    appointDate?: string;
    changeSallaryDate?: string;
    familyPolicy?: number;
    family?: string;
    signerIn?: string;
    signerOut?: string;
    insuanceDate?: string;
}

export interface HumanPayload {
    lastestID?: string | undefined,
    limit?: number;
    contactID?: string;
    populates?: {
        path?: string;
        select?: string;
    };
}

export type ListHumanResponse = APIResponse & {
    data?: {
        listRecords?: Human[];
        limit?: number;
        totalRecord?: number;
        totalPages?: number;
        nextCursor?: string;
    }
}

export type HumanInfo = APIResponse & {
    data: Human
}
