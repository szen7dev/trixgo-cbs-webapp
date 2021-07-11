import { FC } from "react";

import cn from "classnames";

import CheckCircleIcon from "assets/icons/CheckCircle";

type Props = {
  isMe: boolean;
  hasSeen: boolean;
  isOnline: boolean;
  avatar: string;
  name: string;
  lastMessage: string;
  lastActive: string;
  isActive?: boolean;
};

const ChatItem: FC<Props> = ({
  isMe,
  hasSeen,
  isOnline,
  avatar,
  name,
  lastMessage,
  lastActive,
  isActive = false,
}) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-lg cursor-pointer py-3 pl-2 pr-2.5",
        {
          "hover:bg-lighter-gray": !isActive,
          "bg-secondary bg-opacity-10": isActive,
        }
      )}
    >
      <div className="relative w-max h-max">
        <img
          src={avatar}
          alt="Chat Item Avatar"
          className="w-14 h-14 rounded-full"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-positive border-2 border-primary-light"></span>
        )}
      </div>

      <div className="flex flex-grow justify-between items-center pl-3">
        <div className="flex flex-col">
          <span className="max-w-[250px] truncate font-normal text-base">
            {name}
          </span>
          <span className="flex font-normal text-sm leading-4">
            <span className="max-w-[169px] truncate">
              {isMe && "Bạn: "}
              {lastMessage}
            </span>
            <span>&nbsp; . &nbsp; {lastActive}</span>
          </span>
        </div>
        {hasSeen ? (
          <>
            {isMe && (
              <img
                src={avatar}
                alt="Chat Item Avatar"
                className="w-4 h-4 rounded-full"
              />
            )}
          </>
        ) : (
          <>
            {isMe ? (
              <CheckCircleIcon className="w-4 h-4 text-secondary-gray" />
            ) : (
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
