type APIResponse = {
    error?: boolean;
    status?: number;
}

type Company = {
    name: string;
    sign: string;
    _id: string;
}

type Position = {
    name: string;
    _id: string;
}

export type Human = {
    _id: string;
    image: string;
    company: Company;
    name: string;
    createAt: Date;
    position?: Position;
}

export interface HumanPayload {
    lastestID?: string | undefined,
    limit?: number;
}

export type ListHumanResponse = APIResponse & {
    data?: {
        listRecords: Human[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string;
    }
}
