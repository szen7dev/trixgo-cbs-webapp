import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import Popover from "components/shared/Popover";
import ChatItem from "components/shared/ChatItem";
import SearchIcon from "assets/icons/Search";
import MessagesIcon from "assets/icons/Messages";
import PencilAltIcon from "assets/icons/PencilAlt";
import ArrowsExpandIcon from "assets/icons/ArrowsExpand";
import VideoCameraIcon from "assets/icons/VideoCamera";
import DotsHorizontalIcon from "assets/icons/DotsHorizontal";

const MessagesMenu: FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-8 h-8 inline-flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-3">
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-negative border-2 border-primary-light rounded-full"></div>
          <MessagesIcon className="w-4 h-4" />
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
              Messenger
            </h1>
            <div className="flex">
              <Popover tooltip="Tuỳ chọn">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <DotsHorizontalIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>

              <Popover tooltip="Xem tất cả trong Messenger">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <ArrowsExpandIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>

              <Popover tooltip="Tạo phòng họp mặt mới">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <VideoCameraIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>

              <Popover tooltip="Tin nhắn mới">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none mx-1">
                  <PencilAltIcon className="w-5 h-5 text-primary-gray" />
                </button>
              </Popover>
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
              className="w-full rounded-3xl border-2 bg-secondary-light border-secondary-light text-primary-gray focus:outline-none pl-11 py-1"
            />
          </div>

          <div className="p-2">
            <Menu.Item>
              <ChatItem
                isMe
                hasSeen
                isOnline
                avatar="https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg"
                name="Khánh Ney"
                lastMessage="Đây là tin nhắn cuối cùng sẽ được hiển thị asdasdasdasdasdas Đây là tin nhắn cuối cùng sẽ được hiển thị asdasdasdasdasdas"
                lastActive="2 giờ"
              />
            </Menu.Item>

            <Menu.Item>
              <ChatItem
                isMe={false}
                hasSeen
                isOnline={false}
                avatar="https://s120-ava-talk.zadn.vn/1/e/7/3/5/120/b3fbae654335aec95c35e350a5850017.jpg"
                name="Hiep Nguyen Huu"
                lastMessage="Đây là tin nhắn"
                lastActive="5 ngày"
              />
            </Menu.Item>

            <Menu.Item>
              <ChatItem
                isMe
                hasSeen={false}
                isOnline
                avatar="https://s120-ava-talk.zadn.vn/7/9/0/2/45/120/f573ead9e85e2e06ac3b86072ffc8e4e.jpg"
                name="Nguyễn V. Tuấn"
                lastMessage="@@"
                lastActive="vừa xong"
              />
            </Menu.Item>

            <Menu.Item>
              <ChatItem
                isMe={false}
                hasSeen={false}
                isOnline
                avatar="https://s120-ava-talk.zadn.vn/5/7/7/5/47/120/c35762b97c72cc6d8460dba5be6f8ee2.jpg"
                name="User"
                lastMessage="Đây là tin nhắn sẽ được hiển thị"
                lastActive="3 phút"
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MessagesMenu;
