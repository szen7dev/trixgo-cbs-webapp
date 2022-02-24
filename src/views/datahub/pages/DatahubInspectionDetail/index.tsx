/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import useCheckedList from "services/hooks/ppt/useCheckedList";

import { Paginate } from "shareComponents/common";

// import DropdownFilterButton froeComponents/common";
import { ButtonCreate } from "shareComponents/common";
import { ButtonMore } from "shareComponents/common";
import ModalCreateInspectionDetail from "./components/ModalCreateInspectionDetail";

const DatahubInspectionDetail: FC = () => {
	const [show, setShow] = useState(false);

	const history = useHistory();
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
		setData(Array.from({ length: 5 }).map((_, index) => ({
			id: index,
			content: "Kiểm tra cốt thép",
			code: "KC.KCCT",
			description: "Kiểm tra cốt thép",
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
				<span className="text-x-large mr-auto">Kiểm tra cốt thép</span>

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
									Mã hiệu
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Mô tả
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Cập nhật
								</span>
							</th>
						</tr>
					</thead>
					<tbody className="text-small">
						{
							data.map((props) => {
								const {
									id,
									content,
									code,
									description,
								} = props
								return (
									<tr key={id} className="text-left group hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[id])} onChange={e => handleChangeCheckbox(e, props)} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border group-hover:text-cbs-primary">
											{content}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{code}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{description}</td>
										<td className="pt-2.5 pb-3 pl-2 pr-4 border-b border-cbs-border">
											<span className='mr-3'>Nguyễn Văn A-TRX</span>
											<span className='text-cbs-subtext'>15:30 12/8/2021</span>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			<ModalCreateInspectionDetail type='create' show={show} toggle={() => setShow(!show)} buttonOnly />
		</div >
	);
};

export default DatahubInspectionDetail