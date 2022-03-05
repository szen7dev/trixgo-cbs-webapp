/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useDatahubProjects from "services/hooks/datahub/useDatahubProjects";

import useCheckedList from "services/hooks/ppt/useCheckedList";

import { Paginate } from "shareComponents/common";
import { SearchInput } from "shareComponents/common";

// import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import { GroupActions } from "shareComponents/common";
import { ButtonCreate } from "shareComponents/common";
import { ButtonMore } from "shareComponents/common";
import { DocumentDropdown } from "views/document/sharedComponents/common";
import ModalCreateProject from "./components/ModalCreateProject";
import { debounce } from 'lodash'
import { ContextMenu, ContextMenuWrapper } from "shareComponents/common/ContextMenu";
import { DatahubProjects } from "typings/datahub/projects";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { useQueryClient } from "react-query";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubProject: FC = () => {
	const queryClient = useQueryClient();
	const [query, setQuery] = useState('');
	const [pageCursor, setPageCuror] = useState({ page: [] as string[], cursor: '' });
	const { data, isFetching } = useDatahubProjects(['datahub_projects', pageCursor.cursor, query], {
		lastestID: pageCursor.cursor,
		populates: { "path": "client area1 area2 area3", select: '_id name' },
		limit: 10,
		keyword: query,
		select: '_id name sign client address area3 area2 area1 location note'
	});
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data?.data.listRecords || []);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu";
	}, []);

	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState<DatahubProjects | null>(null);

	function fetchNextPage() {
		if (data?.data.nextCursor) {
			pageCursor.page.push(data.data.nextCursor);
			setPageCuror({
				page: pageCursor.page,
				cursor: data.data.nextCursor,
			});
		}
	}

	function fetchPrevPage() {
		if (pageCursor.page.length > 0) {
			pageCursor.page.pop();
			setPageCuror({
				page: pageCursor.page,
				cursor: pageCursor.page[pageCursor.page.length - 1],
			});
		}
	}
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={debounce((event: any) => setQuery(event.target.value), 300)} />
				<DocumentDropdown
					data={pkgs}
					value={pkg.title}
					onSelectValue={setPkg}
				/>
				{/* <DropdownFilterButton /> */}
				<GroupActions className="flex items-center flex-1" />

				<ButtonCreate onClick={() => { setShow(!show); setSelected(null) }} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto" id="scroller">
				<ContextMenu scroller="scroller">
					<ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
						<li className="hover:text-white hover:bg-cbs-secondary py-2 px-4 transition-none">
							<button onClick={() => { setShow(true) }}>
								Sửa {selected?.name}
							</button>
						</li>
					</ul>
				</ContextMenu>
				<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Tên
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Mã hiệu
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Chủ đầu tư
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Địa chỉ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Khu vực dự án
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Địa chỉ theo GG map
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Ghi chú
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Hình ảnh
								</span>
							</th>
						</tr>
					</thead>
					<ContextMenuWrapper tag="tbody" className="text-small">
						{
							data?.data.listRecords.map((props) => {
								const {
									_id,
									name,
									sign,
									client,
									address,
									area3,
									area2,
									area1,
									location,
									note
								} = props
								return (
									<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer" onContextMenu={() => setSelected(props)}>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary">
											<Link to={'/datahub/type/' + _id} >
												{name}
											</Link>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{sign}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{typeof client !== 'string' && client.name}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{address}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{
											typeof area1 !== 'string' && typeof area2 !== 'string' && typeof area3 !== 'string' ? area3.name + ', ' + area2.name + ', ' + area1.name : ''}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{location}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{note}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right"></td>
									</tr>
								)
							})
						}
					</ContextMenuWrapper>
				</table>
			</div>
			<Paginate
				isFetching={isFetching}
				limit={data?.data.limit || 10}
				totalRecord={data?.data.totalRecord}
				totalPages={data?.data.totalPage}
				hasNextPage={Boolean(data?.data.nextCursor)}
				prevPageAction={fetchPrevPage}
				nextPageAction={fetchNextPage}
				className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
			/>
			<ModalExtraLarge show={show} buttonOnly>
				<ModalCreateProject
					type={selected?._id ? 'edit' : 'create'}
					datahubProjectID={selected?._id}
					toggle={() => setShow(!show)}
					onSuccessCreate={data => {
						queryClient.removeQueries(["datahub_projects"], { inactive: true });
						queryClient.refetchQueries(["datahub_projects"]);
						setPageCuror({ page: [], cursor: '' })
					}}
				/>
			</ModalExtraLarge>
		</div >
	);
};

export default DatahubProject