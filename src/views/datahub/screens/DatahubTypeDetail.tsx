/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import useCheckedList from "services/hooks/ppt/useCheckedList";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";

import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import GroupActions from "views/document/components/projects/GroupActions";
import ButtonCreate from "views/document/components/common/ButtonCreate";
import ButtonMore from "views/document/components/common/ButtonMore";
import DocumentDropdown from "views/document/components/DocumentDropdown";
import ModalCreateType from "../components/ModalCreateType";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubTypeDetail: FC = () => {
	const [show, setShow] = useState(false);
	const [pkg, setPkg] = useState(pkgs[0]);

	const history = useHistory();
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
		setData(Array.from({ length: 5 }).map((_, index) => ({
			id: index,
			project: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
			joined: 8,
			worked: 15,
			created_at: "15:30 22/12/2021",
			updated_at: "15:30 22/12/2021",
			status: index,
		})));
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<button onClick={history.goBack}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<span className="text-x-large mr-7">Tiêu đề</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DocumentDropdown
					data={pkgs}
					value={pkg.title}
					onSelectValue={setPkg}
				/>
				{/* <DropdownFilterButton /> */}
				<GroupActions types={['edit']} className="flex items-center flex-1" />

				<ButtonCreate onClick={() => setShow(!show)} />
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
							data.map((props) => {
								const {
									id,
									project,
									joined,
									worked,
								} = props
								return (
									<tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{project}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{joined}</td>
										<td className="pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border text-right">{worked}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			<ModalCreateType type='create' show={show} toggle={() => setShow(!show)} buttonOnly />
		</div >
	);
};

export default DatahubTypeDetail