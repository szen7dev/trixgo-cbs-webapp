import { createContext, Dispatch } from "react";

import { ChatState, ChatActions } from "typings/chat";

export const initialState: ChatState = {
  socket: null,
  conversations: [],
  currentConversation: null,
};

const ChatContext = createContext<{
  state: ChatState;
  dispatch: Dispatch<ChatActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default ChatContext;
