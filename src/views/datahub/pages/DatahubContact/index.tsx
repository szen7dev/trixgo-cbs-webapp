/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useQueryClient } from 'react-query'
import { debounce } from 'lodash'

import { useDatahubContact } from "services/hooks/datahub/contact/useDatahubContact";

import useCheckedList from "services/hooks/ppt/useCheckedList";
import { Paginate } from "shareComponents/common";
import { SearchInput } from "shareComponents/common";

import { GroupActions, ButtonCreate, ButtonMore } from "shareComponents/common";
import { DocumentDropdown } from "views/document/sharedComponents/common";
import ModalCreateDatahubContact from "./components/ModalCreateDatahubContact";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { ContextMenuWrapper, ContextMenu } from "shareComponents/common/ContextMenu";
import { DatahubTypes, DatahubTypesBase } from "typings/datahub/datahubtypes";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubContact: FC = () => {
	document.title = "Danh Bạ Hệ Thống"
	const queryClient = useQueryClient(); 
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState<DatahubTypes<keyof DatahubTypesBase> | null>(null);
	const [keyword, setKeyword] = useState("");
	// const { data, fetchNextPage, fetchPrevPage, resetPage } = useDatahubTypes({ level: 1, select: '_id name description popular', keyword: query, limit: 10, type: 1 });
	const {
		isLoading,
        refetchList,
        data: listDatahubContact,
        fetchNextPage,
		fetchPrevPage, resetPage,
        hasNextPage,
        totalRecord,
        totalPage,
	} = useDatahubContact({ keyword, limit: 20 }, true, false );
	const { assigned, checked, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList((listDatahubContact as never[]) || []);
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={debounce((v: any) => setKeyword(v.target.value), 300)} />
				<DocumentDropdown
					data={pkgs}
					value={pkg.title}
					onSelectValue={setPkg}
				/>
				{/* <DropdownFilterButton /> */}
				<GroupActions
					className="flex items-center flex-1"
					onClickPencil={() => { setShow(true); setSelected(checked[0]) }}
					disabled={{
						pencil: checked.length !== 1,
					}}
				/>

				<ButtonCreate onClick={() => { setShow(true); setSelected(null) }} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto" id="scroller">
				<ContextMenu scroller="scroller" >
					<ul className="bg-white shadow-cbs-md py-0.5 max-h-32 overflow-auto rounded-cbs border-0.5 border-cbs-border">
						<li className="hover:text-white hover:bg-cbs-secondary py-2 px-4 transition-none">
							<button onClick={e => { setShow(true) }}>
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
									STT
								</span>
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
									Địa chỉ
								</span>
							</th>

							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Mã số thuế
								</span>
							</th>
							
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Ghi chú
								</span>
							</th>
						</tr>
					</thead>
					<ContextMenuWrapper tag="tbody" className="text-small">
						{	
							listDatahubContact?.map((props: any, index: number) => {
								const { _id, name, sign, address, taxid, note } = props
								return (
									<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer" onContextMenu={() => setSelected(props)}>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{index + 1}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary">
											{name}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{sign}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{address}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{taxid}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{note}</td>
									</tr>
								)
							})
						}
					</ContextMenuWrapper>
				</table>
			</div>
			<Paginate
				limit={20}
				totalRecord={totalRecord}
				totalPages={totalPage}
				hasNextPage={Boolean(hasNextPage)}
				prevPageAction={fetchPrevPage}
				nextPageAction={fetchNextPage}
				className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
			/>
			<ModalExtraLarge show={show} buttonOnly>
				<ModalCreateDatahubContact
					datahubContactID={selected?._id}
					datahubType={1}
					type={selected?._id ? 'edit' : 'create'}
					toggle={() => setShow(false)}
					refetchList= { refetchList }
					onSuccessCreate={data => {
						queryClient.removeQueries(["datahub_types"], { inactive: true });
						queryClient.refetchQueries(["datahub_types", ""]);
						resetPage();
					}}
				/>
			</ModalExtraLarge>
		</div >
	);
};

export default DatahubContact