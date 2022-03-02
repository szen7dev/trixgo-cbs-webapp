import { FC, useState } from "react";

import { HomeTabsList } from "views/support/shareComponents/common";
import { DropdownSearchable } from "shareComponents/common";

import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";
// import PolygonIcon from "assets/images/icon-polygon.svg";
// import { useListAppDeviceAccess } from 'services/hooks/useSupport';

export const SupportHomePage: FC = () => {
	const [toggleTab, setToggleTab] = useState(1);
  // const { listAppDeviceAccess } = useListAppDeviceAccess();
  // const timeType = ['all', 'today', 'week', 'month', 'quater'];
  // const [type, setType] = useState();
  // let timeType = '';

  const handleToggleTab = (index: number) => setToggleTab(index);
  const currentYear = new Date().getFullYear();
  const [timeType, setTimeType] = useState('today');
  const [typeYear, setTypeYear] = useState(currentYear);
  const handleChange = (event: any) => setTimeType(event.target.value);
  const handleChangeYear = (item: any) => setTypeYear(item.id);

  return (
    <main className="w-full h-max bg-cbs-gray">
      <div className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-12 px-6 border-b border-gray-300">
        <div className="h-full">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Báo cáo truy cập
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full p-2 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full p-2 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Chi tiết hoạt động
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex text-primary-gray">
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                value="all"
                className="w-4 h-4 mr-2.5"
                onChange={handleChange}
              />
              <span className="text-black">Tất cả</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                defaultChecked
                value="today"
                className="w-4 h-4 mr-2.5"
                onChange={handleChange}
              />
              <span>Ngày này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="week"
                className="w-4 h-4 mr-2.5"
                onChange={handleChange}
              />
              <span>Tuần này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="month"
                className="w-4 h-4 mr-2.5"
                onChange={handleChange}
              />
              <span>Tháng này</span>
            </div>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                name="type"
                id=""
                value="quarter"
                className="w-4 h-4 mr-2.5"
                onChange={handleChange}
              />
              <span>Quý này</span>
            </div>
          </div>
          <DropdownSearchable
            placeholder="Tìm kiếm"
            className="w-[322px] px-2 bg-cbs-table-header"
            classNameInput="h-[30px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item: any) => <span>{item.text}</span>}
            classNameItem="p-0"
            onchangeValue={handleChangeYear}
            data={[
              {
                value: 2020,
                content: "2020",
              },
              {
                value: 2021,
                content: "2021",
              },
              {
                value: 2022,
                content: "2022",
              },
            ]}
            formatItem={{
              id: "value",
              text: "content",
            }}
            inlineSearch={true}
          />
          {/* <button className="flex items-center justify-around w-[120px] h-[30px] border rounded">
            <img src={PolygonIcon} alt="Polygon" />
            <span className="text-xs text-primary-gray">Chọn thời gian</span>
            <select name="selectBox" id="select-box-year" onChange={handleChangeYear}>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </button> */}
          <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
            <img alt={"Icon"} src={ThreeDotsVertical} />
          </button>
        </div>
      </div>

      <HomeTabsList toggleTab={toggleTab} timeType={timeType} typeYear={typeYear}/>
    </main>
  );
};