import {
    ListReactionMessagePayload, ListReactionMessageResponse,
} from "typings/apis/messages/listConversation";
import API from "../repository";
import {convertObToUrl} from "../../utils";

const listReactionMessage = "/api/chatting/conversations/list-reaction-message-conversation";

const ReactionMessageRepository = {
    async getListReactionMessage(payload: ListReactionMessagePayload) : Promise<ListReactionMessageResponse> {
        const {data} = await API.get(
            `${listReactionMessage}?${convertObToUrl(payload)}`,
        )

        return data;
    },
}
export default ReactionMessageRepository;