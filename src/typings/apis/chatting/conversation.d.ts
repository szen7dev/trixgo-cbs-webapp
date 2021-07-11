import { APIResponse } from "../response";
import { Conversation } from "../../chat";

export type ListConversationOfUserPayload = {
  userID: string;
  currentPage: number;
  nextInfo: string;
};

export type ListConversationOfUserResponse = APIResponse & {
  data: Conversation[];
};
