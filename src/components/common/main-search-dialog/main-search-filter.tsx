import { FC } from "react";
import DatePicker from "react-datepicker";

import DropdownSearchable from "components/common/DropdownSearch";

import TagIcon from "assets/images/icons8-price-tag-96.svg";

const MainSearchFilter: FC = () => {
  return (
    <>
      <div className="t-main-search-filter-wrapper">
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Người thực hiện</p>
          <DropdownSearchable
            placeholder={"Người thực hiện"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Đơn vị thực hiện</p>
          <DropdownSearchable
            placeholder={"Đơn vị thực hiện"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Thời hạn</p>
          <DatePicker
            className="t-main-search-filter-item-date w-full border-b border-gray-200 outline-none px-3"
            placeholderText="Thời hạn"
            name="endDate"
            selected={null}
            onChange={(date: Date | null) =>
                console.log("birthDate", date)
            }
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Người tạo</p>
          <DropdownSearchable
            placeholder={"Người tạo"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Dự án</p>
          <DropdownSearchable
            placeholder={"Dự án"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Phân loại</p>
          <DropdownSearchable
            placeholder={"Phân loại"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Nhanh chậm</p>
          <DropdownSearchable
            placeholder={"Nhanh chậm"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Trạng thái</p>
          <DropdownSearchable
            placeholder={"Trạng thái"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        {/* filter item */}
        <div className="t-main-search-filter-item flex items-center mt-4">
          <p className={"t-main-search-filter-item-title text-gray-500 mr-2 text-[14px]"}>Phân loại khác</p>
          <DropdownSearchable
            placeholder={"Phân loại khác"}
            className={"t-main-search-filter-item-dropdown w-full flex-1 border-b border-gray-200"}
            focusedClass={"border-b border-primary"}
            maxWidthInput={"max-w-none"}
            isMultiple={true}
            allowClearValueSingleInput={true}
            renderSelectedItem={item => (
              <div className={"flex items-center"}>
                <img alt={"tag icon"} src={TagIcon}/>
                <span>{item.text}</span>
              </div>
            )}
            data={[
                {
                    "_id": 1,
                    "content":"Trần Thanh Quang"
                },
                {
                    "_id": 2,
                    "content":"Trần Thanh Quang 2"
                },
                {
                    "_id": 3,
                    "content":"Trần Thanh Quang 3"
                },
                {
                    "_id": 4,
                    "content":"Trần Thanh Quang 4"
                },
            ]}
            formatItem={{
                id : "_id",
                text : "content"
            }}
            inlineSearch={true}
          />
        </div>
        
      </div>

      <div className="text-right pt-12">
        <button className="rounded font-bold text-primary-gray py-3 px-7 bg-lighter-gray">Bỏ qua</button>
        <button className="rounded font-bold text-primary-light py-3 px-7 bg-blue ml-2">Tìm kiếm</button>
      </div>
    </>
  );
};

export default MainSearchFilter;
