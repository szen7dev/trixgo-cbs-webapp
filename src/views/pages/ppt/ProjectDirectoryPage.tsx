import { FC, useContext, useEffect, useState } from "react";

// Hook
import useCheckedList from "./hook/useCheckedList";

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
	const [data, setData] = useState<{ _id: number | string, [key: string]: string | number }[]>([])
	const { assigned, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList(data)

	useEffect(() => {
		document.title = "CHG.THT-Hồ sơ văn bản"
		setData(Array.from({ length: 30 }).map((_, index) => ({
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
		})));
	}, []);

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
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
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
					<RowGroup checkedList={assigned} onClickCheckbox={handleChangeCheckbox} index={0} />
					<RowGroup checkedList={assigned} onClickCheckbox={handleChangeCheckbox} index={1} />
					<RowGroup checkedList={assigned} onClickCheckbox={handleChangeCheckbox} index={2} />
					<RowGroup checkedList={assigned} onClickCheckbox={handleChangeCheckbox} index={3} />
					<RowGroup checkedList={assigned} onClickCheckbox={handleChangeCheckbox} index={4} />
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