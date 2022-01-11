import API from "../repository";
import { convertObToUrl } from "helpers";

import {ListConversationPayload, ListConversationResponse} from "typings/apis/messages/listConversation";

const getListConversationURL = "/api/chatting/conversations/list-conversation-with-page";

const ListConversationRepository = {
    async getListConversation(payload: ListConversationPayload): Promise<ListConversationResponse> {
        console.log("payload: ", payload);
        const { data } = await API.get<ListConversationResponse>(
            `${getListConversationURL}?${convertObToUrl(payload)}`
        );

        return data;
    },
};

export default ListConversationRepository;
