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
				// chartRef.current.data.datasets[0].data = [23, 24];
				chartRef.current.data.datasets[0].data = data.data.dataBlock3.map(d => d.amount);
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
