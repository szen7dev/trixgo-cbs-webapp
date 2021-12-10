import { FC } from "react";

import { Link } from "react-router-dom";

import HumanAvatar from "assets/images/human-avatar.svg";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import PreviousIcon from "assets/images/icon-expand-arrow-left.png";
import NextIcon from "assets/images/icon-expand-arrow-right.png";

type Props = {
  data: Record<string, any>;
};

const HumanList: FC<Props> = (props) => {
  const { data } = props;

  return (
    <>
      <div className="flex flex-wrap justify-around gap-y-4 gap-x-2 px-6 py-4">
        {data.map((item: any) => {
          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-around items-center w-72 h-96 rounded-lg"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                border: "1px solid #cccccc",
              }}
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
                <p className="text-sm pt-2 text-secondary-gray">{item.role}</p>
              </div>
              <Link to={`/human/home/hid=${item.id}`}>
                <button
                  className="text-sm w-32 h-10 rounded-lg"
                  style={{ border: "1px solid #cccccc" }}
                >
                  Xem chi tiết
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 border border-accent-light bg-primary-light z-0 flex items-center justify-around h-14">
        <button className="flex items-center justify-center h-10 w-24 bg-accent-light rounded">
          <img src={PreviousIcon} alt="Previous" className="w-4 h-4" />
          <span className="uppercase text-xs ml-4 text-primary-gray">Lùi</span>
        </button>
        <div className="flex gap-2.5">
          <button className="h-10 w-10 text-xs font-bold text-primary-gray bg-accent-light rounded focus:bg-accent focus:text-primary">
            1
          </button>
          <button className="h-10 w-10 text-xs font-bold text-primary-gray bg-accent-light rounded focus:bg-accent focus:text-primary">
            2
          </button>
          <button className="h-10 w-10 text-xs font-bold text-primary-gray bg-accent-light rounded focus:bg-accent focus:text-primary">
            3
          </button>
          <button className="h-10 w-10 text-xs font-bold text-primary-gray bg-accent-light rounded focus:bg-accent focus:text-primary">
            4
          </button>
          <button className="h-10 w-10 text-xs font-bold text-primary-gray bg-accent-light rounded focus:bg-accent focus:text-primary">
            5
          </button>
        </div>
        <button className="flex items-center justify-center h-10 w-24 bg-accent-light rounded">
          <span className="uppercase text-xs mr-4 text-primary-gray">Tiếp</span>
          <img src={NextIcon} alt="Next" className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default HumanList;
