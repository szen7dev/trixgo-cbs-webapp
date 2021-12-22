import { FC, useState } from "react";

import Tabs from "../../tabs/HomeTabList";

import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

const SupportPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

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
            Báo cáo truy cập
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Chi tiết hoạt động
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex text-primary-gray">
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="all"
                className="w-4 h-4 mr-2.5"
              />
              <span className="text-black">Tất cả</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                defaultChecked
                value="week"
                className="w-4 h-4 mr-2.5"
              />
              <span>Ngày này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="week"
                className="w-4 h-4 mr-2.5"
              />
              <span>Tuần này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="month"
                className="w-4 h-4 mr-2.5"
              />
              <span>Tháng này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="quater"
                className="w-4 h-4 mr-2.5"
              />
              <span>Quý này</span>
            </div>
          </div>
          <button className="flex items-center justify-around w-[120px] h-[30px] border rounded">
            <img src={PolygonIcon} alt="Polygon" />
            <span className="text-xs text-primary-gray">Chọn thời gian</span>
          </button>
          <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
            <img alt={"Icon"} src={ThreeDotsVertical} />
          </button>
        </div>
      </div>

      <Tabs toggleTab={toggleTab} />
    </main>
  );
};

export default SupportPage;
