import { APIResponse } from "./response";
import { Conversation } from "../chat";

export type GetConversationsByUserPayload = {
  userId: string;
  lastRoomModifiedAt?: string;
  currentPage: number;
  pageSize: number;
};

export type GetConversationsResponse = APIResponse & {
  result: {
    conversations: Conversation[];
    hasNextPage: boolean;
  };
};

export type CreateConversationPayload = {
  name: string;
  logo: string[];
  userIds: string[];
};

export type CreateConversationResponse = APIResponse & {
  result: Conversation;
};
