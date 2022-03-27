import moment from "moment";
import { FC } from "react";
import { TableOptions } from "react-table";
import { DatahubContractBase } from "typings/datahub/contract";
import iconPageUp from "assets/images/icons8-upload-document-100 1.png";

// Constants
import { BUILDING_GRADES, BUILDING_TYPES, PROJECT_TYPES } from "apis/localdb";
import { formatNumber } from "utils/ppt";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";

const headCellProps = { className: "py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" };

const DefaultSpan: FC = ({ children }) => <span className="pl-2 border-l border-cbs-border">{children}</span>;

function getColumnsContractorContract(): TableOptions<DatahubContractBase>["columns"] {
  return [
    SelectionColumn({
      tableHeadSelectorProps: { className: "px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1" },
      tableHeadSelectorInputProps: { className: "cbs-checkbox" },
      tableCellSelectorProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" },
      tableCellSelectorInputProps: { className: "cbs-checkbox" },
    }),
    {
      accessor: "name",
      Header: <DefaultSpan>Hợp đồng</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary" },
      // Cell: ({ row, value }: any) => navigate ? <Link to={'/datahub/inspection/' + row.id}>{value}</Link> : value
    },
    {
      accessor: "field",
      Header: <DefaultSpan>Lĩnh vực</DefaultSpan>,
      headCellProps,

      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row, value }) => (value && typeof value !== "string" ? value.name : ""),
    },
    {
      id: "projectType",
      accessor: "projectType",
      Header: <DefaultSpan>Quy mô, tính chất</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row, value }) => (
        <>
          <p>{PROJECT_TYPES.find((item) => item.value === row.original.projectType)?.text}</p>
          <p>{BUILDING_TYPES.find((item) => item.value === row.original.buildingType)?.text}</p>
          <p>{BUILDING_GRADES.find((item) => item.value === row.original.buildingGrade)?.text}</p>
        </>
      ),
    },
    {
      id: "number",
      accessor: "basementArea",
      Header: <DefaultSpan>Thông số</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row }) => (
        <>
          <p>{row.original.basementNumber + " hầm/" + row.original.basementArea + "m2"}</p>
          <p>{row.original.floorNumber + " tầng nổi/" + row.original.floorArea + "m2"}</p>
        </>
      ),
    },
    {
      accessor: "value",
      Header: <DefaultSpan>Giá trị ký</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row, value }) => formatNumber(value + row.original.vatValue),
    },
    {
      accessor: "date",
      Header: <DefaultSpan>Ngày ký</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ value }) => moment(value).format("DD/MM/yyyy"),
    },
    {
      accessor: "files",
      Header: <DefaultSpan>Tài liệu xác nhận</DefaultSpan>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ value }) =>
        value?.map((file, index) => {
          return (
            <p key={index} className="text-cbs-primary">
              {/* {note} */}
              this is files
            </p>
          );
        }),
    },
    {
      id: "_id",
      Header: <span className="pl-2 border-l border-cbs-border"></span>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border" },
      Cell: ({ row }: any) => {
        return (
          <button className=" w-6 h-6">
            <img src={iconPageUp} alt="" className="inline-block" />
          </button>
        );
      },
    },
  ];
}
export default getColumnsContractorContract;
