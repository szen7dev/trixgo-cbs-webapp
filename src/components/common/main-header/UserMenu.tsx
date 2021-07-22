import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import { useAuth } from "services/hooks/useAuth";

import ChevronDownIcon from "assets/icons/ChevronDown";
import InformationCircleIcon from "assets/icons/InformationCircle";
import CogIcon from "assets/icons/Cog";
import QuestionMarkCircleIcon from "assets/icons/QuestionMarkCircle";
import MoonIcon from "assets/icons/Moon";
import LogoutIcon from "assets/icons/Logout";

const UserMenu: FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center justify-center">
        <Menu.Button className="flex justify-center items-center group focus:outline-none">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium group-hover:text-dark">
              {`Hi, ${user?.firstName} ${user?.lastName}`}
            </span>

            <ChevronDownIcon className="w-3 h-3 ml-1.5 text-secondary-gray" />
          </div>
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
        <Menu.Items className="absolute -left-52 origin-top-right w-80 bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none p-2 mt-2">
          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-3">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full"
                />
              </div>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="font-normal text-sm leading-4">
                    Xem công việc của bạn
                  </span>
                </div>
              </div>
            </div>
          </Menu.Item>

          {/*  Divider */}
          <hr className="h-px border-secondary-gray my-1 mx-3" />

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <InformationCircleIcon
                  isFill
                  className="w-5 h-5 text-primary-gray"
                />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">Đóng góp ý kiến</span>
                  <span className="font-normal text-sm leading-4">
                    Góp phần cải thiện phiên bản CBS mới
                  </span>
                </div>
              </div>
            </div>
          </Menu.Item>

          {/*  Divider */}
          <hr className="h-px border-secondary-gray my-1 mx-3" />

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <CogIcon isFill className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">
                    Cài đặt &amp; quyền riêng tư
                  </span>
                </div>
              </div>
            </div>
          </Menu.Item>

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <QuestionMarkCircleIcon className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">Trợ giúp &amp; hỗ trợ</span>
                </div>
              </div>
            </div>
          </Menu.Item>

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <MoonIcon className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">Màn hình &amp; trợ năng</span>
                </div>
              </div>
            </div>
          </Menu.Item>

          <Menu.Item onClick={() => signOut()}>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <LogoutIcon className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <span className="font-bold">Đăng xuất</span>
                </div>
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
