import { FC, useEffect, useMemo } from "react";
import useCheckedList from "services/hooks/ppt/useCheckedList";

const ProjectDrawing2Page: FC = () => {
	const data = useMemo(() => Array.from({ length: 30 }).map((_, index) => ({
		id: index,
		code: 'A-00-0' + index,
		name: '10TH TO 23RD STOREY PLAN',
		size: 'A3',
		note: 'Thay đổi góc cạnh của bể bơi',
		version_1: '15/2/2021',
		version_2: '08/3/2021',
		version_3: '12/4/2021',
		created_by: 'Sở Kế hoạch và Đầu tư thành phố Hà Nội',
		created_at: "15:30 22/12/2021",
	})), []);
	const { assigned, checkboxRef, handleCheckAll, handleChangeCheckbox } = useCheckedList(data)
	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Content */}
			<div className="flex overflow-auto flex-1">
				<div className="w-[330px] border-r border-cbs-border h-full">
					{
						Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="flex gap-x-2.5 px-4 pt-3 pb-2 hover:bg-cbs-active-comment">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<h3 className="font-bold">Bản vẽ phần hoàn thiện toàn bộ hạng mục công trình</h3>
									<p>182 bản vẽ</p>
								</div>
							</div>
						))
					}
				</div>
				<div className="flex-1 h-full overflow-auto">
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="py-2.5 px-2.5 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border w-1">
									<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Mã hiệu
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Tên bản vẽ
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Khổ giấy
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Phiên bản 1
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Phiên bản 2
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
									Phiên bản ...
								</th>
								<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border" style={{ minWidth: "150px" }}>
									Ghi chú
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
							{
								data.map((props) => {
									const { id, code, name, size, note, version_1, version_2, version_3 } = props;
									return (
										<tr key={id} className="text-left hover:bg-cbs-active-comment">
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border text-center" onClick={e => { e.stopPropagation() }}>
												<input className="" type="checkbox" value="" checked={assigned[id]} onChange={e => handleChangeCheckbox(e, props)} />
											</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{code}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{name}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{size}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{version_1}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{version_2}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{version_3}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">{note}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProjectDrawing2Page;