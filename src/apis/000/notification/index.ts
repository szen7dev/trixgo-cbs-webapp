import API from "../repository";

import { 
    ListNotificationResponse,
    ListNotificationPayload
} from "typings/notification";

const notificationURL = "/api/notifications";

const NotificationRepository = {
    async listNotification(payload: ListNotificationPayload): Promise<ListNotificationResponse> {
        const { data } = await API.get<ListNotificationResponse>(
            notificationURL,
            {
                params: {
                    select: 'title content type path sender status createAt',
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
