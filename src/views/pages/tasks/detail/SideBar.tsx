import { FC } from "react";

import ChevronUpIcon from "assets/images/icon-chevron-up.png";
import HumanAvatar from "assets/images/human-avatar.svg";
import LineConnector from "assets/images/line-connector.svg";
import LongArrowIcon from "assets/images/icon-long-arrow.svg";

const SideBar: FC = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Đệ trình và phê duyệt
          </span>
          <button title="Toggle header" className="">
            <img className="w-3" src={ChevronUpIcon} alt="Toggle button" />
          </button>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="flex">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="flex items-center">
                <img
                  className="px-2 w-auto h-6"
                  src={LongArrowIcon}
                  alt="Arrow icon"
                />
              </div>
            </div>
            <span className="mt-2 text-[13px] leading-4">
              Cao Hoàng Thùy Linh-112
            </span>
          </div>
          <div className="w-1/2">
            <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
            <span className="mt-2 text-[13px] leading-4">
              Nguyễn Trần Anh-CPMI
            </span>
          </div>
        </div>
        <span className="text-xs text-primary-gray">
          13:37 6/7/21 - 18 giờ trước
        </span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-end mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Người liên quan
          </span>
          <button>
            <span className="text-primary text-[13px] leading-4">
              Xem tất cả
            </span>
          </button>
        </div>
        <div className="flex overflow-hidden space-x-3">
          <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
          <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
          <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
          <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2.5">
          <span className="font-bold text-[13px] leading-4">
            Tiến trình xác nhận
          </span>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Lê Trọng Quyền-CPMI</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã đồng ý
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Trần Tiến Tùng-PGI</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <button className="font-bold px-4 h-8 rounded min-w-max text-primary-light text-[13px] bg-green-600">
              Đồng ý
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Hà Tiến Dũng-CHG</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã đồng ý
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Đỗ Hữu Khu-CHG</p>
                <p className="text-xs text-primary-gray">Cán bộ thanh toán</p>
              </div>
            </div>
            <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-[13px] bg-green-100">
              Pending
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Vũ Thị Lan-CHG</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-[13px] bg-green-100">
              Pending
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2.5">
          <span className="font-bold text-[13px] leading-4">Mở thầu</span>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Lê Trọng Quyền-CPMI</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã mở
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Trần Tiến Tùng-PGI</p>
                <p className="text-xs text-primary-gray"></p>
              </div>
            </div>
            <button className="font-bold px-4 h-8 rounded min-w-max text-primary-light text-[13px] bg-green-600">
              Mở thầu
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Hà Tiến Dũng-CHG</p>
                <p className="text-xs text-primary-gray">
                  13:15 28/2/21 - 2h ago
                </p>
              </div>
            </div>
            <span className="font-bold rounded min-w-max text-green-600 text-[13px]">
              Đã mở
            </span>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Đỗ Hữu Khu-CHG</p>
                {/* <p className="text-xs text-primary-gray">Cán bộ thanh toán</p> */}
              </div>
            </div>
            <button className="font-bold px-4 h-6 rounded-xl min-w-max text-red-600 text-[13px] bg-red-100">
              Rejected
            </button>
          </div>
          <img className="w-10 h-6" src={LineConnector} alt="Timeline icon" />
          <div className="flex justify-between">
            <div className="flex items-start">
              <img src={HumanAvatar} alt="Avatar" className="w-10 h-10" />
              <div className="ml-2">
                <p className="text-[13px]">Vũ Thị Lan-CHG</p>
                <p className="text-xs text-primary-gray"></p>
              </div>
            </div>
            {/* <button className="font-bold px-4 h-6 rounded-xl min-w-max text-green-600 text-[13px] bg-green-100">
              Pending
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
