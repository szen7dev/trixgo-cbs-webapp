import { FC, useState } from "react";
import moment from 'moment';
import cn from 'classnames';
import { NotificationProps } from "typings/notification";

type Props = {
  notification: NotificationProps;
  onClick?: (notification: NotificationProps) => void;
};

export const NotificationItem: FC<Props> = ({ notification, onClick }) => {
  const [isRead, setIsRead] = useState([1,2].includes(notification.status));
  if(!notification) return <></>;

  const { sender, content, createAt } = notification;

  const handleClickNotification = () => {
    onClick && onClick(notification);
    setIsRead(true);
  }

  return (
    <button
      onClick={handleClickNotification}
      className={cn("w-full t-header-notification-item flex items-center cursor-pointer p-3 hover:bg-accent", {
        // "bg-gray-200": !isRead
      })}
    >
      <div className="relative">
        <img
          src={`${process.env.REACT_APP_URL_S3_USER}/${sender?.image}`}
          alt="Chat Item Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>

      <div className="flex flex-1 justify-between items-center pl-3">
        <div className="flex flex-col text-left">
          <div className="text-primary-gray font-bold">{sender.bizfullname}</div>
          {/* <div
            dangerouslySetInnerHTML={{ __html: content?.length > 100 ? `${content.substring(0, 100)}...` : content }}
            className="max-w-[250px] text-[15px]"
          /> */}
          <div className="max-w-[250px] text-[15px]">
            {content?.length > 100 ? `${content.substring(0, 100)}...` : content}
          </div>
          <div className="font-normal text-sm leading-4 text-primary">
            {moment(createAt).fromNow()}
          </div>
        </div>
        {isRead && <div className="rounded-full w-[10px] h-[10px] bg-blue-400"></div>}
      </div>
    </button>
  );
};