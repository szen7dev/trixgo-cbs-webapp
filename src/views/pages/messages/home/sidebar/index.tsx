import { CSSProperties, FC } from "react";

import { List } from "react-virtualized";

import { useAuth } from "services/hooks/useAuth";
import { useModal } from "services/hooks/useModal";
import { useChat } from "services/hooks/useChat";
import { useWindowDimensions } from "services/hooks/useWindowDimensions";

import ChatItem from "components/shared/ChatItem";
import CreateConversationDialog from "./CreateConversationDialog";
import DotsHorizontalIcon from "assets/icons/DotsHorizontal";
import VideoCameraIcon from "assets/icons/VideoCamera";
import PencilAltIcon from "assets/icons/PencilAlt";
import SearchIcon from "assets/icons/Search";

import { getMessageTimeDuration } from "helpers/time";

const MessagesSidebar: FC = () => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { conversations, currentConversation, handleSelectConversation } =
    useChat();
  const { height } = useWindowDimensions();

  const conversationRender = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: CSSProperties;
  }) => {
    const { _id, messages, logo, name } = conversations[index];
    const lastMessage = messages[messages.length - 1];

    return (
      <div
        key={key}
        style={style}
        onClick={() => handleSelectConversation(conversations[index])}
      >
        <ChatItem
          isMe={lastMessage && lastMessage.senderId === user?._id}
          hasSeen={lastMessage?.status === 1}
          isOnline
          avatar={logo[1]}
          name={name}
          lastMessage={lastMessage ? lastMessage.content : ""}
          lastActive={
            lastMessage ? getMessageTimeDuration(lastMessage.modifiedAt) : ""
          }
          isActive={_id === currentConversation?._id}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-96 h-full border-r border-secondary-light">
      <div className="flex justify-between items-center px-4 pt-3">
        <h1 className="font-bold text-2xl leading-7 text-dark">Chats</h1>
        <div className="grid grid-cols-3 gap-3">
          <button className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none">
            <DotsHorizontalIcon className="w-6 h-6 text-primary-gray" />
          </button>

          <button className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none">
            <VideoCameraIcon className="w-6 h-6 text-primary-gray" />
          </button>

          <button
            className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none"
            onClick={() =>
              openModal(
                <div className="inline-block w-1/4 overflow-hidden align-top transition-all transform bg-primary-light shadow-xl rounded mt-28">
                  <CreateConversationDialog />
                </div>
              )
            }
          >
            <PencilAltIcon className="w-6 h-6 text-primary-gray" />
          </button>
        </div>
      </div>

      <div className="relative mt-1 p-3">
        <button
          type="submit"
          aria-label="Search"
          className="absolute inset-0 left-3 right-auto"
        >
          <SearchIcon className="w-4 h-4 flex-shrink-0 ml-4 mr-2" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-3xl border-2 bg-lighter-gray border-lighter-gray text-primary-gray focus:outline-none pl-11 py-1"
        />
      </div>

      {/*  Divider */}
      <hr className="h-px border-secondary-light mx-3" />

      {/* Message list */}
      <div className="content-sidebar-height py-1 px-2">
        <List
          width={367}
          height={height - 189}
          rowCount={conversations.length}
          rowHeight={80}
          rowRenderer={conversationRender}
        />
      </div>
    </div>
  );
};

export default MessagesSidebar;
