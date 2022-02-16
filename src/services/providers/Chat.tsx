import { ReactNode, FC, useReducer } from "react";

import ChatContext, { initialState } from "services/contexts/Chat";

import { ChatState, ChatActions } from "typings/chat";

type Props = {
  children: ReactNode;
};

const reducer = (state: ChatState, action: ChatActions): ChatState => {
  switch (action.type) {
    case "CONNECT_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "DISCONNECT_SOCKET":
      return {
        ...state,
        socket: null,
      };
    case "SET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload,
      };
    case "SET_CURRENT_CONVERSATION":
      return {
        ...state,
        currentConversation: action.payload,
      };
    default:
      return state;
  }
};

const ChatProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: ChatState, action: ChatActions) => ChatState
  >(reducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
