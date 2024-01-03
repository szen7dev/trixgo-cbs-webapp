import { FC, useState } from "react";
import { SupportToolTab } from "./components";

export const AccountingSupportToolsPage: FC = () => {
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
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Phân tích giá vốn
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full py-2 px-7 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full py-2 px-7 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Tool 2
          </button>
          <button
            className={
              toggleTab === 3
                ? "w-auto h-full py-2 px-7 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full py-2 px-7 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(3)}
          >
            Tool 3
          </button>
          <button
            className={
              toggleTab === 4
                ? "w-auto h-full py-2 px-7 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full py-2 px-7 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(4)}
          >
            Tool 4
          </button>
        </div>
      </div>

      <SupportToolTab toggleTab={toggleTab} />
    </main>
  )
}