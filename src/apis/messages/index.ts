import API from "../repository";
import { convertObToUrl } from "helpers";

import {
    ListConversationPayload,
    ListConversationResponse,
    ListMembersOfConversationPayload, ListMembersOfConversationResponse
} from "typings/apis/messages/listConversation";
const getListConversationURL = "/api/chatting/conversations/list-conversation-with-page";
const getListMembersOfConversationURL = "/api/chatting/conversations/list-members-conversation"

const ListConversationRepository = {
    async getListConversation(payload: ListConversationPayload): Promise<ListConversationResponse> {
        const { data } = await API.get<ListConversationResponse>(
            `${getListConversationURL}?${convertObToUrl(payload)}`
        );

        return data;
    },

    async getListMembersOfConversation(payload: ListMembersOfConversationPayload): Promise<ListMembersOfConversationResponse> {
        const { data } = await API.get<ListMembersOfConversationResponse>(
            `${getListMembersOfConversationURL}?${convertObToUrl(payload)}`
        )

        return data;
    }
};

export default ListConversationRepository;
