import { FC, useState } from "react";
import { ConfigTab } from "./components/Tabs";

export const PersonalConfigPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  return (
    <main className="w-full h-max">
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
            Bạn bè
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Yêu cầu kết bạn
          </button>
        </div>
      </div>

      <ConfigTab toggleTab={toggleTab} />
    </main>
  );
};
