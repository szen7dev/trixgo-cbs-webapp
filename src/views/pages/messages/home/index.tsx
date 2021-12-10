import { FC } from "react";

import MessagesSidebar from "./sidebar";
import WelcomeChatting from "./welcome";
import MessagesContent from "./content";

const MessagesPage: FC = () => {
  const currentConversation = true; // hard code fake data
  return (
    <>
      <MessagesSidebar />

      {!currentConversation ? <WelcomeChatting /> : <MessagesContent />}
    </>
  );
};

export default MessagesPage;
