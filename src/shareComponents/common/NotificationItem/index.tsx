import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  avatar: string;
  author: string;
  content: string;
  path: string;
  lastActive: string;
};

export const NotificationItem: FC<Props> = ({
  avatar,
  author,
  content,
  path,
  lastActive,
}) => {
  return (
    <Link to={path} className="t-header-notification-item flex items-center cursor-pointer p-3 hover:bg-accent">
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
            dangerouslySetInnerHTML={{ __html: content.length > 100 ? `${content.substring(0, 100)}...` : content }}
            className="max-w-[250px] text-[15px]"
          />
          <div className="font-normal text-sm leading-4 text-primary">
            {lastActive}
          </div>
        </div>
      </div>
    </Link>
  );
};

NotificationItem.defaultProps = {
  path: ''
}