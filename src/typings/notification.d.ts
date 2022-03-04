import { APIResponse } from "./apis/response";

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
  sender: {
    _id: string;
    bizfullname: string,
    fullname: string,
    image: string
  },
  receiver: string,
  title: string,
  content: string,
  path: string,
  createAt: string
};
