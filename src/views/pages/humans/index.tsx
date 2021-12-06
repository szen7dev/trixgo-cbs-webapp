import { FC, useState } from "react";

import cn from "classnames";

import HumanAvatar from "assets/images/human-avatar.svg";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import PreviousIcon from "assets/images/icon-expand-arrow-left.png";
import NextIcon from "assets/images/icon-expand-arrow-right.png";
import SearchIcon from "assets/images/icons8-search-120.png";
import ListIcon from "assets/images/icon-bulleted-list.svg";
import AddIcon from "assets/images/icon-add.svg";

import HumanStyle from "./human.module.css";

const HumansPage: FC = () => {
  const name = "Nguyễn Phan Thanh Hương";
  const role = "Cán bộ kế toán";
  const data = [];
  for (let i = 0; i <= 9; i++) {
    data.push({ name, role });
  }

  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: any) => {
    setToggleTab(index);
  };

  return (
    <section className="w-full">
      <div
        className="flex justify-between h-14 px-8"
        style={{ border: "0.5px solid #cccccc" }}
      >
        <div className="flex items-center">
          <button
            className={toggleTab === 1 ? HumanStyle.tabActive : HumanStyle.tab}
            onClick={() => handleToggleTab(1)}
          >
            Danh sách
          </button>
          <button
            className={toggleTab === 2 ? HumanStyle.tabActive : HumanStyle.tab}
            onClick={() => handleToggleTab(2)}
          >
            Theo dõi thời hạn
          </button>
          <button
            className={toggleTab === 3 ? HumanStyle.tabActive : HumanStyle.tab}
            onClick={() => handleToggleTab(3)}
          >
            Tra cứu năng lực
          </button>
          <button
            className={toggleTab === 4 ? HumanStyle.tabActive : HumanStyle.tab}
            onClick={() => handleToggleTab(4)}
          >
            Tra cứu văn bằng
          </button>
          <button
            className={toggleTab === 5 ? HumanStyle.tabActive : HumanStyle.tab}
            onClick={() => handleToggleTab(5)}
          >
            Tra cứu khác
          </button>
        </div>

        <div className="flex items-center">
          <div
            className="relative px-4"
            style={{ borderRight: "1px solid #cccccc" }}
          >
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
              className="w-64 h-10 rounded-2xl pl-14 outline-none"
              style={{ background: "#f5f6f9" }}
            />
          </div>

          <div className="flex px-4">
            <div
              className="flex  items-center justify-around rounded-l-xl cursor-pointer"
              style={{
                width: 75,
                height: 35,
                background: "#eaf2fe",
              }}
            >
              <img src={ListIcon} alt="List" className="w-6 h-6" />
              <span style={{ fontSize: "0.813rem", color: "#0060e1" }}>
                Grid
              </span>
            </div>
            <div
              className="flex items-center justify-around rounded-r-xl cursor-pointer"
              style={{ width: 75, height: 35, background: "#f7f6fc" }}
            >
              <img src={ListIcon} alt="List" className="w-6 h-6" />
              <span style={{ fontSize: "0.813rem" }}>List</span>
            </div>
          </div>

          <button
            className="flex items-center"
            onClick={() => console.log("nhan su moi")}
          >
            <img src={AddIcon} alt="Add" />
            <span
              className="ml-2 uppercase"
              style={{ fontSize: "0.813rem", color: "#0060e1" }}
            >
              Nhân sự mới
            </span>
          </button>
        </div>
      </div>

      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <div className="flex flex-wrap justify-around gap-4 px-8 py-4">
          {data.map((item, key) => {
            return (
              <div
                key={key}
                className={cn(
                  HumanStyle.card,
                  "relative flex flex-col justify-around items-center w-72 h-96 rounded-lg"
                )}
              >
                <img
                  src={ThreeDotIcon}
                  alt="Three Dot"
                  className="absolute top-6 right-6 cursor-pointer"
                />
                <div className="text-center ml-2 mr-2">
                  <div className="flex justify-center mb-6">
                    <img src={HumanAvatar} alt="Avatar" className="w-20 h-20" />
                  </div>
                  <p className="text-2xl">{item.name}</p>
                  <p className="text-sm pt-2" style={{ color: "#798295" }}>
                    {item.role}
                  </p>
                </div>
                <button
                  className={cn(HumanStyle.btnHumanInfo, "text-sm w-32 h-10")}
                >
                  Xem chi tiết
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-around h-16">
          <button
            className={cn(
              HumanStyle.pagination,
              "flex items-center justify-center h-10 w-24"
            )}
          >
            <img src={PreviousIcon} alt="Previous" className="w-4 h-4" />
            <span className="uppercase text-xs ml-4">Lùi</span>
          </button>
          <div className="flex gap-2.5">
            <button className={cn(HumanStyle.pagination, "h-10 w-10 text-xs")}>
              1
            </button>
            <button className={cn(HumanStyle.pagination, "h-10 w-10 text-xs")}>
              2
            </button>
            <button className={cn(HumanStyle.pagination, "h-10 w-10 text-xs")}>
              3
            </button>
            <button className={cn(HumanStyle.pagination, "h-10 w-10 text-xs")}>
              4
            </button>
            <button className={cn(HumanStyle.pagination, "h-10 w-10 text-xs")}>
              5
            </button>
          </div>
          <button
            className={cn(
              HumanStyle.pagination,
              "flex items-center justify-center h-10 w-24"
            )}
          >
            <span className="uppercase text-xs mr-4">Tiếp</span>
            <img src={NextIcon} alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HumansPage;
