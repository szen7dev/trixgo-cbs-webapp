import { ReactNode, FC } from "react";

import cn from "classnames";

type Props = {
  avatar: string;
  badge: ReactNode;
  content: string;
  lastActive: string;
  hasSeen: boolean;
};

const NotificationItem: FC<Props> = ({
  avatar,
  badge,
  content,
  lastActive,
  hasSeen,
}) => {
  return (
    <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-3">
      <div className="relative">
        <img
          src={avatar}
          alt="Chat Item Avatar"
          className="w-14 h-14 rounded-full"
        />
        {<span className="absolute -bottom-1 -right-1 flex">{badge}</span>}
      </div>

      <div className="flex flex-1 justify-between items-center pl-3">
        <div className="flex flex-col">
          <span
            dangerouslySetInnerHTML={{ __html: content }}
            className="max-w-[250px] font-normal text-base overflow-hidden"
          />
          <span
            className={cn("font-normal text-sm leading-4", {
              "text-secondary font-semibold": !hasSeen,
            })}
          >
            {lastActive}
          </span>
        </div>
        {!hasSeen && (
          <span className="w-3 h-3 rounded-full bg-secondary"></span>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
