import { FC, useEffect, useMemo, useState } from "react";

import cn from "classnames";

import styles from "./style.module.css";

const _pages = [
	{ id: 'dashboard', title: 'Dashboard' },
	{ id: 'finnace', title: 'Kế hoạch tài chính' },
	{ id: 'report', title: 'Báo cáo' },
]

const ExamplePage: FC = () => {
	const [pages, setPages] = useState(_pages);
	const data = useMemo(() => {
		const _data: Array<any> = [];
		_data.length = 10;
		_data.fill(null);
		return _data.map((_i, index) => ({
			id: index.toString(),
			progress: Math.floor(Math.random() * 100)
		}))
	}, []);

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	return (
		// <div className="flex flex-col w-full overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
		<div className={cn(styles.content, styles['bg-gray'])}>
			<div className={cn(styles.header, 'px-4 flex justify-between w-full')}>
				<div className="flex flex-wrap justify-center flex-1">
					{pages.map(page => <div key={page.id} className={cn(styles.navigator, { [styles.active]: page.id === 'dashboard' })}>
						<button>
							{page.title}
						</button>
					</div>)}
				</div>
				<div className={cn(styles['input-container'], 'rounded-full flex my-2.5')}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1" placeholder="Tìm kiếm" />
				</div>
			</div>
			<div className={cn(styles['content-container'], "overflow-y-auto p-4")}>
				{/* Content */}
				<div className="flex flex-wrap -mx-2">
					<div className={cn("px-2")}>
						<div className={cn(styles['finance-cell'], 'h-full')}>
							<div className={styles['finance-progress']}>
								<div className={styles.warn}>7</div>
								<div className={styles.success}>125</div>
								<div className={styles.purple}>62</div>
								<div className={styles.danger}>6</div>
							</div>
							<div className="grid grid-cols-2">
								<div className="flex items-center" style={{ minWidth: '257px' }}><div className={cn(styles.success, 'w-3 h-3 rounded-lg mr-2')} style={{ backgroundColor: 'currentcolor' }}></div>ĐÚNG TIẾN ĐỘ, ĐÚNG NGÂN SÁCH</div>
								<div className="flex items-center" style={{ minWidth: '257px' }}><div className={cn(styles.purple, 'w-3 h-3 rounded-lg mr-2')} style={{ backgroundColor: 'currentcolor' }}></div>CHẬM TIẾN ĐỘ, ĐÚNG NGÂN SÁCH</div>
								<div className="flex items-center" style={{ minWidth: '257px' }}><div className={cn(styles.warn, 'w-3 h-3 rounded-lg mr-2')} style={{ backgroundColor: 'currentcolor' }}></div>ĐÚNG TIẾN ĐỘ, VƯỢT NGÂN SÁCH</div>
								<div className="flex items-center" style={{ minWidth: '257px' }}><div className={cn(styles.danger, 'w-3 h-3 rounded-lg mr-2')} style={{ backgroundColor: 'currentcolor' }}></div>CHẬM TIẾN ĐỘ, VƯỢT NGÂN SÁCH</div>
							</div>
						</div>
					</div>
					<div className={cn("px-2")}>
						<div className={cn(styles['finance-cell'], 'h-full')}>
							<div className="px-3.5">
								<div>
									<p style={{ lineHeight: "13.4px", fontSize: '12px', marginTop: "20px" }}>Ngân sách (100%)</p>
									<div className="flex items-center" style={{ marginTop: '5px' }}>
										<div className={cn(styles['finance-total'], styles.success, 'mr-2')} style={{ width: "299px", height: '12px' }}></div>
										<div>$696.8 MM</div>
									</div>
								</div>
								<div>
									<p style={{ lineHeight: "13.4px", fontSize: '12px', marginTop: "20px" }}>Dự báo (98%)</p>
									<div className="flex items-center" style={{ marginTop: '5px' }}>
										<div className={cn(styles['finance-total'], styles.purple, 'mr-2')} style={{ width: "266px", height: '12px' }}></div>
										<div>$547.6 MM</div>
									</div>
								</div>
								<div>
									<p style={{ lineHeight: "13.4px", fontSize: '12px', marginTop: "20px" }}>Đã ký hợp đồng (82%)</p>
									<div className="flex items-center" style={{ marginTop: '5px' }}>
										<div className={cn(styles['finance-total'], styles.info, 'mr-2')} style={{ width: "213px", height: '12px' }}></div>
										<div>$373.5 MM</div>
									</div>
								</div>
								<div>
									<p style={{ lineHeight: "13.4px", fontSize: '12px', marginTop: "20px" }}>Đã giải ngân (57%)</p>
									<div className="flex items-center" style={{ marginTop: '5px' }}>
										<div className={cn(styles['finance-total'], styles.warn, 'mr-2')} style={{ width: "153px", height: '12px' }}></div>
										<div>$65.2 MM</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={cn("px-2")}>
						<div className={cn(styles['finance-cell'], "flex pl-11 pr-10 pt-7 pb-7 h-full")}>
							<div className={cn(styles['finance-pie'], 'mr-14')}>
								<div>
									<div>
										<h3>
											205
										</h3>
										<p>
											project
										</p>
									</div>
								</div>
							</div>
							<div>
								<ul>
									<li className="flex items-center"><div className={cn(styles.info, 'w-3 h-3 rounded-lg')}></div>Chưa bắt đầu (100)</li>
									<li className="flex items-center"><div className={cn(styles.warn, 'w-3 h-3 rounded-lg')}></div>Lập kế hoạch (80)</li>
									<li className="flex items-center"><div className={cn(styles.purple, 'w-3 h-3 rounded-lg')}></div>Thiết kế (15)</li>
									<li className="flex items-center"><div className={cn(styles.plum, 'w-3 h-3 rounded-lg')}></div>Đấu thầu (5)</li>
									<li className="flex items-center"><div className={cn(styles.success, 'w-3 h-3 rounded-lg')}></div>Xây dựng (3)</li>
									<li className="flex items-center"><div className={cn(styles.gray, 'w-3 h-3 rounded-lg')}></div>Khác (2)</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap -mx-2 mt-4">
					<div className="px-2 w-full">
						<div className={cn(styles['finance-cell'], 'h-full')}>
							<table className={cn(styles['finance-table'])}>
								<thead>
									<tr>
										<th>DỰ ÁN</th>
										<th>NGÂN SÁCH</th>
										<th>KÝ HỢP ĐỒNG</th>
										<th>ĐÃ GIẢI NGÂN</th>
										<th>GIAI ĐOẠN</th>
										<th>CỘT MỐC</th>
										<th>THẢO LUẬN</th>
									</tr>
								</thead>
								<tbody>
									{data.map(d => (
										<tr key={d.id}>
											<td></td>
											<td></td>
											<td className="px-5" style={{ minWidth: '168px' }}>
												<div>
													<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
														<div className="w-min transform -translate-x-1/2">{d.progress}%</div>
													</div>
													<div className={cn(styles.progress, "w-full")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
												</div>
											</td>
											<td className="px-5" style={{ minWidth: '168px' }}>
												<div>
													<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
														<div className="w-min transform -translate-x-1/2">{d.progress}%</div>
													</div>
													<div className={cn(styles.progress, "w-full")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
												</div>
											</td>
											<td>Đấu thầu</td>
											<td className="px-4" style={{ width: '100px' }}>
												<div>
													<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
														<div className="w-min transform -translate-x-1/2">3/5</div>
													</div>
													<div className={cn(styles.progress, "w-full")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
												</div>
											</td>
											<td style={{ color: "rgba(0, 96, 225, 1)" }}>
												<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-2">
													<path d="M6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11H4C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5L8 12C8.15687 11.7091 8.5 11 9 11H13V10.9989V10.4989V8.99895V5.99895V3.00017V0.999848H12H10C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217Z" fill="currentColor" />
													<path d="M7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5C7.5 12.5 7.5 12.5 8 12C8.15687 11.7091 8.5 11 9 11C10.5 11 11.4945 11 13 11C13 11 13 11.1924 13 10.9989C13 10.7134 13 10.7845 13 10.4989C13 9.94469 13 9.5 13 8.99895C13 8 13 6.92793 13 5.99895C13 4.98419 13 3.99895 13 3.00017C13 2.7489 13 0.500524 13 0.999848C12.4305 0.999848 12.5 0.999848 12 0.999848C11.5 0.999848 10.4985 0.999848 10 0.999848C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11C3 11 3.5 11 4 11C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5ZM7 13.5C6.87287 13.6744 7.14443 13.3415 7 13.5Z" stroke="currentColor" strokeLinecap="round" />
												</svg>
												ADD COMMENT
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ExamplePage;
