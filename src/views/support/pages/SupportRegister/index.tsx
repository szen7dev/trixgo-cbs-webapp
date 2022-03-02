import { FC, useState } from "react";

import { RegisterTabsList } from "views/support/shareComponents/common";
import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";

export const SupportRegisterPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const handleToggleTab = (index: number) => setToggleTab(index);

  return (
    <main className="w-full h-max bg-cbs-gray">
      <div className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-12 px-6 border-b border-gray-300">
        <div className="h-full">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Dashboard
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Danh sách đăng ký
          </button>
        </div>

        <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
          <img alt={"Icon"} src={ThreeDotsVertical} />
        </button>
      </div>

      <RegisterTabsList toggleTab={toggleTab} />
    </main>
  );
};