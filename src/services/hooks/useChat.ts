import { useContext, useEffect } from "react";

import io, { Socket } from "socket.io-client";
import {
  useQuery,
  useMutation,
  RefetchOptions,
  QueryObserverResult,
} from "react-query";
import { toast } from "react-toastify";

import ChatContext from "services/contexts/Chat";
import { useAuth } from "./useAuth";
import { useModal } from "./useModal";
import ChattingRepository from "apis/chatting";

import { Conversation, SendMessagePayload } from "typings/chat";
import { CreateConversationPayload } from "typings/apis/chatting";

type UseChat = {
  socket: typeof Socket;
  isLoading: boolean;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  fetchConversations: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<void, unknown>>;
  handleSelectConversation: (conversation: Conversation) => void;
  createConversation: (payload: CreateConversationPayload) => Promise<void>;
  sendMessages: (payload: SendMessagePayload) => void;
};

export const useChat = (): UseChat => {
  const { dispatch, state } = useContext(ChatContext);
  const { user, accessToken, signOut } = useAuth();
  const { closeModal } = useModal();

  const { refetch: fetchConversations, isLoading: isGettingConversations } =
    useQuery(
      "getConversations",
      async () => {
        try {
          const { isSuccess, message, result } =
            await ChattingRepository.getConversations({
              userId: user?._id as string,
              currentPage: 0,
              pageSize: 20,
            });

          if (isSuccess) {
            dispatch({
              type: "SET_CONVERSATIONS",
              payload: result.conversations,
            });
          } else {
            toast.error(message);
          }
        } catch (error) {
          toast.error(error.message);
          throw new Error(error.message);
        }
      },
      {
        enabled: false,
        refetchOnWindowFocus: false,
      }
    );
  const {
    mutateAsync: createConversationMutateAsync,
    isLoading: isCreatingConversation,
  } = useMutation(
    async (payload: CreateConversationPayload) =>
      await ChattingRepository.createConversation(payload)
  );

  const handleSelectConversation = (conversation: Conversation) => {
    dispatch({
      type: "SET_CURRENT_CONVERSATION",
      payload: conversation,
    });
  };

  const createConversation = async (
    payload: CreateConversationPayload
  ): Promise<void> => {
    const { isSuccess, message, result } = await createConversationMutateAsync(
      payload
    );

    if (isSuccess) {
      dispatch({
        type: "SET_CONVERSATIONS",
        payload: [...[result], ...state.conversations],
      });
    }

    closeModal();

    toast(message, {
      type: isSuccess ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
    });
  };

  const sendMessages = (payload: SendMessagePayload): void => {
    state.socket.emit("sendMessage", payload);
  };

  useEffect(() => {
    if (!!user && !!accessToken && !state.socket) {
      const socket = io(process.env.REACT_APP_API_DOMAIN as string, {
        query: { accessToken },
      });

      dispatch({
        type: "CONNECT_SOCKET",
        payload: socket,
      });

      socket.on("disconnect", () => {
        dispatch({
          type: "DISCONNECT_SOCKET",
        });
        signOut();
      });

      // socket.on("users", (users: string[]) => {
      //   console.log(users);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket: state.socket,
    isLoading: isCreatingConversation || isGettingConversations,
    conversations: state.conversations,
    currentConversation: state.currentConversation,
    fetchConversations,
    handleSelectConversation,
    createConversation,
    sendMessages,
  };
};
