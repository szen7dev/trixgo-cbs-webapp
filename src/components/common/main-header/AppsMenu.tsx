import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import iconGrid from "assets/images/icons8-menu-100.png";
import iconSearch from "assets/images/icons8-search-50.png";
import appLogo from "assets/images/trixgo-logo.png";

const AppsMenu: FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="w-10 h-10 inline-flex items-center justify-center transition duration-150 focus:outline-none ml-6">
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
        <Menu.Items className="absolute -right-3 w-80 origin-top-right bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2 pt-4 pr-4 pl-4 pb-1">
          <div className="t-header-app-search">
            <img src={iconSearch} alt="Filter" className="w-6 h-6 filter-primary-gray" />
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div className="t-header-app-search-results">
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Quản lý dự án</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>App</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Trixgo 1234</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Quản lý dự án</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Trixgo 1234</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Quản lý dự án</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>App</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>App</span>
            </a>
            <a href="/">
              <img src={appLogo} alt="Filter" className="w-10 h-10" />
              <span>Trixgo 1234</span>
            </a>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AppsMenu;
