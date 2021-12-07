import React from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	TimeScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import getPlugins from './ProjectDoughnutChart';

interface Props {
	_data: {
		datasets: Array<any>
	}
	title?: string
	subtitle?: string
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	TimeScale,
);

const options = {
	cutout: 36,
	rotation: 90,
	responsive: true,
	maintainAspectRatio: true,
}

const ChartDoughnutSmall: React.FC<Props> = ({ _data, title = '28', subtitle = "GÓI THẦU" }) => {
	const plugins = React.useMemo(() => getPlugins(title, subtitle, { titleSize: 24, subtitleSize: 10, bold: false }), []);

	return (
		<Doughnut
			data={_data}
			options={{ ...options, plugins: { datalabels: { display: false }, tooltip: { enabled: false } } }}
			plugins={plugins}
		/>
	)
}

export default ChartDoughnutSmall
