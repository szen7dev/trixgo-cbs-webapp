/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { useHistory, useParams, useLocation } from "react-router-dom";

import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useDatahubType, useDatahubTypes } from "services/hooks/datahub";

import { Paginate } from "shareComponents/common";
import { SearchInput } from "shareComponents/common";

// import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import { GroupActions } from "shareComponents/common";
import { ButtonCreate } from "shareComponents/common";
import { ButtonMore } from "shareComponents/common";
import { DocumentDropdown } from "views/document/sharedComponents/common";
import ModalCreateType from "../DatahubType/components/ModalCreateType";

// ======= Type =======
import { DatahubTypes, DatahubTypesBase } from "typings/datahub/datahubtypes";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { useQueryClient } from "react-query";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubTypeDetail: FC = () => {
	const [show, setShow] = useState(false);
	const [pkg, setPkg] = useState(pkgs[0]);
	const [selected, setSelected] = useState<DatahubTypes<keyof DatahubTypesBase> | null>(null);
	const queryClient = useQueryClient();

	const history = useHistory();
	const params = useParams<{ id: string }>();
	const location = useLocation<{ type: number } | undefined>();
	const { data: dataDetail } = useDatahubType(params.id);

	const { data, fetchNextPage, fetchPrevPage, resetPage } = useDatahubTypes({
		parentID: params.id,
		select: '_id name description popular',
		keyword: '',
		limit: 10,
		type: dataDetail?.data.type
	}, {
		enabled: dataDetail ? !dataDetail.error : Boolean(dataDetail)
	});

	const { assigned, checked, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data?.data.listRecords || []);

	useEffect(() => {
		document.title = "DataHub | Phân loại hệ thống"
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<button onClick={history.goBack}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<span className="text-x-large mr-7 max-w-sm">{dataDetail?.data.name}</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DocumentDropdown
					data={pkgs}
					value={pkg.title}
					onSelectValue={setPkg}
				/>
				{/* <DropdownFilterButton /> */}
				<GroupActions
					types={['edit']}
					className="flex items-center flex-1"
					onClickPencil={() => { setShow(true); setSelected(checked[0]) }}
					disabled={{
						pencil: checked.length !== 1,
					}}
				/>

				<ButtonCreate
					disabled={dataDetail ? dataDetail.error : true}
					onClick={() => { setShow(!show); setSelected(null) }} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Nội dung
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Mô tả
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Tính phổ biến
								</span>
							</th>
						</tr>
					</thead>
					<tbody className="text-small">
						{
							data?.data.listRecords.map((props) => {
								const {
									_id,
									name,
									description,
									popular,
								} = props
								return (
									<tr key={_id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{name}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{description}</td>
										<td className="pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border text-right">{popular ? "Thông thường" : "Phổ biến"}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate
				limit={data?.data.limit || 10}
				totalRecord={data?.data.totalRecord}
				totalPages={data?.data.totalPage}
				hasNextPage={Boolean(data?.data.nextCursor)}
				prevPageAction={fetchPrevPage}
				nextPageAction={fetchNextPage}
				className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
			/>
			<ModalExtraLarge show={show} buttonOnly>
				<ModalCreateType
					type={selected?._id ? 'edit' : 'create'}
					datahubType={dataDetail?.data.type || 1}
					datahubID={selected?._id}
					parent={params.id}
					toggle={() => setShow(false)}
					onSuccessCreate={data => {
						queryClient.removeQueries(["datahub_types", location?.state?.type || 1, params.id], { inactive: true });
						resetPage();
					}}
				/>
			</ModalExtraLarge>
		</div >
	);
};

export default DatahubTypeDetail