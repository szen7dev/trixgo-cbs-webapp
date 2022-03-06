/* eslint-disable no-console */
import { FC, useState } from "react";

import DatePicker from "react-datepicker";

import { DropdownSearchable } from "shareComponents/common";

import TagIcon from "assets/images/icons8-price-tag-96.svg";
import DateIcon from "assets/images/icons8-calendar-100.svg";
import FilterBlueIcon from "assets/images/icons8-filter-96.png";

export const NotificationFilter: FC = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="w-10 h-10 bg-cbs-gray rounded flex items-center justify-center cursor-pointer hover:bg-accent-light"
      >
        <img src={FilterBlueIcon} alt="Filter" />
      </button>
      {showFilter && (
        <div className="absolute transition duration-150 top-full right-0 bg-white py-2 pb-6 px-4 shadow-md z-20 rounded-md">
          <div className="flex items-center mt-4">
            <p className="text-primary-gray mr-4">Người tạo</p>
            <DropdownSearchable
              placeholder="Người tạo"
              className="w-full flex-1 border-b border-primary-border"
              classNameInput="h-4"
              focusedClass="border-b border-primary"
              maxWidthInput="max-w-none"
              isMultiple={false}
              allowClearValueSingleInput={true}
              showTriangle={false}
              renderSelectedItem={(item) => (
                <div className="flex items-center">
                  <img alt="Tag" src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Tìm kiếm theo API 1",
                },
                {
                  _id: 2,
                  content: "Tìm kiếm theo API 2",
                },
                {
                  _id: 3,
                  content: "Tìm kiếm theo API 3",
                },
                {
                  _id: 4,
                  content: "Tìm kiếm theo API 4",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>

          <div className="flex items-center mt-4">
            <p className="text-primary-gray mr-10">Dự án</p>
            <DropdownSearchable
              placeholder="Dự án"
              className="w-full flex-1 border-b border-primary-border"
              focusedClass="border-b border-primary"
              maxWidthInput="max-w-none"
              isMultiple={false}
              allowClearValueSingleInput={true}
              showTriangle={false}
              renderSelectedItem={(item) => (
                <div className="flex items-center">
                  <img alt="Tag" src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Tìm kiếm theo API 1",
                },
                {
                  _id: 2,
                  content: "Tìm kiếm theo API 2",
                },
                {
                  _id: 3,
                  content: "Tìm kiếm theo API 3",
                },
                {
                  _id: 4,
                  content: "Tìm kiếm theo API 4",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>

          <div className="flex items-center mt-4">
            <div className="flex items-center flex-1">
              <div className="w-1/2 flex items-center mr-6">
                <p className="text-primary-gray mr-1">Từ</p>
                <DatePicker
                  name="endDate"
                  selected={null}
                  onChange={(date: Date | null) =>
                    console.log("birthDate", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <div className="relative w-auto ml-2 min-h-fit">
                      <input
                        type="text"
                        name="startDate"
                        className="border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                      <div className="absolute inset-y-0 right-0 h-full flex align-items-center pr-2">
                        <img src={DateIcon} alt="Date" />
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="w-1/2 flex items-center">
                <p className="text-primary-gray mr-1">Đến</p>
                <DatePicker
                  name="endDate"
                  selected={null}
                  onChange={(date: Date | null) =>
                    console.log("birthDate", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <div className="relative w-auto ml-2 min-h-fit">
                      <input
                        type="text"
                        name="startDate"
                        className="border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                      <div className="absolute inset-y-0 right-0 h-full flex align-items-center pr-2">
                        <img src={DateIcon} alt="Date" />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-10">
            <button
              onClick={() => setShowFilter(false)}
              className="h-[45px] w-[117px] bg-cbs-gray text-primary-gray font-bold rounded mr-3"
            >
              Bỏ qua
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="h-[45px] w-[117px] bg-primary rounded font-bold text-white"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
