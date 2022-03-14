import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Global components
import { ButtonCreate, ButtonMore, GroupActions, Paginate, SearchInput } from 'shareComponents/common';
import Table, { TableProperties } from 'shareComponents/common/Table/Table';

// App components
import { DocumentDropdown } from 'views/document/sharedComponents/common';

// Page component
import ModalCreateInspection from './components/ModalCreateInspection';

// Hooks
import useQueryDatahub from 'services/hooks/datahub/useQueryDatahub';

// API
import DatahubRepository from 'apis/datahub';
import ModalExtraLarge from 'shareComponents/common/ModalContainer/components/ModalExtraLarge';
import moment from 'moment';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const headCellProps = { className: 'py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border' }

const getColumns = (): TableProperties<DatahubInspection>['columns'] => ([
	{
		accessor: 'name',
		Header: <span className="pl-2 border-l border-cbs-border">Nội dung</span>,
		headCellProps,
		cellProps: { className: 'pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary' },
		Cell: ({ row, value }: any) => <Link to={'/datahub/inspection/' + row.id}>{value}</Link>
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

const DatahubInspection: FC<{ type: number }> = ({ type }) => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [keyword, setKeyword] = useState('');

	const [selected, setSlected] = useState<DatahubInspection | null>();
	const queryClient = useQueryClient();

	const { data, resetPage } = useQueryDatahub(
		["datahub_inspection", type, keyword],
		({ cursor }) =>
			DatahubRepository.getDatahubInspection({
				populates: { "path": "userCreate", select: '_id bizfullname' },
				type,
				limit: 10,
				keyword: keyword,
				// select: '_id name sign client address area3 area2 area1 location note',
				lastestID: cursor
			}),
		{
			refetchOnMount: false,
			// onSuccess: options?.onSuccess,
			refetchOnWindowFocus: false,
			enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
			keepPreviousData: true,
		}
	);

	const handleDeleteItem = useCallback(async (selectedRow: any) => {
		try {
			await DatahubRepository.deleteDatahubInspection({ inspectionDocID: selectedRow._id });
			queryClient.removeQueries(['datahub_inspection', type]);
			setKeyword('');
			resetPage();
		} catch (error: any) {
			toast.error(error.message)
		}
	}, [])

	const columns = useMemo(getColumns, []);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
	}, []);

	return (
		<>
			<Table
				wrapperComponent={({ children, state, selectedFlatRows }) => {
					// console.log(state, selectedFlatRows)
					return <div className="flex flex-col h-full overflow-hidden">
						<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
							<span className="text-x-large mr-7">Danh sách</span>
							<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={(e) => setKeyword(e.target.value)} />
							<DocumentDropdown
								data={pkgs}
								value={pkg.title}
								onSelectValue={setPkg}
							/>
							{/* <DropdownFilterButton /> */}
							<GroupActions
								className="flex items-center flex-1"
								onClickPencil={() => {
									if (!selectedFlatRows.length) return
									setSlected(selectedFlatRows[0].original);
									setShow(true);
								}}
								onClickTrash={() => {
									handleDeleteItem(selectedFlatRows[0].original);
								}}
								disabled={{
									pencil: selectedFlatRows.length !== 1,
									trash: selectedFlatRows.length !== 1,
								}}
							/>

							<ButtonCreate onClick={() => setShow(!show)} />
							<ButtonMore />
						</div>
						<div className='flex-1 overflow-y-auto'>
							{children}
						</div>
						{/* </div> */}
						<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
					</div>
				}
				}
				data={data?.data?.listRecords || []}
				tableProps={{
					className: "text-black text-medium border-separate space-x-0 space-y-0 w-full",
					style: { borderSpacing: 0 }
				}}

				getRowId={(row) => row._id}

				tableHeadSelectorProps={{ className: "px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1" }}
				tableHeadSelectorInputProps={{ className: 'cbs-checkbox' }}
				tableCellSelectorProps={{ className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" }}
				tableCellSelectorInputProps={{ className: 'cbs-checkbox' }}

				tableRowHeadProps={{ className: 'text-primary-gray whitespace-nowrap align-middle text-left' }}
				tableRowProps={(props, { row }) => ({ onContextMenu(e) { e.preventDefault(); console.log(row.id) } })}

				columns={columns}
			/>
			<ModalExtraLarge show={show}>
				<ModalCreateInspection
					inspectionDocID={selected?._id}
					type={type}

					toggle={() => setShow(!show)}
				/>
			</ModalExtraLarge>
		</>
	);
}

export default DatahubInspection