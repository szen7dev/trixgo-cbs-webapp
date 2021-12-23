import { FC, useState } from "react";

import Tabs from "./tabs/TabsList";

import SearchIcon from "assets/images/icons8-search-120.png";
import ListIcon from "assets/images/icon-bulleted-list.svg";
import AddIcon from "assets/images/icon-add.svg";
import NewHumanModal from "./components/NewHumanModal";
import { useModal } from "services/hooks/useModal";

const HumansPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const { openModal } = useModal();

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  return (
    <section className="w-full">
      <div className="sticky top-0 bg-primary-light z-10 flex justify-between h-12 px-6 border border-gray-200">
        <div className="flex items-center">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Danh sách
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Theo dõi thời hạn
          </button>
          <button
            className={
              toggleTab === 3
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(3)}
          >
            Tra cứu năng lực
          </button>
          <button
            className={
              toggleTab === 4
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(4)}
          >
            Tra cứu văn bằng
          </button>
          <button
            className={
              toggleTab === 5
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(5)}
          >
            Tra cứu khác
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative px-4 border-r-2 border-accent-light">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-8"
              />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-64 h-10 rounded-2xl pl-14 outline-none bg-secondary-light"
            />
          </div>

          <div className="flex px-4">
            <div
              className="flex  items-center justify-around rounded-l-xl cursor-pointer w-[74px] h-[34px]"
              style={{
                background: "#eaf2fe",
              }}
            >
              <img src={ListIcon} alt="List" className="w-6 h-6" />
              <span className="text-primary text-[13px]">Grid</span>
            </div>
            <div className="flex items-center justify-around rounded-r-xl cursor-pointer w-[74px] h-[34px] bg-secondary-light">
              <img src={ListIcon} alt="List" className="w-6 h-6" />
              <span className="text-[13px]">List</span>
            </div>
          </div>

          <button
            className="flex items-center"
            onClick={() =>
              openModal(
                <div
                  className={
                    "bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
                  }
                >
                  <NewHumanModal />
                </div>
              )
            }
          >
            <img src={AddIcon} alt="Add" />
            <span className="ml-2 uppercase text-primary text-[13px]">
              Nhân sự mới
            </span>
          </button>
        </div>
      </div>

      <Tabs toggleTab={toggleTab} />
    </section>
  );
};

export default HumansPage;
