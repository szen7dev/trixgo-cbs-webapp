
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

// export type PositionProps = {
//     _id: string,
//     company: {
//         _id: string,
//         name: string,
//         sign: string
//     },
//     app: {
//         _id: string,
//         name: string,
//         slug: string
//     },
//     user: User,
//     endTime: string,
//     numLog: number,
//     level: number,
//     userCreate: User,
// }