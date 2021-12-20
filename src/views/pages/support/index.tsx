import { FC, useEffect, useState } from "react";

import Tabs from "./tabs/TabsList";

const SupportPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  useEffect(() => {
    document.title = "Support - Hỗ trợ";
  }, []);

  return (
    <main className="w-full h-full">
      <div className="sticky top-0 bg-primary-light z-10 h-12 px-6 border-b border-gray-300">
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

      <Tabs toggleTab={toggleTab} />
    </main>
  );
};

export default SupportPage;
