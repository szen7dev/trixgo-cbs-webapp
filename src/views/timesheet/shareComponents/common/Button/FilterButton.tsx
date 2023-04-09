import { FC, useState } from "react";
import DatePicker from "react-datepicker";

import SortingIcon from "assets/images/icons8-sorting-100.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import DateIcon from "assets/images/icons8-calendar-100.svg";

import {DropdownSearchable} from "shareComponents/common";
import { InputClearable } from "../Input";

const FilterButton: FC = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className={"relative"}>
      <button
        onClick={() => setShowFilter(!showFilter)}
        className={
          "bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"
        }
      >
        <img src={SortingIcon} alt={"icon sorting icon"} />
        <span className={"ml-2 text-gray-500"}>Filter</span>
      </button>
      {showFilter && (
        <div
          className={
            "absolute transition duration-150 top-full left-3 bg-white py-2 pb-6 px-4 shadow-md z-20 rounded-md max-w-[900px] min-w-[600px]"
          }
        >
          <InputClearable
            placeholder={"Nội dung tìm kiếm tại đây"}
            className={"w-full shadow-lg rounded-md h-[45px]"}
            onChange={(val) => console.log(val)}
          />
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 1</p>
            <DropdownSearchable
              disabled={true}
              placeholder={"Phân loại 1"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
                {
                  _id: 2,
                  content: "Trần Thanh Quang 2",
                },
                {
                  _id: 3,
                  content: "Trần Thanh Quang 3",
                },
                {
                  _id: 4,
                  content: "Trần Thanh Quang 4",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 2</p>
            <DropdownSearchable
              placeholder={"Phân loại 1"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
                {
                  _id: 2,
                  content: "Trần Thanh Quang 2",
                },
                {
                  _id: 3,
                  content: "Trần Thanh Quang 3",
                },
                {
                  _id: 4,
                  content: "Trần Thanh Quang 4",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Ngày tháng</p>
            <div className={"flex items-center flex-1"}>
              <div className={"w-1/2 flex items-center"}>
                <p className={"text-gray-500 mr-4"}>Từ</p>
                <DatePicker
                  name="endDate"
                  selected={null}
                  onChange={(date: Date | null) =>
                    console.log("birthDate", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <div className={"relative w-auto ml-2 min-h-fit"}>
                      <input
                        type="text"
                        name="startDate"
                        className="border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                      <div
                        className={
                          "absolute inset-y-0 right-0 h-full flex align-items-center pr-2"
                        }
                      >
                        <img src={DateIcon} alt={"calendar icon"} />
                      </div>
                    </div>
                  }
                />
              </div>
              <div className={"w-1/2 flex items-center"}>
                <p className={"text-gray-500 mr-4"}>Đến</p>
                <DatePicker
                  name="endDate"
                  selected={null}
                  onChange={(date: Date | null) =>
                    console.log("birthDate", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <div className={"relative w-auto ml-2 min-h-fit"}>
                      <input
                        type="text"
                        name="startDate"
                        className="border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                      <div
                        className={
                          "absolute inset-y-0 right-0 h-full flex align-items-center pr-2"
                        }
                      >
                        <img src={DateIcon} alt={"calendar icon"} />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 3</p>
            <DropdownSearchable
              placeholder={"Phân loại 3"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 4</p>
            <DropdownSearchable
              placeholder={"Phân loại 4"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 5</p>
            <DropdownSearchable
              placeholder={"Phân loại 5"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 5</p>
            <DropdownSearchable
              placeholder={"Phân loại 5"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 6</p>
            <DropdownSearchable
              placeholder={"Phân loại 6"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại 7</p>
            <DropdownSearchable
              placeholder={"Phân loại 7"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center mt-4"}>
            <p className={"text-gray-500 mr-4"}>Phân loại khác</p>
            <DropdownSearchable
              placeholder={"Phân loại khác"}
              className={"w-full flex-1 border-b border-gray-200"}
              focusedClass={"border-b border-primary"}
              maxWidthInput={"max-w-none"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              renderSelectedItem={(item) => (
                <div className={"flex items-center"}>
                  <img alt={"tag icon"} src={TagIcon} />
                  <span>{item.text}</span>
                </div>
              )}
              data={[
                {
                  _id: 1,
                  content: "Trần Thanh Quang",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>
          <div className={"flex items-center justify-end mt-5"}>
            <button
              onClick={() => setShowFilter(false)}
              className={"h-[45px] w-[117px] bg-gray-200 rounded mr-3"}
            >
              Bỏ qua
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className={"h-[45px] w-[117px] bg-primary rounded text-white"}
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
