import { FC } from "react";

type Props = {
  avatar: string;
  author: string;
  content: string;
  lastActive: string;
};

const NotificationItem: FC<Props> = ({
  avatar,
  author,
  content,
  lastActive,
}) => {
  return (
    <div className="t-header-notification-item flex items-center cursor-pointer p-3 hover:bg-accent">
      <div className="relative">
        <img
          src={avatar}
          alt="Chat Item Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>

      <div className="flex flex-1 justify-between items-center pl-3">
        <div className="flex flex-col">
          <div className="text-primary-gray font-bold">{author}</div>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="max-w-[250px] text-[15px]"
          />
          <div className="font-normal text-sm leading-4 text-primary">
            {lastActive}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
