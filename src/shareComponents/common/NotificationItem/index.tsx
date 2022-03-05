import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { NotificationProps } from "typings/notification";
// import { APP_INFO } from "shareComponents/common";

type Props = {
  notification: NotificationProps
};

export const NotificationItem: FC<Props> = ({ notification }) => {
  // const [title, setTitle] = useState('');
  if(!notification) return <></>;

  const { sender, content, path, createAt } = notification;

  // useEffect(() => {
  //   if(!app) return;

  //   switch (app) {
  //     case APP_INFO.get(app)?.key:
        
  //       break;
    
  //     default:
  //       break;
  //   }
  // }, [])

  return (
    <Link to={path} className="t-header-notification-item flex items-center cursor-pointer p-3 hover:bg-accent">
      <div className="relative">
        <img
          src={`${process.env.REACT_APP_URL_S3_USER}/${sender?.image}`}
          alt="Chat Item Avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>

      <div className="flex flex-1 justify-between items-center pl-3">
        <div className="flex flex-col">
          <div className="text-primary-gray font-bold">{sender.bizfullname}</div>
          <div
            dangerouslySetInnerHTML={{ __html: content?.length > 100 ? `${content.substring(0, 100)}...` : content }}
            className="max-w-[250px] text-[15px]"
          />
          <div className="font-normal text-sm leading-4 text-primary">
            {moment(createAt).fromNow()}
          </div>
        </div>
      </div>
    </Link>
  );
};