import { FC } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import HumanStyle from "../human.module.css";

import HumanAvatar from "assets/images/human-avatar.svg";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import PreviousIcon from "assets/images/icon-expand-arrow-left.png";
import NextIcon from "assets/images/icon-expand-arrow-right.png";

type Props = {
  toggleTab: number;
};

const TabsList: FC<Props> = (props) => {
  const name = "Nguyễn Phan Thanh Hương";
  const role = "Cán bộ kế toán";
  const data = [];
  for (let i = 0; i <= 9; i++) {
    data.push({ name, role, id: i });
  }

  const { toggleTab } = props;

  return (
    <section>
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <div className="flex flex-wrap justify-around gap-y-4 gap-x-2 px-6 py-4">
          {data.map((item) => {
            return (
              <div
                key={item.id}
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
                  <p className="text-sm pt-2 text-secondary-gray">
                    {item.role}
                  </p>
                </div>
                <Link to={`/human/home/hid=${item.id}`}>
                  <button
                    className={cn(HumanStyle.btnHumanInfo, "text-sm w-32 h-10")}
                  >
                    Xem chi tiết
                  </button>
                </Link>
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

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        Theo dõi thời hạn
      </div>
      <div className={toggleTab === 3 ? "block" : "hidden"}>
        Tra cứu năng lực
      </div>
      <div className={toggleTab === 4 ? "block" : "hidden"}>
        Tra cứu văn bằng
      </div>
      <div className={toggleTab === 5 ? "block" : "hidden"}>Tra cứu khác</div>
    </section>
  );
};

export default TabsList;
