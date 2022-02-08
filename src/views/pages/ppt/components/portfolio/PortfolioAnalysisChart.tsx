import { FC, forwardRef, HTMLAttributes, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

import getPlugins, { _data, optionsOne as options } from "../../chart/ProjectDoughnutChart";

import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const plugins = getPlugins('205', 'PROJECTS')
interface Props {
	data?: DataBlock3
}
const PortfolioAnalysisChart = forwardRef<ChartJSOrUndefined<"doughnut", number[], unknown>, React.PropsWithChildren<HTMLAttributes<HTMLDivElement> & Props>>((props, ref) => {
	const data = useMemo(() => {
		const d = { waiting: 0, plan: 0, design: 0, bidding: 0, building: 0, other: 0 }
		props.data?.forEach(_d => {
			switch (_d._id.stage) {
				case 0:
					d.waiting = _d.amount
					break;
				case 1:
					d.plan = _d.amount
					break;
				case 2:
					d.design = _d.amount
					break;
				case 3:
					d.bidding = _d.amount
					break;
				case 4:
					d.building = _d.amount
					break;
				case 5:
					d.other = _d.amount
					break;
				default:
					break;
			}
		})
		return d;
	}, [props.data])
	return <div {...props}>
		<div className="flex bg-white box-border border-0.5 border-cbs-border pl-11 pr-10 pt-7 pb-7 h-full">
			<div className="w-[154px] mr-[54px] flex height-full">
				<Doughnut ref={ref} data={_data} options={options} plugins={plugins} />
			</div>
			<div>
				<ul>
					<li className="whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center"><div className='bg-cbs-primary w-3 h-3 rounded-lg mr-2'></div>Chưa bắt đầu ({data.waiting})</Link>
					</li>
					<li className="flex items-center whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center"><div className='bg-cbs-schedule-nextweek w-3 h-3 rounded-lg mr-2'></div>Lập kế hoạch ({data.plan})</Link>
					</li>
					<li className="flex items-center whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center"><div className='bg-cbs-purple w-3 h-3 rounded-lg mr-2'></div>Thiết kế ({data.design})</Link>
					</li>
					<li className="flex items-center whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center"><div className='bg-pink-600 w-3 h-3 rounded-lg mr-2'></div>Đấu thầu ({data.bidding})</Link>
					</li>
					<li className="flex items-center whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center"><div className='bg-cbs-green w-3 h-3 rounded-lg mr-2'></div>Xây dựng ({data.building})</Link>
					</li>
					<li className="flex items-center whitespace-nowrap">
						<Link to="/" className="flex items-center"><div className='bg-cbs-gray w-3 h-3 rounded-lg mr-2'></div>Khác ({data.other})</Link>
					</li>
				</ul>
			</div>
		</div>
	</div>
});
PortfolioAnalysisChart.displayName = "PortfolioAnalysisChart";

export default PortfolioAnalysisChart;
