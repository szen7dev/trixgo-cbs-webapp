import { FC, useState } from "react";
import DatePicker from "react-datepicker";

import HumanAvatar from "assets/images/human-avatar.svg";
import IconPlus from "assets/images/icons8-plus-math-100.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";
import CheckListItem from "./CheckListItem";

const CheckList: FC = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  return (
    <div>
      {/* Check list header */}
      <div className="flex px-5 items-end justify-between mb-5">
        <div>
          <input type="checkbox" />
          <span className="ml-2 text-x-large">Việc con</span>
        </div>
        <button className="border-b-2 border-primary px-2">
          <span className="font-bold">Tất cả (12)</span>
        </button>
        <button className="px-2">
          <span className="text-primary-gray text-xs">Triển khai</span>
        </button>
        <button className="px-2">
          <span className="text-primary-gray text-xs">Hoàn thành</span>
        </button>

        <span>|</span>

        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500" />
          <span className="ml-1 text-primary-gray">Quá hạn</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500" />
          <span className="ml-1 text-primary-gray">Tuần tới</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500" />
          <span className="ml-1 text-primary-gray"> {">7 ngày"}</span>
        </div>
      </div>

      <div className="rounded-sm border-2 border-slate-400">
        {/* Check list items */}
        <div className="shadow-lg">
          <div className="w-full">
            <CheckListItem />
            <div className="flex justify-between px-5 pt-4 pb-3">
              <div className="flex items-start w-3/4">
                <input type="checkbox" />
                <div className="ml-2 truncate">
                  <span className="text-[13px]">
                    Cán bộ kỹ thuật kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn
                    B.I.M đợt 4)
                  </span>

                  <div className="flex">
                    <img src={HumanAvatar} alt="Avatar" className="w-5 h-5" />
                    <span className="text-primary-gray text-[13px] ml-2">
                      Đỗ Hữu Khu-CHG
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-1/4">
                <div>
                  <span className="px-3 py-1 rounded-xl bg-green-200 text-green-500">
                    Tuần tới
                  </span>
                </div>
                <span className="ml-2 text-[13px]">18/12/21</span>
              </div>
            </div>
            <div className="w-full h-0.5 bg-gray-200" />
          </div>

          <div className="w-full">
            <div className="flex justify-between px-5 pt-4 pb-3">
              <div className="flex items-start w-3/4">
                <input type="checkbox" />
                <div className="ml-2 truncate">
                  <p className="text-[13px]">
                    Cán bộ kỹ thuật kiểm tra hồ sơ thanh toán đợt 9 (Tư vấn
                    B.I.M đợt 4)
                  </p>
                  <div className="flex">
                    <img src={HumanAvatar} alt="Avatar" className="w-5 h-5" />
                    <span className="text-primary-gray text-[13px] ml-2">
                      Vũ Thị Lan-CHG
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-1/4">
                {/* <span className="px-3 py-1 rounded-xl bg-green-200 text-green-500">
                Tuần tới
              </span> */}
                <span className="ml-2 text-[13px]">18/12/21</span>
              </div>
            </div>
            <div className="w-full h-0.5 bg-gray-200" />
          </div>

          <div className="w-full">
            <div className="flex justify-between px-5 pt-4 pb-3">
              <div className="flex items-start w-3/4">
                <input type="checkbox" />
                <div className="ml-2 truncate">
                  <span className="text-[13px]">
                    Hover vào công việc/checklist sẽ hiển thị menu chức năng
                    (cập nhật, truy cập màn hình hien thị dai hon xem sao)
                  </span>

                  <div className="flex">
                    <img src={HumanAvatar} alt="Avatar" className="w-5 h-5" />
                    <span className="text-primary-gray text-[13px] ml-2">
                      Vũ Thị Lan-CHG
                    </span>
                  </div>
                </div>
              </div>
              {/* <div>
              <span className="px-3 py-1 rounded-xl bg-green-200 text-green-500">
                Tuần tới
              </span>
              <span className="ml-2 text-[13px]">18/12/21</span>
            </div> */}
              <div className="flex w-1/4 justify-end">
                <button className="mx-2">
                  <img
                    className="w-6"
                    src={SendEmailIcon}
                    alt="Send email icon"
                  />
                </button>
                <button className="mx-2">
                  <img className="w-6" src={IconPencil} alt="Pencil icon" />
                </button>
                <button className="mx-2">
                  <img className="w-6" src={LinkIcon} alt="Link icon" />
                </button>
              </div>
            </div>
            <div className="w-full h-0.5 bg-gray-200" />
          </div>
        </div>

        <div>
          <div className="w-full flex justify-center my-5">
            <span className="text-primary">Xem thêm (125)</span>
          </div>
          <div className="w-full h-0.5 bg-gray-200 " />

          {visibleForm && (
            <div className="shadow-lg p-5">
              <div className="flex">
                <div className="w-3/6 border-b-2">
                  <input
                    className="w-full h-8 placeholder-primary-gray focus:outline-none"
                    placeholder="Nội dung công việc"
                  />
                </div>
                <div className="w-2/6 mx-3 border-b-2">
                  <input
                    className="w-full h-8 placeholder-primary-gray focus:outline-none"
                    placeholder="Người thực hiện"
                  />
                </div>
                <div className="w-1/6 border-b-2">
                  <DatePicker
                    wrapperClassName={"w-auto"}
                    name="dealine"
                    selected={null}
                    customInput={
                      <div className={"relative w-auto ml-2 min-h-fit"}>
                        <input
                          placeholder="Thời hạn"
                          className="w-full h-8 placeholder-primary-gray focus:outline-none"
                        />
                      </div>
                    }
                    onChange={(date: Date | null) =>
                      console.log("dealine", date)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  className="px-3 py-2 rounded bg-gray-300 text-primary-gray"
                  onClick={() => setVisibleForm(false)}
                >
                  Bỏ qua
                </button>
                <button
                  className="mx-3 px-3 py-2 rounded bg-primary text-white"
                  onClick={() => setVisibleForm(false)}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          )}

          <div className="shadow-lg mt-5 pb-5 px-5">
            <button onClick={() => setVisibleForm(true)}>
              <div className="flex items-center text-green-success font-bold">
                <img src={IconPlus} alt="icon" className="w-4 h-4" />
                <span className="ml-1">Tạo mới</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
