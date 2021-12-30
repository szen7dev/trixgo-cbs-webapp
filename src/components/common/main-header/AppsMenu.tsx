import { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import iconGrid from "assets/images/icons8-menu-100.png";
import iconSearch from "assets/images/icons8-search-50.png";
import appLogo from "assets/images/trixgo-logo.png";
import { Link } from 'react-router-dom';

const AppsMenu: FC = () => {
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
        <Menu.Items className="absolute -right-3 w-80 origin-top-right bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2 pt-4 pr-4 pl-4 pb-1">
          <div className="font-bold text-2xl leading-7 text-dark pt-2 mb-4">Ứng dụng</div>
          <div className="t-header-app-search relative mb-5">
            <img src={iconSearch} alt="Filter" className="w-6 h-6 filter-primary-gray absolute top-2 left-3" />
            <input onKeyDown={handleSearchTextKeyboardEvent} className="h-10 border-0 bg-secondary-light w-full pr-3 pl-12 outline-none" type="text" placeholder="Tìm kiếm" />
          </div>
          <div className="flex flex-wrap">
            <Link to={`/support/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Supporter</span>
            </Link>
            <Link to={`/social/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Truyền thông</span>
            </Link>
            <Link to={`/pcm/projects`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý dự án</span>
            </Link>
            <Link to={`/cmcs/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý hợp đồng</span>
            </Link>
            <Link to={`/document/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý hồ sơ văn bản</span>
            </Link>
            <Link to={`/bidding/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Đấu thầu</span>
            </Link>
            <Link to={`/fin/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản trị tài chính</span>
            </Link>
            <Link to={`/human/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý nhân sự</span>
            </Link>
            <Link to={`/accounting/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Kế toán</span>
            </Link>
            <Link to={`/operation/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý vận hành</span>
            </Link>
            <Link to={`/timesheet/home`} className="w-1/3 pl-2 pr-2 mb-3 text-center leading-tight">
              <img src={appLogo} alt="Filter" className="w-10 h-10 mb-1 ml-auto mr-auto" />
              <span className="block">Quản lý chấm công</span>
            </Link>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AppsMenu;
