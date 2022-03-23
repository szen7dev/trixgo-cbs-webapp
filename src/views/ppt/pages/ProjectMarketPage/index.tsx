import { FC, useEffect, useMemo, useState } from "react";

import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ModalExample from "./components/ModalExample";
import { TableOptions, useExpanded, useTable } from "react-table";
import { TableWithoutContext } from "shareComponents/common/Table";
import classNames from "classnames";

const ProjectMarketPage: FC = () => {
	// const [show, setShow] = useState<boolean>(true);
	const [isShow, setIsShow] = useState(false);

	const data = useMemo(() => Array.from({ length: 3 }).map((_, index) => ({
		_id: index * 3,
		project: { sign: 'test' },
		name: 'asd',
		expiredTime: Date.now(),
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, rem?",
		data: Array.from({ length: Math.ceil(Math.random() * 20) }).map((_d, i) => ({
			_id: index + '_' + i,
			name: '123213',
			total: 123123,
			status: 'A Dương đã báo Hiếu NBK kiểm tra, hỏi lại CĐT',
			last_contact: '28/09/2021',
			connector: 'Mr. Long CDC',
			posibility: 'Cao',
			note: 'Đã thuyết trình với Ms. Oanh. Chờ trao đổi với Ban lãnh đạo CĐT. Dịch vụ cung cấp (BIM, Tư vấn giá, nền tảng công nghệ, thầu)',
			time: Math.ceil(Math.random() * 100)
		}))
	})), []);

	const columns = useMemo(() => {
		const _columns: TableOptions<any>['columns'] = [{
			// Build our expander column
			id: 'expander', // Make sure it has an ID,
			Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded, ...rest }) => {
				// console.log(rest.toggleAllRowsExpanded)
				return (
					<button {...getToggleAllRowsExpandedProps({ className: "relative inline-block text-white rounded bg-gray-600 w-5 h-5 mx-2" })} onClick={() => {
						rest.toggleAllRowsExpanded(!isAllRowsExpanded)
					}}>
						{isAllRowsExpanded ? '-' : '+'}
					</button>
				)
			},
			cellProps: { className: 'w-1 p-1' },
			headCellProps: { className: 'align-middle px-1' },
			Cell: ({ row }) =>
				row.canExpand ? (
					<div className="relative">
						<button {...row.getToggleRowExpandedProps({ className: "relative inline-block text-white rounded bg-gray-600 w-5 h-5 mx-2" })}>
							{row.isExpanded ? '-' : '+'}
						</button>
					</div>
				) : null,

		},
		{
			accessor: 'name',
			Header: "Nội dung",
			cellProps: { colSpan: 9, className: 'text-left' },
		},
		{
			accessor: 'total',
			Header: "Tổng mức đầu tư",
		},
		{
			accessor: 'status',
			Header: "Tình trạng hiện tại",
		},
		{
			accessor: 'last_contact',
			Header: "Ngày liên hệ gần nhất",
		},
		{
			accessor: 'connector',
			Header: "Đầu mối kết nối",
		},
		{
			accessor: 'posibility',
			Header: "Khả năng thành công",
		},
		{
			accessor: 'note',
			Header: "Ghi chú tiến trình"
		},
		{
			accessor: 'time',
			Header: 'Số ngày cách đây',
			subCellProps: { className: 'w-1 align-middle text-center font-bold', style: { minWidth: 90 } },
			headCellProps: { className: 'w-1', style: { minWidth: 90 } },
		}
		]
		return _columns;
	}, [])

	const instance = useTable({
		data,
		columns,
		getSubRows: (originalRow: any) => {
			return originalRow?.data || []
		},
	}, useExpanded)

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	return (
		<>
			<div className="text-cbs-subtext flex flex-col overflow-hidden h-full">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<div className="mr-auto"></div>
					{/* <DropdownFilterButton className="mr-auto" /> */}
					{/* <GroupActions className="flex items-center flex-1" /> */}

					<ButtonCreate onClick={() => setIsShow(!isShow)} />
					<ButtonMore />
				</div>
				<div className="custom-scroll flex-1 overflow-y-auto px-2">
					<TableWithoutContext
						tableProps={{ className: 'table_one w-full border-separate text-small mt-2 text-black text-left' }}
						tableHeadProps={{ className: 'z-10 relative' }}

						getRowProps={(row) => {
							return {
								className: row.depth === 0
									? classNames('row__parent font-bold uppercase', row.isExpanded ? '' : 'collapse')
									: row.index === instance.rowsById[row.id.split('.').slice(0, -1).join('.')].subRows.length - 1 ? 'row__last-child row__child' : 'row__child',
								style: {
									background: row.depth ? row.index % 2 === 0 ? "rgba(0,0,0,.1)" : "white" : ''
								}
							}
						}}

						getCellChildProps={(cellInfo) => ({
								style: {
									backgroundColor: cellInfo.column.id === 'time' ? `hsl(${120 * ((120 - cellInfo.value) / 120) * -1 + 120
										}, 100%, 67%)` : ''
								}
							})
						}

						colSpan
						instance={instance}
					/>
				</div>
			</div>
			<ModalExample isShow={isShow} toggle={() => setIsShow(!isShow)} />
		</>
	);
};

export default ProjectMarketPage;
