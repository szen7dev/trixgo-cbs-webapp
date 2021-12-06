import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import NotificationItem from "components/shared/NotificationItem";
import BellIcon from "assets/icons/Bell";

const NotificationsMenu: FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-10 h-10 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-6">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-negative border-2 border-primary-light rounded-full"></div>
          <BellIcon className="w-5 h-5 text-primary-gray" />
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
            Thông báo (25)
          </div>

          <div className="flex justify-between items-center px-4 pt-3">
            <span className="font-bold text-lg text-dark">
              Mới
            </span>
            <a className="text-primary" href="/">Xem tất cả</a>
          </div>

          <div className="t-header-notification-item-container overflow-auto">
            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
                author="Nguyen Manh Luan"
                content="Tạo một mẩu tin tại <span class='text-secondary'>Dự án Demo</span> thuộc ứng dụng TrixGo PCM"
                lastActive="Cách đây 54 phút"
              />
            </Menu.Item>

            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/7/9/0/2/45/120/f573ead9e85e2e06ac3b86072ffc8e4e.jpg"
                author="Nguyen Manh Luan"
                content="Tạo một mẩu tin tại <span class='text-secondary'>Dự án Demo</span> thuộc ứng dụng TrixGo PCM"
                lastActive="Cách đây 54 phút"
              />
            </Menu.Item>

            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/1/e/7/3/5/120/b3fbae654335aec95c35e350a5850017.jpg"
                author="Nguyen Manh Luan"
                content="Tạo một mẩu tin tại <span class='text-secondary'>Dự án Demo</span> thuộc ứng dụng TrixGo PCM"
                lastActive="Cách đây 54 phút"
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsMenu;
