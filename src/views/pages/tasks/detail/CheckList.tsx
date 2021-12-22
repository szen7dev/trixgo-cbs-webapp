import { FC, useState } from "react";
import DatePicker from "react-datepicker";

import IconPlus from "assets/images/icons8-plus-math-100.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import IconPencil from "assets/images/icons8-pencil.svg";
import LinkIcon from "assets/images/icon-linking.png";
import DotsVerticalIcon from "assets/icons/DotsVertical";

import CheckListItem from "./CheckListItem";

import { CheckList as CheckListType } from "typings/task";

type Props = {
  data: Array<CheckListType>;
};

const CheckList: FC<Props> = ({ data }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <div>
      {/* Check list header */}
      <div
        className={`${
          selectAll ? "mb-1" : "mb-5"
        } flex px-5 items-center justify-between`}
      >
        <div className={`${selectAll ? "" : "w-1/6"} `}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          {!selectAll && <span className="ml-2 text-x-large">Việc con</span>}
        </div>

        {selectAll ? (
          <div className="flex justify-between w-full ml-5">
            <div className="flex items-center">
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
            <button className="text-[13px] w-10 h-10 flex justify-center items-center rounded-full bg-lighter-gray">
              <DotsVerticalIcon />
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-5/6">
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
        )}
      </div>

      <div className="rounded-sm border border-slate-400">
        {/* Check list items */}
        <div className="shadow-lg">
          <div className="w-full">
            {(data || []).map((checkList) => (
              <CheckListItem key={checkList._id} data={checkList} />
            ))}
          </div>
        </div>

        <div>
          <div className="w-full flex justify-center my-5">
            <button>
              <span className="text-primary">Xem thêm (125)</span>
            </button>
          </div>
          <div className="w-full h-px bg-gray-200 " />

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
