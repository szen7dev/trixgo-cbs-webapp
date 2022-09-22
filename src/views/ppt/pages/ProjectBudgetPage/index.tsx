import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { useProject } from 'services/hooks/items/useProject';
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import {ProjectBudgetPageType1} from "./components/ProjectBudgetPageType1";
import {ProjectBudgetPageType2} from "./components/ProjectBudgetPageType2";
import {ProjectBudgetPageType3} from "./components/ProjectBudgetPageType3";
import {ProjectBudgetPageType4} from "./components/ProjectBudgetPageType4";

const ProjectBudgetPage: FC = () => {
	const { id: projectID, type } = useParams<{ id: string , type: string}>();

	const [collapse, setCollapse] = useState(false);
	 //_____Start history traffict
	 const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmProject.budget.id,
		type: type
	  };
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);
	//_____End history traffict

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "sign budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractProduce contractVatProduce contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance contractAmountPaid contractRemainingPayment",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Ngân sách hợp đồng`
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
				<ProjectBudgetPageType2/>
			}
			{
				type === "3" &&
				<ProjectBudgetPageType3/>
			}
			{
				type === "4" &&
				<ProjectBudgetPageType4
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