import API from "../repository";
import { convertObToUrl } from "helpers";

import { 
    ListNotificationResponse,
    ListNotificationPayload
} from "typings/notification";

const notificationURL = "/api/notifications";

const NotificationRepository = {
    async listNotification(payload: ListNotificationPayload): Promise<ListNotificationResponse> {
        const { data } = await API.get<ListNotificationResponse>(
            `${notificationURL}/list-notifications?${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default NotificationRepository;
