import React from 'react'
import cn from "classnames";
import { formatNumberMoney, formatNaNToZero } from 'utils/converter';

import { Project } from 'typings/items/project';

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportTotal: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>
	const totalBudgetFormat = formatNumberMoney(projectInfo.budget + projectInfo.vatBudget);

	return (
		<div {...props}>
			<div>Tổng mức</div>
			<div className="flex justify-between items-center mt-2">
				<div className="text-large text-black font-bold">
					{totalBudgetFormat}
				</div>
			</div>
		</div>
	)
}

export default ReportTotal