import {
    ListFileMessagePayload,
    ListFileMessageResponse,
    ListLinksMessagePayload,
    ListLinksMessageResponse,
    ListMembersMessagePayload, ListMembersMessageResponse,
    ListReactionMessagePayload,
    ListReactionMessageResponse,
} from "typings/apis/messages/listConversation";
import API from "../repository";
import {convertObToUrl} from "../../utils";

const listFileMessage = "/api/chatting/conversations/list-file-conversation";
const listLinksMessage = "/api/chatting/conversations/list-link-conversation";
const listMembersMessage = "/api/chatting/conversations/list-members-conversation";

const InformationMessageRepository = {
    async getListFilesMessage(payload: ListFileMessagePayload) : Promise<ListFileMessageResponse> {
        const {data} = await API.get(
            `${listFileMessage}?${convertObToUrl(payload)}`,
        )

        return data;
    },

    async getListLinksMessage(payload: ListLinksMessagePayload) : Promise<ListLinksMessageResponse> {
        const {data} = await API.get(
            `${listLinksMessage}?${convertObToUrl(payload)}`,
        )

        return data;
    },

    async getListMembersMessage(payload: ListMembersMessagePayload) : Promise<ListMembersMessageResponse> {
        const {data} = await API.get(
            `${listMembersMessage}?${convertObToUrl(payload)}`,
        )

        return data;
    },
}
export default InformationMessageRepository;