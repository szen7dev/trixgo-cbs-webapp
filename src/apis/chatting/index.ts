import API from "apis/repository";

import {
  GetConversationsByUserPayload,
  GetConversationsResponse,
  CreateConversationPayload,
  CreateConversationResponse,
} from "typings/apis/chatting";
import { GET_CONVERSATION_BY_USER_API_URL } from "utils/constants";

const roomsURL = "/rooms";

const ChattingRepository = {
  async getConversations(
    params: GetConversationsByUserPayload
  ): Promise<GetConversationsResponse> {
    const { data } = await API.get<GetConversationsResponse>(
      `${roomsURL}${GET_CONVERSATION_BY_USER_API_URL}`,
      { params }
    );

    return data;
  },
  async createConversation(
    payload: CreateConversationPayload
  ): Promise<CreateConversationResponse> {
    const { data } = await API.post<CreateConversationResponse>(
      roomsURL,
      payload
    );

    return data;
  },
};

export default ChattingRepository;
