import { FC, Fragment } from "react";
import moment from 'moment';

import { Menu, Transition } from "@headlessui/react";

import NotificationItem from "components/shared/NotificationItem";
import iconNotification from "assets/images/icons8-notification-32.png";

import { NotificationProps } from 'typings/notification';

type Props = {
  notifications: NotificationProps[]
}

const NotificationsMenu: FC<Props> = ({ notifications }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-6">
          <span className="absolute -top-1 -right-1 bg-negative pl-1 pr-1 rounded-full text-center text-xs text-primary-light">{notifications.length}</span>
          <img src={iconNotification} alt="Filter" className="w-6 h-6 filter-secondary-gray" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-3 w-96 origin-top-right bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2">
          <div className="font-bold text-2xl leading-7 text-dark px-4 pt-3">
            Thông báo ({notifications.length})
          </div>

          <div className="flex justify-between items-center px-4 pt-3">
            <span className="font-bold text-lg text-dark">
              Mới
            </span>
            <a className="text-primary" href="javascript:void(0)">Xem tất cả</a>
          </div>

          <div className="t-header-notification-item-container overflow-auto">
            {notifications.length && notifications.map(notification => (
              <Menu.Item key={notification._id}>
                <NotificationItem
                  avatar={`${process.env.REACT_APP_URL_S3_USER}/${notification.sender.image}`}
                  author={notification.sender.fullname}
                  content={notification.content}
                  lastActive={moment(notification.createdAt).fromNow()}
                />
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsMenu;
