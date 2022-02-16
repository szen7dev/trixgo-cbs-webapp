import { Socket } from "socket.io-client";

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

export type MessageChat = {
  _id: string;
  roomId: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  createAt: string;
  modifiedAt: string;
};

export type Conversation = {
  _id: string;
  name: string;
  logo: string[];
  userIds: string[];
  messages: MessageChat[];
  createAt: string;
  modifiedAt: string;
};

export type SendMessagePayload = {
  roomId: string;
  senderId: string;
  content: string;
};

export type ChatState = {
  socket: Socket | null;
  conversations: Conversation[];
  currentConversation: Conversation | null;
};

export type ConnectSocket = {
  type: "CONNECT_SOCKET";
  payload: Socket;
};
export type DisconnectSocket = {
  type: "DISCONNECT_SOCKET";
};
export type SetConversations = {
  type: "SET_CONVERSATIONS";
  payload: Conversation[];
};
export type SetCurrentConversation = {
  type: "SET_CURRENT_CONVERSATION";
  payload: Conversation;
};
export type ChatActions =
  | ConnectSocket
  | DisconnectSocket
  | SetConversations
  | SetCurrentConversation;
