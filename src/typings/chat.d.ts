import { Socket } from "socket.io-client";

import { User } from "./auth";

/**
 * ? Message Status Code
 * * 0 --> sent but not received
 * * 1 --> seen
 * * 2 --> received
 * * 3 --> shared
 */
enum MessageStatus {
  0 = 0,
  1 = 1,
  2 = 2,
  3 = 3,
}

export type SSC_ONLINE_USER_CB = {
  listFriendOnline: string[];
};

export type CSS_SEND_MESSAGE_PAYLOAD = {
  tempID: string;
  conversationID: string;
  messageID: string;
  isLikeIcon: boolean;
  isShareMessage: boolean;
  messageShareID: string;
  content: string;
};

export type MessageChat = {
  _id: string;
  createAt: string;
  modifyAt: string;
  sender: User;
  status: MessageStatus;
  content: string;
};

export type Conversation = {
  _id: string;
  logo: string;
  name: string;
  members: string[];
  author: string[];
  lastMessage: MessageChat;
};

export type ChatState = {
  socket: Socket | null;
  conversations: Conversation[];
  messagesChat: MessageChat[];
};

export type ChatActionType = "CONNECT_SOCKET";
export type ConnectSocket = {
  type: "CONNECT_SOCKET";
  payload: Socket;
};
export type ChatActions = ConnectSocket;
