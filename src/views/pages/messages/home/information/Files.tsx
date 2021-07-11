import { FC } from "react";

import { Disclosure } from "@headlessui/react";
import CaretIcon from "assets/icons/Caret";

const FilesInformation: FC = () => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b-6 border-solid border-secondary-light">
          <Disclosure.Button className="flex justify-between items-center w-full text-base font-semibold bg-transparent focus:outline-none px-5 py-2">
            <span>Files</span>
            <CaretIcon
              className={`${
                open ? "transform rotate-180" : "transform rotate-90"
              } w-3 h-3 text-primary-gray`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="flex flex-nowrap items-center content cursor-pointer hover:bg-lighter-gray py-3 px-5">
              <div
                className="w-10 h-10 bg-no-repeat bg-contain align-middle"
                style={{
                  backgroundImage:
                    "url(https://chat.zalo.me/assets/icon-excel.fe93010062660a8332b5f5c7bb2a43b1.svg)",
                  backgroundPosition: "50%",
                }}
              />

              <div className="block flex-1 ml-3">
                <div className="truncate max-w-[250px] font-semibold text-sm text-dark">
                  VicostoneProsite_TestCases.xlsx
                </div>
                <div className="flex justify-between items-end cursor-pointer mt-1">
                  <div className="truncate max-w-[250px] text-xs text-secondary">
                    64.04 KB
                  </div>
                  <div className="text-xs text-primary-gray">17/06</div>
                </div>
              </div>
            </div>

            <div className="flex flex-nowrap items-center content cursor-pointer hover:bg-lighter-gray py-3 px-5">
              <div
                className="w-10 h-10 bg-no-repeat bg-contain align-middle"
                style={{
                  backgroundImage:
                    "url(https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg)",
                  backgroundPosition: "50%",
                }}
              />

              <div className="block flex-1 ml-3">
                <div className="truncate max-w-[250px] font-semibold text-sm text-dark">
                  Service Agreement - Hieu.docx
                </div>
                <div className="flex justify-between items-end cursor-pointer mt-1">
                  <div className="truncate max-w-[250px] text-xs text-secondary">
                    36.71 KB
                  </div>
                  <div className="text-xs text-primary-gray">17/06</div>
                </div>
              </div>
            </div>

            <button className="block w-fill font-semibold text-sm leading-8 text-primary-gray bg-secondary-light hover:bg-secondary-gray hover:bg-opacity-40 rounded focus:outline-none py-0.5 my-3 mx-5">
              Xem tất cả
            </button>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default FilesInformation;
