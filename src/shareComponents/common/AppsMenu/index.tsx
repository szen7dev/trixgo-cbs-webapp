import { FC, Fragment, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Menu, Transition } from "@headlessui/react";

import iconGrid from "assets/images/icons8-menu-100.svg";
import iconSearch from "assets/images/icons8-search-50.png";
import supportLogo from "assets/logos/support.png";

import API from "apis/repository";
import { APP_INFO as AppInfo } from "./components";
import { useAuth } from "services/hooks/auth/useAuth";
import { useGetListAppOfUser } from "services/hooks/auth/usePermissions";

export const APP_INFO = AppInfo;
export const AppsMenu: FC = () => {
  const { listAppOfUser, refetchAppUsers } = useGetListAppOfUser();
  const { user } = useAuth();

  // console.log(listAppOfUser)
  
  useEffect(() => {
    if (API.defaults.headers.Authorization) {
      refetchAppUsers();
    }
  }, [API.defaults.headers.Authorization]);

  const handleSearchTextKeyboardEvent = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-10 h-10 inline-flex items-center justify-center transition duration-150 focus:outline-none ml-6 rounded-md bg-primary-light hover:bg-secondary-light">
          <img src={iconGrid} alt="Filter" className="w-6 h-6 filter-secondary-gray" />
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
        <Menu.Items className="absolute right-0 w-80 bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2 pt-4 pr-4 pl-4 pb-1 z-200">
          <div className="flex flex-wrap">
            {listAppOfUser.map((item, index) => (
              <Link key={index} to={AppInfo.get(item?.app?._id)?.route || '/'} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
                <img src={AppInfo.get(item?.app?._id)?.icon} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
                <span className="block">{AppInfo.get(item?.app?._id)?.name}</span>
              </Link>
            ))
            }
          </div>

          {user && user?.email === "contact@trixgo.com" ?
            <div className="flex flex-wrap">
                <Link key={50} to={'/support/home'} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
                  <img src={supportLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
                  <span className="block">Support</span>
                </Link>
            </div>: <></>
          }
          
        </Menu.Items>
      </Transition>
    </Menu>
  );
};