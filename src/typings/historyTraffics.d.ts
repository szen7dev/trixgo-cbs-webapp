export type ListHistoryResponse = APIResponse & {
    data: {
        listRecords: Array<any>;
        limit?: number;
        totalRecord?: number;
        totalPages?: number;
        nextCursor?: string;
    };
};

export type ListHistoryPayload = {
    lastestID?: string;
    limit?: number;
    type?: string;
    keyword?: string;
};