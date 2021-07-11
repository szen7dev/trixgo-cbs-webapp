import { useContext, useEffect } from "react";

import io, { Socket } from "socket.io-client";

import ChatContext from "services/contexts/Chat";
import { useAuth } from "./useAuth";

import { SSC_ONLINE_USER_CB, CSS_SEND_MESSAGE_PAYLOAD } from "typings/chat";

const SOCKET_SERVER_URL = "https://websocket-cbs.trixgo.com";

type UseChat = {
  socket: Socket;
  sendMessages: (payload: CSS_SEND_MESSAGE_PAYLOAD) => void;
};

export const useChat = (): UseChat => {
  const { dispatch, state } = useContext(ChatContext);

  const { user, token } = useAuth();

  const sendMessages = (payload: CSS_SEND_MESSAGE_PAYLOAD): void => {
    // Send messages
    state.socket.emit("CSS_SEND_MESSAGE", payload);
  };

  useEffect(() => {
    if (!!user && !!token) {
      const socket = io(`${SOCKET_SERVER_URL}?token=${token}`);
      dispatch({
        type: "CONNECT_SOCKET",
        payload: socket,
      });

      socket.on("SSC_ONLINE_USER", (response: SSC_ONLINE_USER_CB) => {
        console.log(response);
      });
    }
  }, [user, token, dispatch]);

  return {
    socket: state.socket,
    sendMessages,
  };
};
