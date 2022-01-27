import API from "../repository";
import { convertObToUrl } from "helpers";
import {
    ListMessagePayload,
    ListMessageResponse,
    SendNormalMessagePayload,
    SendNormalMessageResponse, UpdateReminderMessagePayload, UpdateReminderMessageResponse
} from "typings/apis/messages/listMessage";

const getListPinMessageURL = "/api/chatting/conversations/list-message-pin-conversation-with-page";
const getListMessageURL = "/api/chatting/conversations/list-message-conversation-with-page";
const sendNormalMessageURL = "/api/chatting/conversations/insert-message-conversation";
const updateReminder = "/api/chatting/conversations/update-user-join-message-reminder-conversation";

const ListMessageRepository = {
    async getListPinMessage(payload: ListMessagePayload): Promise<ListMessageResponse> {
        const { data } = await API.get<ListMessageResponse>(
            `${getListPinMessageURL}?${convertObToUrl(payload)}`
        );

        return data;
    },

    async getListMessage(payload: ListMessagePayload): Promise<ListMessageResponse> {
        const { data } = await API.get<ListMessageResponse>(
            `${getListMessageURL}?${convertObToUrl(payload)}`
        );

        return data;
    },

    async sendNormalMessage(payload: SendNormalMessagePayload): Promise<SendNormalMessageResponse> {
        const {data} = await API.post(
            `${sendNormalMessageURL}`,
            {...payload}
        )

        return data;
    },

    async updateReminder(payload: UpdateReminderMessagePayload): Promise<UpdateReminderMessageResponse> {
        const {data} = await API.put(
            `${updateReminder}`,
            {...payload}
        )

        return data;
    }
};

export default ListMessageRepository;
