import { APIResponse } from "./apis/response";
import { User } from "./user";

export type ListNotificationPayload = {
  companyID?: string;
};

export type NotificationResponse = APIResponse & {
  data: NotificationProps;
  message: string;
};

export type ListNotificationResponse = APIResponse & {
  data: {
    listRecords: Array<any>;
    totalRecord: number;
    totalPages?: number;
    limit?: number;
    totalRecord?: number;
    totalPage?: number;
    nextCursor?: string;
  };
};

export type NotificationProps = {
  _id: string,
  type: number,
  status: number,
  app: string,
  languageKey: string,
  project: string,
  sender: User,
  receiver: User,
  content: string,
  path: string,
  mainColl: {
    kind: string,
    item: any
  },
  subColl: {
    kind: string,
    item: any
  },
  createAt: string
};
