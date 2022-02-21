import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Hook
import { useListDepartment } from 'services/hooks/ppt/useListDepartment';
import { DepartmentEnumType } from 'typings/ppt'

// Utils
import { dateLoadedPercentage, switchOnTimeBudget } from 'utils/ppt';

// Assets
import SearchIcon from "assets/images/icons8-search-120.png";
import classNames from 'classnames';

// console.log(DepartmentEnumType);
const PortfolioTableContainer: FC = () => {
	const { data, loading } = useListDepartment({
		type: DepartmentEnumType.PROJECT,
		select: ["_id", "name", "projectCapital", "sign", "company", "startTime", "expiredTime", "stage", "createAt", 'onbudget', 'ontime'],
		populates: {
			// path: ['sign'],
			// select:['']
		}
	});

	return <div className="flex flex-wrap -mx-2 mt-4 text-cbs-subtext">
		<div className="px-2 w-full">
			<div className='h-full bg-white shadow-md border-separate'>
				<table className='text-x-small w-full'>
					<thead>
						<tr className="lowercase border-b-0.5 border-cbs-border">
							<th className="first-letter:capitalize font-normal">DỰ ÁN</th>
							<th className="first-letter:capitalize font-normal">NGÂN SÁCH</th>
							<th className="first-letter:capitalize font-normal">KÝ HỢP ĐỒNG</th>
							<th className="first-letter:capitalize font-normal">ĐÃ GIẢI NGÂN</th>
							<th className="first-letter:capitalize font-normal">GIAI ĐOẠN</th>
							<th className="first-letter:capitalize font-normal">CỘT MỐC</th>
							<th className="first-letter:capitalize font-normal py-0.5 w-min text-right">
								<div className="rounded-full inline-flex bg-cbs-left-menu px-4 py-1.5 items-center h-10 w-min right-0">
									<img src={SearchIcon} alt={"icon search"} className="w-5 h-5" />
									<input placeholder="Tìm kiếm" className="bg-transparent focus:outline-none w-60" />
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{loading ?
							<tr>
								<td className='text-center' colSpan={7}>Loading...</td>
							</tr>
							: data && data.pages.map((group) => (
								<Fragment key={group.data.nextCursor}>
									{
										group.data.listRecords.map((record) => {
											const dif = Math.floor(dateLoadedPercentage(new Date(record.startTime), new Date(record.expiredTime), new Date()) * 100);
											return (
												<tr key={record._id}>
													<td className="border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3 pl-3.5 pr-4 w-[275px]">
														<div className="text-black text-medium">
															<Link to="/">
																{record.sign}
																{/* CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây */}
															</Link>
														</div>
														<div className="text-x-small mt-3">
															<div className={classNames(switchOnTimeBudget(record.ontime || 1, record.onbudget || 1).className, 'inline-block w-2 h-2 mr-1.5 rounded-lg')} />
															{switchOnTimeBudget(record.ontime || 1, record.onbudget || 1).message}
														</div>
														<div className="flex justify-between mt-2.5">
															<div>
																<p className="text-x-small">
																	Bắt đầu
																</p>
																<p>
																	{moment(record.startTime).format('d/M/yyyy')}
																</p>
															</div>
															<div>
																<p className="text-x-small">
																	Kết thúc
																</p>
																<p>
																	{moment(record.expiredTime).format('d/M/yyyy')}
																</p>
															</div>
														</div>
														<div className="flex relative mt-1">
															<div className="flex absolute inset-0 items-center">
																<div className="bg-cbs-border h-0.5 w-full" />
															</div>
															<div className="bg-black relative transform -translate-x-1/2 w-1 h-4" style={{ left: `${dif}%` }}></div>
														</div>
													</td>
													<td className="px-3 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<p>$150.000.000</p>
														<div className="bg-cbs-schedule-after-7days h-1.5 mt-1" />
														<p className="mt-2.5">$165.000.000</p>
														<div className="h-1.5 mt-1" style={{ backgroundColor: '#666666' }} />
														<div className="flex justify-between mt-4 items-center">
															<div>$15.000</div>
															<i className='inline-block w-2 h-2 rounded-lg bg-cbs-down-text' />
														</div>
													</td>
													<td className="px-5 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${10}%` }}>
																<div className="w-min transform -translate-x-1/2">{10}%</div>
															</div>
															<div className='w-full mt-0.5 h-1.5 border-0.5 border-cbs-border'>
																<div className='bg-cbs-subtext h-full' style={{ width: `${10}%` }} />
															</div>
															{/* <div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
													</td>
													<td className="px-5 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${10}%` }}>
																<div className="w-min transform -translate-x-1/2">{10}%</div>
															</div>
															{/* <div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
													</td>
													<td className="border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3 pl-4 w-min">
														<p className="text-cbs-primary mt-2.5 uppercase">
															Đấu thầu
														</p>
													</td>
													<td className="px-4 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${10}%` }}>
																<div className="w-min transform -translate-x-1/2 font-bold">3/5</div>
															</div>
															{/* <div className={cn(styles.progress, "w-full h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
													</td>
													<td className="border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3 px-4" style={{ color: "rgba(0, 96, 225, 1)", letterSpacing: "4%" }}>
														<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-2">
															<path d="M6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11H4C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5L8 12C8.15687 11.7091 8.5 11 9 11H13V10.9989V10.4989V8.99895V5.99895V3.00017V0.999848H12H10C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217Z" fill="currentColor" />
															<path d="M7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5C7.5 12.5 7.5 12.5 8 12C8.15687 11.7091 8.5 11 9 11C10.5 11 11.4945 11 13 11C13 11 13 11.1924 13 10.9989C13 10.7134 13 10.7845 13 10.4989C13 9.94469 13 9.5 13 8.99895C13 8 13 6.92793 13 5.99895C13 4.98419 13 3.99895 13 3.00017C13 2.7489 13 0.500524 13 0.999848C12.4305 0.999848 12.5 0.999848 12 0.999848C11.5 0.999848 10.4985 0.999848 10 0.999848C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11C3 11 3.5 11 4 11C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5ZM7 13.5C6.87287 13.6744 7.14443 13.3415 7 13.5Z" stroke="currentColor" strokeLinecap="round" />
														</svg>
														ADD COMMENT
													</td>
												</tr>
											)
										})}
								</Fragment>
							))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
};

export default PortfolioTableContainer;
