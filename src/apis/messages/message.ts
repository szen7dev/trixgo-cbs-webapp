import API from "../repository";
import { convertObToUrl } from "helpers";
import {
    AddUserToConversationPayload, AddUserToConversationResponse,
    DeleteRevokeMessagePayload,
    DeleteRevokeMessageResponse,
    ListMessagePayload,
    ListMessageResponse,
    PinnedMessagePayload,
    PinnedMessageResponse, SearchMessageInConversationByIdPayload, SearchMessageInConversationByIdResponse,
    SendNormalMessagePayload,
    SendNormalMessageResponse,
    ShareMessagePayload,
    ShareMessageResponse,
    UpdatePinnedMessagePayload,
    UpdatePinnedMessageResponse,
    UpdatePollPayload,
    UpdatePollResponse,
    UpdateReminderMessagePayload,
    UpdateReminderMessageResponse
} from "typings/apis/messages/listMessage";

const getListPinMessageURL = "/api/chatting/conversations/list-message-pin-conversation-with-page";
const getListMessageURL = "/api/chatting/conversations/list-message-conversation-with-page";
const sendNormalMessageURL = "/api/chatting/conversations/insert-message-conversation";
const updateReminder = "/api/chatting/conversations/update-user-join-message-reminder-conversation";
const shareMessage = "/api/chatting/conversations/share-message-conversation";
const updatePinMessage = "/api/chatting/conversations/update-pin-message-conversation";
const deleteMessage = "/api/chatting/conversations/delete-message-conversation";
const revokeMessage = "/api/chatting/conversations/revoke-message-conversation";
const updatePoll = "/api/chatting/conversations/update-message-poll-conversation";
const addUserToConversation = "/api/chatting/conversations/add-member-conversation";
const searchMessageInConversationById = "api/chatting/conversations/search-message-conversation-by-id";

const ListMessageRepository = {
    async getListPinMessage(payload: PinnedMessagePayload): Promise<PinnedMessageResponse> {
        const { data } = await API.get<PinnedMessageResponse>(
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
    },

    async shareMessage(payload: ShareMessagePayload): Promise<ShareMessageResponse> {
        const {data} = await API.post(
            `${shareMessage}`,
            {...payload}
        )

        return data;
    },

    async updatePinMessage(payload: UpdatePinnedMessagePayload): Promise<UpdatePinnedMessageResponse> {
        const {data} = await API.put(
            `${updatePinMessage}`,
            {...payload}
        )
        return data
    },

    async deleteMessage(payload: DeleteRevokeMessagePayload) : Promise<DeleteRevokeMessageResponse> {
        const {data} = await API.delete(
        `${deleteMessage}`,
        {
                params: {...payload}
            }
        );

        return data;
    },

    async revokeMessage(payload: DeleteRevokeMessagePayload) : Promise<DeleteRevokeMessageResponse> {
        const {data} = await API.post(
        `${revokeMessage}`,
        {...payload}
        );

        return data;
    },

    async updatePoll(payload: UpdatePollPayload) : Promise<UpdatePollResponse> {
        const {data} = await API.put(
            `${updatePoll}`,
            {...payload}
        )

        return data;
    },

    async addUserToConversation(payload: AddUserToConversationPayload) : Promise<AddUserToConversationResponse>  {
        const {data} = await API.post(
            `${addUserToConversation}`,
            {...payload}
        )

        return data;
    },

    async goToMessagePosition(payload: SearchMessageInConversationByIdPayload) : Promise<SearchMessageInConversationByIdResponse> {
        const {data} = await API.get(
        `${searchMessageInConversationById}?${convertObToUrl(payload)}`
        )

        return data;
    }
};

export default ListMessageRepository;
