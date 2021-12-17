import { APIResponse } from "./apis/response";

export type ListNotificationPayload = {
    lastestID?: string;
    limit?: number;
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
  };
};

export type NotificationProps = {
  _id: string,
  type: number,
  status: number,
  sender: {
    _id: string;
    fullname: string,
    image: string
  },
  receiver: string,
  title: string,
  content: string,
  createdAt: string
};
