import { FC, useState } from "react";

import { AdminTab } from "./components";

export const AccountingAdminPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  return (
    <main className="w-full h-full">
      <div className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6 border-b border-gray-300">
        <div className="h-full">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Nhóm chức năng
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Phân quyền chức năng
          </button>
          <button
            className={
              toggleTab === 3
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(3)}
          >
            Cấu hình khác
          </button>
          <button
            className={
              toggleTab === 4
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(4)}
          >
            Account
          </button>

          <button
            className={
              toggleTab === 5
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(5)}
          >
            Funda
          </button>

          <button
            className={
              toggleTab === 6
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(6)}
          >
            Warehouse
          </button>

          <button
            className={
              toggleTab === 7
                ? "w-auto h-full px-3 py-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full px-3 py-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(7)}
          >
            Good
          </button>
        </div>
      </div>

      <AdminTab toggleTab={toggleTab} />
    </main>
  );
};
