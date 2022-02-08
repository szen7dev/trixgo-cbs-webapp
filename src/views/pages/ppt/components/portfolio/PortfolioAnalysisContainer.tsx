import React, { FC, useRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useQueryDepartmentsAnalysis } from 'services/hooks/ppt/useDepartmentAnalysis';
import PortfolioAnalysisChart from './PortfolioAnalysisChart';
import PortfolioAnalysisTotal from './PortfolioAnalysisTotal';
import PortfolioBudgetAndContract from './PortfolioBudgetAndContract';

const PortfolioAnalysisContainer: FC = () => {
	const chartRef = useRef<ChartJSOrUndefined<"doughnut", number[], unknown>>(null);
	const { data, loading, refetch } = useQueryDepartmentsAnalysis({
		onSuccess(data) {
			if (chartRef.current) {
				const _data = Array.from({ length: chartRef.current.data.datasets[0].data.length }, () => 0).fill(0);
				data.data.dataBlock3.forEach(_d => {
					_data[_d._id.stage] = _d.amount;
				})
				chartRef.current.data.datasets[0].data = _data;
				chartRef.current.update();
			}
		}
	});
	return <div className="flex flex-wrap -mx-2 text-cbs-subtext">
		<PortfolioAnalysisTotal className="px-2 mt-4 flex-auto" data={data?.dataBlock1} />
		<PortfolioBudgetAndContract className="px-2 mt-4 flex-1" style={{ minWidth: "305px" }} />
		<PortfolioAnalysisChart className="px-2 mt-4 flex-1" data={data?.dataBlock3} ref={chartRef} />
	</div>;
};

export default PortfolioAnalysisContainer;
