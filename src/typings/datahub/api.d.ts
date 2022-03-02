export type ResponseList<T> = {
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

export type ResponseCreate<T> =
  | {
      error: boolean;
      data: T;
    }
  | {
      name: string;
      message: string;
      code: number;
      type: string;
      data: {
        type: string;
        message: string;
        field: string;
        nodeID: string;
        action: string;
      }[];
    };
