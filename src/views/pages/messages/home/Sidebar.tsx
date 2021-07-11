import { FC } from "react";

import { map as _map } from "lodash";

import { useAuth } from "services/hooks/useAuth";

import ChatItem from "components/shared/ChatItem";
import DotsHorizontalIcon from "assets/icons/DotsHorizontal";
import VideoCameraIcon from "assets/icons/VideoCamera";
import PencilAltIcon from "assets/icons/PencilAlt";
import SearchIcon from "assets/icons/Search";

import { getMessageTimeDuration } from "helpers/time";

import { Conversation } from "typings/chat";

type Props = {
  conversations: Conversation[] | undefined;
};

const MessagesSidebar: FC<Props> = ({ conversations }) => {
  const { user } = useAuth();

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

          <button className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none">
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
        {_map(conversations, (conversation, idx: number) => (
          <ChatItem
            key={conversation._id}
            isMe={
              conversation.lastMessage &&
              conversation.lastMessage.sender._id === user?._id
            }
            hasSeen={conversation.lastMessage?.status === 1}
            isOnline
            avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
            name={conversation.name}
            lastMessage={
              conversation.lastMessage ? conversation.lastMessage.content : ""
            }
            lastActive={
              conversation.lastMessage
                ? getMessageTimeDuration(conversation.lastMessage.modifyAt)
                : ""
            }
            isActive={idx === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesSidebar;
