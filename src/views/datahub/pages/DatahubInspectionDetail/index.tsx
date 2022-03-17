import { FC, useEffect, useMemo, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import { Paginate } from "shareComponents/common";

// import DropdownFilterButton froeComponents/common";
import { ButtonCreate } from "shareComponents/common";
import { ButtonMore } from "shareComponents/common";
import getColumnsInspection from "views/datahub/utils/getColumnsInspection";
import ModalCreateInspectionDetail from "./components/ModalCreateInspectionDetail";

// Custom talbe
import useTableData, { TableWithoutContext } from 'shareComponents/common/Table';
import useQueryDatahub from "services/hooks/datahub/useQueryDatahub";
import InspectionCheckListRepository from "apis/datahub/InspectionCheckListRepository";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { useQuery } from "react-query";
import DatahubRepository from "apis/datahub";
import Skeleton from "react-loading-skeleton";
import { ContextMenu, useContextMenu } from "shareComponents/common/ContextMenu";

const DatahubInspectionDetail: FC = () => {
	const [show, setShow] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { open } = useContextMenu();

	const history = useHistory();
	const [keyword, setKeyword] = useState('');
	const [selected, setSlected] = useState<DatahubInspectionCheckList | null>();

	const { data: _d, isLoading } = useQuery(
		["datahub_package", id],
		() =>
			DatahubRepository.getDatahubInspection({
				inspectionDocID: id as string
			}),
		{
			refetchOnWindowFocus: false,
			enabled: Boolean(id), // https://react-query.tanstack.com/guides/disabling-queries
		}
	);

	const { data, isLoading: isLoadingList } = useQueryDatahub(
		["datahub_inspection_checklist", _d && '_id' in _d.data ? _d.data._id : '', keyword],
		({ cursor }) =>
			InspectionCheckListRepository.get({
				populates: { "path": "userCreate", select: '_id bizfullname' },
				limit: 20,
				keyword: keyword,
				inspectionID: id,
				// select: '_id name sign client address area3 area2 area1 location note',
				lastestID: cursor
			}),
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(_d && '_id' in _d.data && _d.data._id),
			keepPreviousData: true,
		}
	);

	const columns = useMemo(() => getColumnsInspection(), []);
	const _data = useMemo(() => data?.data?.listRecords || [], [data?.data.listRecords]);
	const instance = useTableData({
		columns,
		data: _data,
		tableHeadSelectorProps: { className: "px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1" },
		tableHeadSelectorInputProps: { className: 'cbs-checkbox' },
		tableCellSelectorProps: { className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" },
		tableCellSelectorInputProps: { className: 'cbs-checkbox' },
		getRowId: (row) => row._id
	})

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<button onClick={history.goBack}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<span className="text-x-large mr-auto">
					{isLoading
						? <Skeleton />
						: 'Kiểm tra cốt thép'
					}
				</span>

				<ButtonCreate onClick={() => { setShow(!show); setSlected(null) }} />
				<ButtonMore />
			</div>
			<ContextMenu scroller='scroller' >
				<ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
					<li className="hover:text-white hover:bg-cbs-secondary py-2 px-4 transition-none">
						<button onClick={e => { setShow(true) }}>
							Sửa {selected?.name}
						</button>
					</li>
				</ul>
			</ContextMenu>
			<div className="flex-1 overflow-y-auto">
				<TableWithoutContext
					isLoading={isLoading || isLoadingList}
					instance={instance}
					rowLoading={4}
					tableProps={{
						className: "text-black text-medium border-separate space-x-0 space-y-0 w-full",
						style: { borderSpacing: 0 }
					}}
					tableRowHeadProps={{ className: 'text-primary-gray whitespace-nowrap align-middle text-left' }}
					tableRowProps={(props, data) => {
						return {
							onContextMenu(e) {
								if (!data) return;
								e.preventDefault();
								e.stopPropagation();
								setSlected(data.row.original)
								open({ position: { x: e.clientX, y: e.clientY } });
							}
						}
					}}
				/>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			<ModalExtraLarge show={show}>
				<ModalCreateInspectionDetail
					inspectionChecklistID={selected?._id}
					inspectionDocID={id}

					toggle={() => setShow(!show)}
				/>
			</ModalExtraLarge>
		</div >
	);
};

export default DatahubInspectionDetail