import { FC, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { Switch } from "@headlessui/react";

import CaretIcon from "assets/icons/Caret";
import ExclamationIcon from "assets/icons/Exclamation";
import EyeOffIcon from "assets/icons/EyeOff";
import LogoutIcon from "assets/icons/Logout";
import TrashIcon from "assets/icons/Trash";

const OtherSettings: FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Cài đặt khác</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <ExclamationIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal border-b border-solid border-secondary-light ml-3">
                Báo xấu
              </span>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <EyeOffIcon className="w-6 h-6 text-primary-gray" />
              <span className="flex items-center flex-1 h-14 font-normal border-b border-solid border-secondary-light ml-3">
                Tắt thông báo
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-primary" : "bg-secondary-gray"}
          relative inline-flex flex-shrink-0 w-10 h-5 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ml-auto mr-5`}
                >
                  <span className="sr-only">Tắt thông báo</span>
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block w-4 h-4 rounded-full bg-primary-light shadow-lg transform ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
              </span>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <TrashIcon className="w-6 h-6 text-negative" />
              <span className="flex items-center flex-1 h-14 font-normal text-negative border-b border-solid border-secondary-light ml-3">
                Xoá lịch sử trò chuyện
              </span>
            </div>

            <div className="flex items-center cursor-pointer hover:bg-lighter-gray pl-5">
              <LogoutIcon className="w-6 h-6 text-negative" />
              <span className="flex items-center flex-1 h-14 font-normal text-negative ml-3">
                Rời nhóm
              </span>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default OtherSettings;
