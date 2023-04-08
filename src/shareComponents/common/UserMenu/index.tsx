import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import CogIcon from "assets/icons/Cog";
import LogoutIcon from "assets/icons/Logout";
import { useAuth } from "services/hooks/auth/useAuth";

export const UserMenu: FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center justify-center ml-6">
        <Menu.Button className="flex justify-center items-center group focus:outline-none border rounded-lg border-primary-border p-1.5">
          <span className={"text-2xl text-primary-gray mr-2"}>
              Tài khoản
          </span>
          <img
            src={`${process.env.REACT_APP_URL_S3_USER}/${user?.image}`}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
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
        <Menu.Items className="absolute -left-44 origin-top-right w-80 bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none p-2 mt-2 z-200">
          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-3">
              <div className="relative">
                <img
                  src={`${process.env.REACT_APP_URL_S3_USER}/${user?.image}`}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full"
                />
              </div>

              <div className="flex flex-1 justify-between items-center pl-3">
                <Link to={`/pcm/home`} className="flex flex-col">
                  <span className="font-bold">{user?.fullname}</span>
                  <span className="font-normal text-sm leading-4">
                    Xem hồ sơ của bạn
                  </span>
                </Link>
              </div>
            </div>
          </Menu.Item>

          {/*  Divider */}
          {/* <hr className="h-px border-secondary-gray my-1 mx-3" />

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <InformationCircleIcon
                  isFill
                  className="w-5 h-5 text-primary-gray"
                />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <Link to={`/help`} className="flex flex-col">
                  <span className="font-bold">Đóng góp ý kiến</span>
                  <span className="font-normal text-sm leading-4">
                    Góp phần cải thiện phiên bản mới
                  </span>
                </Link>
              </div>
            </div>
          </Menu.Item> */}

          {/*  Divider */}
          <hr className="h-px border-secondary-gray my-1 mx-3" />

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <CogIcon isFill className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <Link to={`/personal/home`} className="font-bold">
                    Tài khoản
                  </Link>
                </div>
              </div>
            </div>
          </Menu.Item>

          {/* <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <CogIcon isFill className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <Link to={`/owner/home`} className="font-bold">
                    Quản trị viên doanh nghiệp
                  </Link>
                </div>
              </div>
            </div>
          </Menu.Item> */}

          {/* <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3">
              <Menu.Button className="w-9 h-9 inline-flex items-center justify-center bg-secondary-light transition duration-150 rounded-full focus:outline-none">
                <QuestionMarkCircleIcon className="w-5 h-5 text-primary-gray" />
              </Menu.Button>

              <div className="flex flex-1 justify-between items-center pl-3">
                <div className="flex flex-col">
                  <Link to={`/help/home`} className="font-bold">
                    Trung tâm Trợ giúp
                  </Link>
                </div>
              </div>
            </div>
          </Menu.Item> */}

          <Menu.Item>
            <div className="flex items-center rounded-lg cursor-pointer hover:bg-lighter-gray p-2 pl-3" onClick={() => signOut()}>
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