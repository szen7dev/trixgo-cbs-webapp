import { FC } from "react";

import { Disclosure } from "@headlessui/react";

import CaretIcon from "assets/icons/Caret";
import UsersIcon from "assets/icons/Users";
import CogIcon from "assets/icons/Cog";

const GroupMembers: FC = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b-6 border-solid border-secondary-light">
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Thành viên nhóm</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <UsersIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal border-b border-solid border-secondary-light ml-3">
                7 thành viên
              </span>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <CogIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal border-b border-solid border-secondary-light ml-3">
                Quản lý nhóm, thành viên
              </span>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default GroupMembers;
