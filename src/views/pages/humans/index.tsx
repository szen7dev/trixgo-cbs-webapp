import { FC} from "react";

import { Link } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import NewHumanModal from "./components/NewHumanModal";

import SearchIcon from "assets/images/icons8-search.svg";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import HumanAvatar from "assets/images/human-avatar.svg";
import SortIcon from "assets/images/icons8-sorting.svg";

type Item = {
  id: number;
  name: string;
  role: string;
};

const HumansPage: FC = () => {
  const name = "Nguyễn Phan Thanh Hương";
  const role = "Cán bộ kế toán";
  const data = [];
  for (let i = 0; i <= 12; i++) {
    data.push({ name, role, id: i });
  }
  const { openModal } = useModal();

  return (
    <section className="w-full">
      <div className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-gray-200">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <div className="relative px-4">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-7 w-4 h-4"
              />
            </span>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-[296px] h-[30px] pl-10 outline-none bg-cbs-table-header"
            />
          </div>
          <button className="w-[78px] h-[30px] flex items-center justify-around bg-cbs-table-header rounded text-primary-gray">
            <img src={SortIcon} alt="Sort" />
            <span>Filter</span>
          </button>
        </div>
        <button
          className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
          onClick={() =>
            openModal(
              <div
                className={
                  "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
                }
              >
                <NewHumanModal />
              </div>
            )
          }
        >
          Tạo mới
        </button>
      </div>

      <div className="px-6 py-4 grid grid-cols-5 gap-3">
        {data.map((item: Item) => {
          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-around items-center h-[375px] rounded-lg"
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
                <button className="text-sm w-32 h-10 rounded-lg border border-primary-gray">
                  Xem chi tiết
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HumansPage;
