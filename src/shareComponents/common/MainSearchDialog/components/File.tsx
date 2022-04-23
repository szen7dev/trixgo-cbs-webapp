import React, { FC, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useTable, useRowSelect, TableOptions } from "react-table";

import CustomAutoComplete from "../../Form/CustomForm/CustomAutoComplete";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";

type FileProps = {
  //
};

interface IFile {
  _id: string;
}

const data = Array.from({ length: 15 }).map((e, i) => ({ _id: "123" + i }));

function getColumnsFile(): TableOptions<IFile>["columns"] {
  return [
    SelectionColumn({
      tableHeadSelectorProps: {
        className: "px-4 py-2.5 font-normal border-b border-cbs-border w-1",
      },
      tableHeadSelectorInputProps: { className: "cbs-checkbox" },
      tableCellSelectorProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center",
      },
      tableCellSelectorInputProps: { className: "cbs-checkbox" },
    }),
    {
      accessor: "_id",
      Header({ length, selectedFlatRows }) {
        return (
          <div className="flex justify-between pb-1">
            <span className="bg-[#F6F7F8] bg-opacity-60 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </span>
            <div className="flex items-center">
              <span className="mr-4">1-50 trong số rất nhiều</span>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border">
                <img
                  alt="Next"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border">
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
              </button>
            </div>
          </div>
        );
      },
      headCellProps: { colSpan: 2, className: "border-b border-cbs-border pl-2 pr-8" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row, value }) {
        return (
          <div>
            <p className="text-cbs-highlight-color">
              2022.04.18-AHU.VPTM.CPMI.ToanND-HoSoThanhToanL1-V1.rar (135KB)
            </p>
            <p className="text-cbs-subtext">
              CHG.THT.Báo cáo đánh giá sản phẩm hàng tháng của nhà thầu
            </p>
            <p className="text-cbs-subtext">
              <span>Nguyễn Phan Thanh Hương-CPMI</span>
              <span className="text-cbs-primary">15/8/2021 14:12 (cách đây 8 ngày)</span>
            </p>
          </div>
        );
      },
    },
    {
      accessor: "_id",
      id: "he",
      headCellProps: { className: "hidden" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row, value }) {
        return (
          <div>
            <img src="" className="h-[60px] w-[60px]" alt="hellu" />
          </div>
        );
      },
    },
  ];
}

const File: FC<FileProps> = (props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(-30)));

  const columns = useMemo(getColumnsFile, []);
  const instance = useTable({ columns, data, getRowId: (row) => row._id }, useRowSelect);

  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3 relative flex space-x-3">
        <CustomAutoComplete
          data={[{ name: "123" }]}
          wrapperClassName="w-4/12"
          className="w-full h-full py-2.5 px-3 focus:outline-none"
          placeholder="Nội dung"
        />
        <CustomAutoComplete
          data={[{ name: "123" }]}
          wrapperClassName="w-4/12"
          className="w-full h-full py-2.5 px-3 focus:outline-none"
          placeholder="Nội dung"
        />
        <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
          <ReactDatePicker
            onChange={(date: Date) => setStartDate(date)}
            selected={startDate}
            className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
          />
          <div className="w-6 h-6">
            <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
          </div>
          <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Từ ngày</label>
        </div>
        <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
          <ReactDatePicker
            onChange={(date: Date) => setEndDate(date)}
            selected={endDate}
            className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
          />
          <div className="w-6 h-6">
            <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
          </div>
          <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Đến ngày</label>
        </div>
      </div>
      {/* Content */}
      <div className="h-[480px] overflow-auto">
        <TableWithoutContext
          instance={instance}
          tableProps={{ className: "w-full" }}
          props={{ length: 123 }}
        />
      </div>
      <div className="flex justify-end pt-3 px-10">
        <button className="text-cbs-subtext px-7 py-3.5 font-bold rounded-cbs-sm">Bỏ qua</button>
        <button className="bg-cbs-primary text-white px-7 py-3.5 font-bold rounded-cbs-sm">
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default File;
