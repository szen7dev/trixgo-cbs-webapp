/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

// Global components
import { ButtonCreate, ButtonMore, GroupActions, Paginate, SearchInput } from 'shareComponents/common';
import { ContextMenu } from 'shareComponents/common/ContextMenu';

// App components
import { DocumentDropdown } from 'views/document/sharedComponents/common';

// Page component
import ModalCreateInspection from './components/ModalCreateInspection';
import ModalExtraLarge from 'shareComponents/common/ModalContainer/components/ModalExtraLarge';

// Hooks
import useQueryCustom from 'services/hooks/useQueryCustom';
import { TableWithoutContext } from 'shareComponents/common/Table';

// API
import DatahubRepository from 'apis/datahub';

// utils
import getColumnsInspection from 'views/datahub/utils/getColumnsInspection';

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubInspection: FC<{ type: number }> = ({ type }) => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [keyword, setKeyword] = useState('');

	const [selected, setSlected] = useState<DatahubInspection | null>();
	const queryClient = useQueryClient();

	const { data, resetPage, isLoading } = useQueryCustom(
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

	const columns = useMemo(() => getColumnsInspection(true), []);
	const instance = useTable({
		columns,
		data: data?.data?.listRecords || [],
		getRowId: (row) => row._id
	}, useRowSelect)

	const handleDeleteItem = useCallback(async (selectedRow: any) => {
		try {
			await DatahubRepository.deleteDatahubInspection({ inspectionDocID: selectedRow._id });
			toast.info('Xóa thành công');
			queryClient.removeQueries(['datahub_inspection', type]);
			setKeyword('');
			resetPage();
		} catch (error: any) {
			toast.error(error.message)
		}
	}, [])

	useEffect(() => {
		document.title = "DataHub | Biểu mẫu nghiệm thu"
	}, []);

	return (
		<>
			<ContextMenu scroller='scroller' >
				<ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
					<li className="hover:text-white hover:bg-cbs-secondary py-2 px-4 transition-none">
						<button onClick={e => { setShow(true) }}>
							Sửa {selected?.name}
						</button>
					</li>
				</ul>
			</ContextMenu>
			<div className="flex flex-col h-full overflow-hidden">
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
							if (!instance.selectedFlatRows.length) return
							setSlected(instance.selectedFlatRows[0].original);
							setShow(true);
						}}
						onClickTrash={() => {
							handleDeleteItem(instance.selectedFlatRows[0].original);
						}}
						disabled={{
							pencil: instance.selectedFlatRows.length !== 1,
							trash: instance.selectedFlatRows.length !== 1,
						}}
					/>

					<ButtonCreate onClick={() => setShow(!show)} />
					<ButtonMore />
				</div>
				<div className='flex-1 overflow-y-auto' id='scroller' >
					<TableWithoutContext
						instance={instance}
						isLoading={isLoading}
						rowLoading={4}
						tableProps={{
							className: "text-black text-medium border-separate space-x-0 space-y-0 w-full",
							style: { borderSpacing: 0 }
						}}
						getHeaderProps={() => ({ className: 'text-primary-gray whitespace-nowrap align-middle text-left' })}
						getRowProps={(row) => ({
							onContextMenu(e) {
								if (!row) return;
								e.preventDefault();
								setSlected(row.original)
							}
						})}
					/>
				</div>
				<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			</div>
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