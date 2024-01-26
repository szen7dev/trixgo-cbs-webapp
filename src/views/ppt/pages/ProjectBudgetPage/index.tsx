import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useProject } from 'services/hooks/items/useProject';
import {ProjectBudgetPageType1} from "./components/ProjectBudgetPageType1";
import {ProjectBudgetPageType2} from "./components/ProjectBudgetPageType2";
import {ProjectBudgetPageType3} from "./components/ProjectBudgetPageType3";
import {ProjectBudgetPageType4} from "./components/ProjectBudgetPageType4";
import {ProjectBudgetPageType5} from "./components/ProjectBudgetPageType5";
import {ProjectBudgetPageType6} from "./components/ProjectBudgetPageType6";
import {ProjectBudgetPageType6Detail} from "./components/ProjectBudgetPageType6Detail";

const ProjectBudgetPage: FC = () => {
	const { id: projectID, type, month } = useParams<{ id: string , type: string, month: string}>();

	const [collapse, setCollapse] = useState(false);

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "sign budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractProduce contractVatProduce contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance contractAmountPaid contractRemainingPayment",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Quản lý hợp đồng`
	}, []);

	if(!projectInfo) {
		return <></>;
	}

	return (
		<main className="flex flex-col h-full overflow-hidden">
			{
				type === "1" &&
				<ProjectBudgetPageType1
					collapse={collapse}
					toggleCollapse={() => setCollapse(!collapse)}
					projectInfo={projectInfo}
				/>
			}
			{
				type === "2" &&
				<ProjectBudgetPageType2 projectInfo={projectInfo}/>
			}
			{
				type === "3" &&
				<ProjectBudgetPageType3 projectInfo={projectInfo}/>
			}
			{
				type === "4" &&
				<ProjectBudgetPageType4
					projectInfo={projectInfo}
				/>
			}
			{
				type === "5" &&
				<ProjectBudgetPageType5
					projectInfo={projectInfo}
				/>
			}
			{
				type === "6" &&
				<ProjectBudgetPageType6
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

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
 export default ProjectBudgetPage;