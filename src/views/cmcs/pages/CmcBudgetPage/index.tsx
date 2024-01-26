import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useProject } from 'services/hooks/items/useProject';
import {ProjectBudgetPageType6} from "./components/ProjectBudgetPageType6";
import {ProjectBudgetPageType6Detail} from "./components/ProjectBudgetPageType6Detail";

const CmcBudgetPage: FC = () => {
	const { id: projectID, type, month } = useParams<{ id: string , type: string, month: string}>();

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "sign budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractProduce contractVatProduce contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance contractAmountPaid contractRemainingPayment",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `Quản lý hợp đồng`
	}, []);

	if(!projectInfo) {
		return <></>;
	}

	return (
		<main className="flex flex-col h-full overflow-hidden">
			{
				!month && <ProjectBudgetPageType6
					projectInfo={projectInfo}
				/>
			}
			{
				month &&
				<ProjectBudgetPageType6Detail
					projectInfo={projectInfo}
				/>
			}
		</main>
	);
};

export default CmcBudgetPage