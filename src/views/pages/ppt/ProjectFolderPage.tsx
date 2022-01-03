import { FC, useEffect, useState } from "react";

import cn from 'classnames';

import iconFile from 'assets/images/icons8-audit-96.png';
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import Paginate from "components/common/Paginate";

// import 'swiper/swiper-bundle.min.css';

interface IData {
	id: number,
	type: string,
	content: string,
	created_by: string,
	created_at: string,
	code: string,
	count: number,
	status: number,
	path: string,
}

const IconArrowRight = () => (
	<div className="">
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	</div>
)

const FolderIcon: FC<{ type: string }> = ({ type }) => {
	switch (type) {
		case "file":
			return <img src={iconFile} alt="file" className="inline-block mr-3" />;
		default:
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-cbs-subtext mr-3" viewBox="0 0 20 20" fill="currentColor">
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
				</svg>
			);
	}
}

function getStatusLabel(status: number) {
	switch (status) {
		case 1:
			return 'Đang thực hiện'
		default:
			return 'Lỗi';
	}
}

const ProjectFolderPage: FC<RouteComponentProps> = ({ match }) => {
	const history = useHistory();
	const location = useLocation();
	const [data, setData] = useState<IData[]>([]);

	useEffect(() => {
		document.title = "CHG.THT-Thư mục dữ liệu";
		setData(Array.from({ length: Math.ceil(Math.random() * 30) }).map((_, i) => ({
			id: i,
			type: i < 3 ? 'folder' : 'file',
			content: "Thi công san lấp mặt bằng công trình",
			created_by: "Nguyễn Thị Ngân-CPMI",
			created_at: "14/11/21",
			code: "ARM.CAL-PGI.PMI\\HDCG\\210515",
			status: 1,
			count: 12,
			path: '/123'
		})))
	}, [location.pathname]);

	return (
		<>
			{/* Content */}
			<div className="flex flex-col h-full overflow-hidden">
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
										Thời hạn
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thực hiện
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Trạng thái
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
									type,
									content,
									created_by,
									created_at,
									status,
									count,
									path
								}, index) => {
									return (
										<tr key={index} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={() => history.push(match.path + path)}>
											<td className="px-4 py-2 w-[1px]">
												<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
											</td>
											<td className="px-2 py-2">
												<p className="align-top">
													<FolderIcon type={type} />
													{content}
												</p>
											</td>
											<td className="py-2 px-2">{type !== 'folder' ? created_at : null}</td>
											<td className="py-2 px-2">
												{
													type !== 'folder' ?
														<div>
															<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full inline-block mr-3" />
															{created_by}
														</div>
														: null
												}
											</td>
											<td className="py-2 px-2 text-cbs-primary">{type !== 'folder' ? getStatusLabel(status) : null}</td>
											<td className="py-2 px-2">
												{
													type === 'folder'
														? <div className="flex">
															<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full" />
															<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
															<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
															<div className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center" style={{ fontSize: "10px" }}>+15</div>
														</div>
														: <div className="pr-4">
															<p className="text-right">3/10</p>
															<div className="rounded border-0.5 border-cbs-border h-1 box-content mt-1">
																<div className="h-full bg-cbs-schedule-after-7days" style={{ width: '30%' }}></div>
															</div>
														</div>
												}
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
			</div>
		</>
	);
};

export default ProjectFolderPage;
