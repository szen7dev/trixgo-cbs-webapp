import { FC, useEffect } from "react";

import { useAuth } from "services/hooks/useAuth";
import { useChat } from "services/hooks/useChat";

import MessagesSidebar from "./sidebar";
import WelcomeChatting from "./welcome";
import MessagesContent from "./content";

const MessagesPage: FC = () => {
  const { fetchFriendContacts } = useAuth();
  const { currentConversation, fetchConversations } = useChat();

  useEffect(() => {
    fetchConversations();
    fetchFriendContacts();
  }, [fetchConversations, fetchFriendContacts]);

  return (
    <>
      <MessagesSidebar />

      {!currentConversation ? <WelcomeChatting /> : <MessagesContent />}
    </>
  );
};

export default MessagesPage;
