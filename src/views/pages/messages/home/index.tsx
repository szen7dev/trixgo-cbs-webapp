import { FC, useEffect } from "react";

import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { useChat } from "services/hooks/useChat";
import ConversationRepository from "apis/chatting/conversation";

import MessagesSidebar from "./Sidebar";
import MessagesContent from "./content";

const MessagesPage: FC = () => {
  const {
    refetch: fetchConversations,
    isLoading: isGettingConversations,
    data: conversationsData,
  } = useQuery(
    "getConversations",
    () =>
      ConversationRepository.listConversationOfUser({
        userID: "5e60f58cf63b8a4e196a1942",
        currentPage: 1,
        nextInfo: "1",
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { socket } = useChat();

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <>
      <InfiniteScroll
        dataLength={conversationsData ? conversationsData.data.length : 0}
        next={fetchConversations}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <MessagesSidebar conversations={conversationsData?.data} />
      </InfiniteScroll>

      <MessagesContent />
    </>
  );
};

export default MessagesPage;
