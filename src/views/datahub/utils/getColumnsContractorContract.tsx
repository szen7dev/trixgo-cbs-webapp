import iconPageUp from "assets/images/icons8-upload-document-100 1.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Cell, TableOptions } from "react-table";
import { DatahubContractBase } from "typings/datahub/contract";

// Constants
import { BUILDING_GRADES, BUILDING_TYPES, PROJECT_TYPES } from "apis/localdb";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { formatNumber } from "utils/ppt";
import { isSupporter } from 'configs';
import { useAuth } from "services/hooks/auth/useAuth";

const headCellProps = {
  className:
    "py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border",
};

const DefaultSpan: FC = ({ children }) => (
  <span className="pl-2 border-l border-cbs-border">{children}</span>
);

interface Options<T extends Record<string, any>> {
  onClickUpload?: (files: FileList | null, cell: Cell<T>) => void;
}

function getColumnsContractorContract(
  options?: Options<DatahubContractBase>
): TableOptions<DatahubContractBase>["columns"] {
  return [
    SelectionColumn({
      tableHeadSelectorProps: { className: "px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" },
      tableHeadSelectorInputProps: { className: "cbs-checkbox" },
      tableCellSelectorProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center",
      },
      tableCellSelectorInputProps: { className: "cbs-checkbox" },
    }),
    {
      accessor: "name",
      Header: "Hợp đồng",
      headCellProps,
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary",
      },
      Cell: ({ row, value }: any) => (
        <div>
          <Link to={'/datahub/inspection/' + row.id}>{value}</Link>
          <p className="text-small my-2 text-gray-500">{row.original?.project?.name}</p>
          <p className="text-small my-2 text-gray-500">{row.original?.client?.name}</p>
          <p className="text-small my-2 text-gray-500">
            {row.original?.area3?.name && `${row.original?.area3?.name}, `}
            {row.original?.area2?.name && `${row.original?.area2?.name}, `}
            {row.original?.area1?.name}
          </p>
        </div>
      )
      // Cell: ({ row, value }: any) => navigate ? <Link to={'/datahub/inspection/' + row.id}>{value}</Link> : value
    },
    {
      accessor: "field",
      Header: "Lĩnh vực",
      headCellProps,

      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row, value }) => (
        <>
          <p>{value && typeof value !== "string" ? value.name : ""}</p>
        </>
      ),
    },
    {
      id: "projectType",
      accessor: "projectType",
      Header: "Quy mô, tính chất",
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
      Header: "Thông số",
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
      Header: "Giá trị ký",
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ row, value }) => formatNumber(value + row.original.vatValue),
    },
    {
      accessor: "date",
      Header: "Ngày ký",
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ value }) => moment(value).format("DD/MM/yyyy"),
    },
    {
      accessor: "files",
      Header: "Tài liệu",
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border" },
      Cell: ({ value }) =>
        value?.map((file: any, index) => {
          return (
            <a
              key={`${index}-${file._id}`}
              href={`${process.env.REACT_APP_URL_S3}${file.path}`}
              download
              className="text-cbs-primary break-all"
            >
              <p>{file.nameOrg}{index < value.length - 1 && `, `}</p>
            </a>
          );
        }),
    },
    {
      id: "_id",
      Header: <span className="pl-2 border-l border-cbs-border"></span>,
      headCellProps,
      cellProps: { className: "pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border" },
      Cell: (cell: Cell<DatahubContractBase>) => {
        const { user } = useAuth();
        return (
          <label className="w-6 h-6 flex justify-center items-center cursor-pointer mr-2">
            <img src={iconPageUp} alt="" className="inline-block" />
            {user && isSupporter(user) ?
              <input
                type="file"
                name="files"
                className="hidden"
                multiple
                onChange={e => options?.onClickUpload?.(e.target.files, cell)}
              />
              : <></>
            },
          </label>
        );
      },
    },
  ];
}

export default getColumnsContractorContract;