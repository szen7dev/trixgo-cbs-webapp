export type Response<T> = {
  error: boolean;
  status: number;
  data: {
    listRecords: T[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string;
  };
};
