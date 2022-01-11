import { FC, useContext, useEffect, useMemo } from "react";

import { useHistory } from "react-router";

// Context
import { Context, Provider as ModalProvider } from "../document/contexts/contextModal";

import SearchInput from "components/common/SearchInput";
import Paginate from "components/common/Paginate";

import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import ModalCreateDocument from "views/pages/document/components/common/ModalCreateDocument";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import RowGroup from "./components/directory/RowGroup";

const ProjectDirectory: FC = () => {
	const { toggleModal } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		document.title = "CHG.THT-Hồ sơ văn bản"
	}, []);
	const data = useMemo(() => Array.from({ length: 30 }).map((_, index) => ({
		_id: index,
		content: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
		created_by: 'Sở Kế hoạch và Đầu tư thành phố Hà Nội',
		code: 'ARM.CAL-PGI.PMI\\HDCG\\210515',
		saved_code: 'ARM.CAL-PGI.PMI\\HDCG\\210515',
		amount: 12,
		signed: index % 4,
		note: 'Có bản gốc đi kèm',
		saved_location: "Cặp F1, Ngăn A5, tủ A",
		created_at: "15:30 22/12/2021",
	})), []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DropdownFilterButton />
				<GroupActions className="flex items-center flex-1" />

				<ButtonCreate onClick={toggleModal} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-x-small border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={input => { if (input) input.indeterminate = true }} />
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Đơn vị/Thành viên
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Địa chỉ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Chức vụ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Điện thoại
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Email
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Ghi chú
								</span>
							</th>
						</tr>
					</thead>
					<RowGroup />
					<RowGroup />
					<RowGroup />
					<RowGroup />
					<RowGroup />
					{/* <tbody className="text-small">
						{
							data.map(({
								_id,
								content,
								created_by,
								code,
								created_at,
								saved_code,
								amount,
								signed,
								note,
								saved_location,
							}) => {
								return (
									<tr key={_id} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={() => history.push('/')}>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="" type="checkbox" value="" id="flexCheckDefault" />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{content}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{created_by}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{code}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{created_at}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{saved_code}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{amount}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{signed ? 'Đã ký' : 'Chưa ký'}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{note}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{saved_location}</td>
									</tr>
								)
							})
						}
					</tbody> */}
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
		</div >
	);
};

const ProjectDirectoryPage: FC = () => {
	return (
		<ModalProvider>
			<ProjectDirectory />
			<ModalCreateDocument />
		</ModalProvider>
	)
}

export default ProjectDirectoryPage;