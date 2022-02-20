/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useCheckedList from "services/hooks/ppt/useCheckedList";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";

import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import DocumentDropdown from "views/pages/document/components/DocumentDropdown";
import ModalCreateProject from "../components/ModalCreateProject";

const _data = {
	name: "Tổ hợp chung cư cao tầng KH2",
	code: "CHG.THT",
	owner: "Công ty Cổ phần PGI Partners",
	address: "Số 147 Hoàng Quốc Việt",
	address_project: "Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội",
	long: "1050332",
	lat: "23045454",
	note: "Đang triển khai",
	created_at: "15:30 22/12/2021",
	updated_at: "15:30 22/12/2021",
}

type DataModuleState = typeof _data & { _id: string | number }

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubProject: FC = () => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);

	const [data, setData] = useState<DataModuleState[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu";
		setData(Array.from({ length: 30 }).map((_, index) => ({ ..._data, _id: index })));
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DocumentDropdown
					data={pkgs}
					value={pkg.title}
					onSelectValue={setPkg}
				/>
				{/* <DropdownFilterButton /> */}
				<GroupActions className="flex items-center flex-1" />

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
					<tbody className="text-small">
						{
							data.map((props) => {
								const {
									_id,
									name,
									code,
									owner,
									address,
									address_project,
									long,
									lat,
									note,
								} = props
								return (
									<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary">
											<Link to={'/datahub/type/' + _id} >
												{name}
											</Link>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{code}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{owner}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{address}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{address_project}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{[long, lat].join(', ')}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right">{note}</td>
										<td className="pt-2.5 pb-3 pl-2 border-b border-cbs-border text-right"></td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			<ModalCreateProject type='create' show={show} toggle={() => setShow(!show)} buttonOnly />
		</div >
	);
};

export default DatahubProject