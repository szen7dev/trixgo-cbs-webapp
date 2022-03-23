import moment from "moment"
import { Link } from "react-router-dom"
import { TableOptions } from "react-table"
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn"

const headCellProps = { className: 'py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border' }

function getColumnsInspection<T extends boolean>(navigate?: T): TableOptions<T extends true ? DatahubInspection : DatahubInspectionCheckList>['columns'] {
	return ([
		SelectionColumn({
			tableHeadSelectorProps: { className: "px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1" },
			tableHeadSelectorInputProps: { className: 'cbs-checkbox' },
			tableCellSelectorProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" },
			tableCellSelectorInputProps: { className: 'cbs-checkbox' }
		}),
		{
			accessor: 'name',
			Header: <span className="pl-2 border-l border-cbs-border">Nội dung</span>,
			headCellProps,
			cellProps: { className: 'pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary' },
			Cell: ({ row, value }: any) => navigate ? <Link to={'/datahub/inspection/' + row.id}>{value}</Link> : value
		},
		{
			accessor: 'sign',
			Header: <span className="pl-2 border-l border-cbs-border">Mã hiệu</span>,
			headCellProps,
			cellProps: { className: 'pt-2.5 pb-3 px-2 border-b border-cbs-border' }
		},
		{
			accessor: 'description',
			Header: <span className="pl-2 border-l border-cbs-border">Mô tả</span>,
			headCellProps,
			cellProps: { className: 'pt-2.5 pb-3 px-2 border-b border-cbs-border' }
		},
		{
			id: 'update',
			Header: <span className="pl-2 border-l border-cbs-border">Cập nhật</span>,
			headCellProps,
			cellProps: { className: 'pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border' },
			Cell: ({ row }: any) => {
				return <>
					<span className='mr-3'>{row.original.userCreate?.bizfullname}</span>
					<span className='text-cbs-subtext'>{moment(row.updatedAt).format('hh:mm DD/MM/YYYY')}</span>
				</>
			}
		},
	])
}
export default getColumnsInspection