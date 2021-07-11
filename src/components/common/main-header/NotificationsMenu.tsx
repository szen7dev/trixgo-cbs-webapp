import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import Popover from "components/shared/Popover";
import NotificationItem from "components/shared/NotificationItem";
import BellIcon from "assets/icons/Bell";
import MailOpenIcon from "assets/icons/MailOpen";
import ArrowsExpandIcon from "assets/icons/ArrowsExpand";

const NotificationsMenu: FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-8 h-8 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-3">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-negative border-2 border-primary-light rounded-full"></div>
          <BellIcon className="w-4 h-4 text-primary-gray" />
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
        <Menu.Items className="absolute -left-44 w-96 origin-top-right bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2">
          <div className="flex justify-between items-center px-4 pt-3">
            <h1 className="font-bold text-2xl leading-7 text-dark">
              Thông báo
            </h1>

            <div className="flex">
              <Popover tooltip="Đánh dấu tất cả là đã đọc">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <MailOpenIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>

              <Popover tooltip="Xem tất cả thông báo">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <ArrowsExpandIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>
            </div>
          </div>

          <div className="p-2">
            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
                badge={<span className="message-symbol" />}
                content="<strong>Khánh Ney</strong> đã cập nhật trạng thái của anh ấy"
                lastActive="3 giờ trước"
                hasSeen={false}
              />
            </Menu.Item>

            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/7/9/0/2/45/120/f573ead9e85e2e06ac3b86072ffc8e4e.jpg"
                badge={<span className="live-stream-symbol" />}
                content="<strong>Nguyễn V. Tuấn</strong> đã phát trực tiếp: 'Đội tuyển Việt Nam vô địch!'"
                lastActive="1 giờ trước"
                hasSeen
              />
            </Menu.Item>

            <Menu.Item>
              <NotificationItem
                avatar="https://s120-ava-talk.zadn.vn/1/e/7/3/5/120/b3fbae654335aec95c35e350a5850017.jpg"
                badge={<span className="video-symbol" />}
                content="<strong>Hiep Nguyen Huu</strong> đã đăng video mới"
                lastActive="2 giờ trước"
                hasSeen={false}
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsMenu;
