import { APIResponse } from "./apis/response";
import { User } from "./user";

export type ListNotificationPayload = {
  companyID?: string;
};

export type UpdateNotificationPayload = {
  notificationID?: string;
  status: number;
  isUpdateSendSuccess?: boolean
}

export type NotificationResponse = APIResponse & {
  data: NotificationProps;
  message: string;
};

export type ListNotificationResponse = APIResponse & {
  data: {
    listRecords: Array<NotificationProps>;
    totalRecord: number;
    totalRecordSendSuccess: number;
    limit?: number;
    nextCursor?: string;
  };
  error: boolean
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
