import API from "apis/repository";

import {
  ListConversationOfUserPayload,
  ListConversationOfUserResponse,
} from "typings/apis/chatting/conversation";
import { LIST_CONVERSATION_OF_USER_API_URL } from "utils/constants";

const ConversationRepository = {
  async listConversationOfUser(
    params: ListConversationOfUserPayload
  ): Promise<ListConversationOfUserResponse> {
    const { data } = await API.get<ListConversationOfUserResponse>(
      LIST_CONVERSATION_OF_USER_API_URL,
      { params }
    );

    return data;
  },
};

export default ConversationRepository;
