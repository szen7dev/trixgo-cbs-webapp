import API from "../repository";

import { 
    ListNotificationResponse,
    ListNotificationPayload,
    UpdateNotificationPayload
} from "typings/notification";

const notificationURL = "/api/notifications";

const NotificationRepository = {
    async updateNotification(payload: UpdateNotificationPayload): Promise<any> {
        const { data } = await API.put<any>(
            notificationURL,
            payload
        );
        return data;
    },
    async markAllRead(): Promise<any> {
        const { data } = await API.put<any>(`${notificationURL}/mark-all-read`);
        return data;
    },
    async listNotification(payload: ListNotificationPayload): Promise<ListNotificationResponse> {
        const { data } = await API.get<ListNotificationResponse>(
            notificationURL,
            {
                params: {
                    // select: 'title content type path sender status createAt',
                    populates: JSON.stringify({
                        path: 'sender',
                        select: '_id fullname bizfullname image email'
                    }),
                    ...payload,
                }
            }
        );
        return data;
    },
};

export default NotificationRepository;
