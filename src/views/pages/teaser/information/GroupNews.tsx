import { FC } from "react";

import { Disclosure } from "@headlessui/react";

import CaretIcon from "assets/icons/Caret";
import ClockIcon from "assets/icons/Clock";
import DocumentTextIcon from "assets/icons/DocumentText";

const GroupNews: FC = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b-6 border-solid border-secondary-light">
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Bảng tin nhóm</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <ClockIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal border-b border-solid border-secondary-light ml-3">
                Danh sách nhắc hẹn
              </span>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <DocumentTextIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal ml-3">
                Ghi chú, ghim, bình chọn
              </span>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default GroupNews;
