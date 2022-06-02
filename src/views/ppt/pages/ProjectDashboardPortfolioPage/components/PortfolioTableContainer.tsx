import { FC, Fragment } from 'react';
import { Link, generatePath } from 'react-router-dom';
import moment from 'moment';

// Hook
import { useListDepartment } from 'services/hooks/ppt/useListDepartment';
import { DepartmentEnumType } from 'typings/ppt'

// Utils
import { dateLoadedPercentage, switchOnTimeBudget, convertToInternationalCurrencySystem } from 'utils/ppt';

import { PROJECT_STAGE } from 'apis/localdb'
// Assets
import SearchIcon from "assets/images/icons8-search-120.png";
import classNames from 'classnames';

// console.log(DepartmentEnumType);
const PortfolioTableContainer: FC = () => {
	const { data, loading } = useListDepartment({
		type: DepartmentEnumType.PROJECT,
		select: ["_id", "name", "projectCapital", "sign", "company", "startTime", "expiredTime", "stage", "createAt", 'onbudget', 
		'ontime', 'budget', 'forecastBudget', 'contractValue', 'contractPlusValue', 'contractVatValue', 'contractAmountPaid',
		'milestones', 'completedMilestones'],
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
						<tr className="border-b-0.5 border-cbs-border font-bold">
							<th className="first-letter:capitalize px-2 py-2 w-min text-left" style={{ width: '30%' }}>Dự án</th>
							<th className="first-letter:capitalize px-2 py-2 w-min text-left">Ngân sách</th>
							<th className="first-letter:capitalize px-2 py-2 w-min text-left">Ký hợp đồng</th>
							<th className="first-letter:capitalize px-2 py-2 w-min text-left">Đã giải ngân</th>
							<th className="first-letter:capitalize px-2 py-2 w-min text-left">Giai đoạn</th>
							<th className="first-letter:capitalize px-2 py-2 w-min text-left">Cột mốc</th>
						</tr>
					</thead>
					<tbody>
						{loading ?
							<tr>
								<td className='text-center' colSpan={7}>Loading...</td>
							</tr>
							: data && data.pages?.map((group) => (
								<Fragment key={group.data?.nextCursor}>
									{
										group.data?.listRecords?.map((record) => {
											const { budget, forecastBudget, contractValue, contractPlusValue, contractVatValue, contractAmountPaid, stage, milestones, completedMilestones } = record;
											// 'Ngân sách': getPercentForecastBudget
											const getPercentForecastBudget = (_totalBudget: number, _totalForecastBudget: number): number => {
												if (_totalBudget == 0)
													return 0;
												else {
													return Math.ceil((_totalForecastBudget / _totalBudget) * 100);
												}
											}
											const percentForecastBudget = getPercentForecastBudget(budget, forecastBudget);

											// 'Ký Hợp Đồng': percentSignedContract
											const getPercentSignedContract = () => {
												if (!budget)
													return 0;
												return Math.ceil(((contractValue + contractPlusValue + contractVatValue) / budget) * 100);
											}
											const percentSignedContract = getPercentSignedContract();

											// 'Đã giải ngân': getPercentcontractAmountPaid
											const getPercentcontractAmountPaid = (_totalBudget: number, _totalForecastBudget: number): number => {
												if (_totalBudget == 0)
													return 0;
												else {
													return Math.ceil((_totalForecastBudget / _totalBudget) * 100);
												}
											}
											const percentcontractAmountPaid = getPercentcontractAmountPaid(budget, contractAmountPaid);

											const dif = Math.floor(dateLoadedPercentage(new Date(record.startTime), new Date(record.expiredTime), new Date()) * 100);
											const limitMinMaxDif = (_dif: number) => {
												if (_dif < 0)
													return 0;
												else if (_dif > 100)
													return 100;
												return _dif;
											}
											return (
												<tr key={record._id}>
													<td className="border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3 pl-3.5 pr-4">
														<div className="text-black text-medium">
															<Link to={generatePath("/pcm/project/:id/home", { id: record._id })}>
																{record.sign}.{record.name}
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
																	{moment(record.startTime).format("DD/MM/YYYY")}
																</p>
															</div>
															<div>
																<p className="text-x-small">
																	Kết thúc
																</p>
																<p>
																	{moment(record.expiredTime).format("DD/MM/YYYY")}
																</p>
															</div>
														</div>
														<div className="flex relative mt-1">
															<div className="flex absolute inset-0 items-center">
																<div className="bg-cbs-border h-0.5 w-full" />
															</div>
															<div className="bg-black relative transform -translate-x-1/2 w-1 h-4" style={{ left: `${
																limitMinMaxDif(dif)
															}%` }}></div>
														</div>
													</td>
													<td className="px-3 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<p>{"đ " + convertToInternationalCurrencySystem(budget)}</p>
														<div className="bg-cbs-schedule-after-7days h-1.5 mt-1" />

														<p className="mt-2.5">{"đ " + convertToInternationalCurrencySystem(forecastBudget)}</p>
														<div className="h-1.5 mt-1" style={{ backgroundColor: '#666666', width: `${percentForecastBudget > 100 ? 105 : percentForecastBudget}%` }} />
														
														<div className="flex justify-between mt-4 items-center">
															<div>{"đ " + convertToInternationalCurrencySystem(Math.abs(forecastBudget - budget))}</div>
															<i className='inline-block w-2 h-2 rounded-lg bg-cbs-down-text' 
																style={{ backgroundColor: forecastBudget - budget >= 0 ? 'red' : 'green' }}
															/>
														</div>
													</td>
													<td className="px-5 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${percentSignedContract > 100 ? 105 : percentSignedContract }%` }}>
																<div className="w-min transform -translate-x-1/2">{percentSignedContract }%</div>
															</div>
															<div className='w-full mt-0.5 h-1.5 border-0.5 border-cbs-border'>
																<div className='bg-cbs-subtext h-full' style={{ width: `${percentSignedContract > 100 ? 105 : percentSignedContract}%` }} />
															</div>
															{/* <div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
													</td>
													<td className="px-5 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${percentcontractAmountPaid > 100 ? 105 : percentcontractAmountPaid }%` }}>
																<div className="w-min transform -translate-x-1/2">{percentcontractAmountPaid }%</div>
															</div>
															<div className='w-full mt-0.5 h-1.5 border-0.5 border-cbs-border'>
																<div className='bg-cbs-subtext h-full' style={{ width: `${percentcontractAmountPaid > 100 ? 105 : percentcontractAmountPaid}%` }} />
															</div>
															{/* <div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
														
													</td>
													<td className="border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3 pl-4 w-min">
														<p className="text-cbs-primary mt-2.5">
															{PROJECT_STAGE[stage ? stage - 1 : 0].text}
														</p>
													</td>
													<td className="px-4 border-r-0.5 border-t-0.5 border-cbs-border pt-4 pb-3">
														<div>
															<div className="w-0 relative" style={{ left: `${10}%` }}>
																<div className="w-min transform -translate-x-1/2 font-bold">
																	{completedMilestones || 0}/{milestones || 0}
																</div>
															</div>
															{/* <div className={cn(styles.progress, "w-full h-1.5")} style={{ '--width': `${10}%` } as React.CSSProperties} /> */}
														</div>
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
