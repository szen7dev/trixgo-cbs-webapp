
interface QueryParam {
    companyID?: string;
    keyword?: string;
    select?: string;
    populates?: string;
    lastestID?: string;
    limit?: number;
    isFetch?: boolean
}

export interface DataResponse {
    listRecords: any[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
}

export interface PositionResponse {
    error: boolean;
    data: DataResponse;
    status: number;
}

export type Position = {
    _id: string,
    company: {
        _id: string,
        name: string,
        sign: string
    },
    name: string,
    description: string,
    parent: Position,
    level: number,
    userCreate: User,
    createAt: string,
    modifyAt: string
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        positionID: string,
        name: string,
        description: string
    }
    onConfirm?(): void
}