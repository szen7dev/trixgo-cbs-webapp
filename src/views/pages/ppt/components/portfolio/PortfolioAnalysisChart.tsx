import { forwardRef, HTMLAttributes, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import getPlugins, { _data, optionsOne as options } from "../../chart/ProjectDoughnutChart";

// ===== Constants =====
import { DEPARTMENT_STAGE } from "helpers/constants/department";

// ===== Types =====
import { DataBlock3 } from "typings/ppt/department";

ChartJS.register(ArcElement, Tooltip, Legend);

const plugins = getPlugins('205', 'PROJECTS')
interface Props {
	data?: DataBlock3
}
const PortfolioAnalysisChart = forwardRef<ChartJSOrUndefined<"doughnut", number[], unknown>, React.PropsWithChildren<HTMLAttributes<HTMLDivElement> & Props>>((props, ref) => {
	const data = useMemo(() => {
		// Merge two arrays of object to array of object based on key
		return DEPARTMENT_STAGE.map(item => ({
			...item,
			...(props.data?.find(itm => itm._id.stage === item.value))
		}))
	}, [props.data])

	return <div {...props}>
		<div className="flex bg-white box-border border-0.5 border-cbs-border pl-11 pr-10 pt-7 pb-7 h-full">
			<div className="w-[154px] mr-[54px] flex height-full">
				<Doughnut ref={ref} data={_data} options={options} plugins={plugins} />
			</div>
			<div>
				<ul>
					{data.map(item => <li key={item.value} className="flex items-center whitespace-nowrap mb-3">
						<Link to="/" className="flex items-center">
							<div className={classNames(item.className, 'w-3 h-3 rounded-lg mr-2')}></div>
							{item.text} ({item.amount})
						</Link>
					</li>)}
				</ul>
			</div>
		</div>
	</div>
});
PortfolioAnalysisChart.displayName = "PortfolioAnalysisChart";

export default PortfolioAnalysisChart;
