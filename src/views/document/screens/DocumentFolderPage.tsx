import { FC } from "react";

interface IData {
	id: number,
	content: string,
	created_by: string,
	created_at: string,
	code: string,
	count: number,
}

const data: Array<IData> = Array.from(Array(30).keys()).map((_, i) => ({
	id: i,
	content: "Thi công san lấp mặt bằng công trình",
	created_by: "Nguyễn Thị Ngân-CPMI",
	created_at: "17:20 14/11/21 Hương-CPMI",
	code: "ARM.CAL-PGI.PMI\\HDCG\\210515",
	count: 12,
}))

const IconArrowRight = () => (
	<div className="">
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	</div>
)

const DocumentFolderPage: FC = () => {
	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black text-small py-1">
					<span className="">CHG.THT</span>
					<IconArrowRight />
					<button className="bg-cbs-active-comment text-cbs-primary h-10 w-10 text-center rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
						</svg>
					</button>
					<IconArrowRight />
					<span className="truncate max-w-[132px]">Thi công san lấp mặt bằng</span>
					<IconArrowRight />
					<span>Hợp đồng</span>
				</div>
				<div className="flex-1 overflow-y-auto">
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Nội dung
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Người tạo
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Ngày văn bản
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Số lượng hồ sơ
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Người được truy cập
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
							{
								data.map(({
									id,
									content,
									created_by,
									created_at,
									count,
								}, index) => {
									return (
										<tr key={index} className="text-left hover:bg-cbs-active-comment">
											<td className="px-4 py-2 w-[1px]">
												<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
											</td>
											<td className="px-2 py-2">
												<p className="align-top">
													<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-cbs-subtext mr-3" viewBox="0 0 20 20" fill="currentColor">
														<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
													</svg>
													{content}
												</p>
											</td>
											<td className="py-2 px-2">{created_by}</td>
											<td className="py-2 px-2">{created_at}</td>
											<td className="py-2 px-2">{count}</td>
											<td className="py-2 px-2">
												<div className="flex">
													<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full" />
													<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
													<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
													<div className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center" style={{ fontSize: "10px" }}>+15</div>
												</div>

											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default DocumentFolderPage;
