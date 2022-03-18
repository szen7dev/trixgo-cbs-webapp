export type DatahubPrams = {
  limit?: number;
  select?: string;
  lastestID?: string;
  populates?:
    | {
        path: string;
        select?: string;
        populate?: string;
      }
    | string;
  keyword?: string;
};