import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { useProject } from 'services/hooks/items/useProject';
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
// import {ProjectBudgetPageType1} from "./components/ProjectBudgetPageType1";
// import {ProjectBudgetPageType2} from "./components/ProjectBudgetPageType2";
// import {ProjectBudgetPageType3} from "./components/ProjectBudgetPageType3";
// import {ProjectBudgetPageType4} from "./components/ProjectBudgetPageType4";
// import {ProjectBudgetPageType5} from "./components/ProjectBudgetPageType5";
import {ProjectBudgetPageType6} from "./components/ProjectBudgetPageType6";
import {ProjectBudgetPageType6Detail} from "./components/ProjectBudgetPageType6Detail";

const CmcBudgetPage: FC = () => {
	const { id: projectID, type, month } = useParams<{ id: string , type: string, month: string}>();

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

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
 export default CmcBudgetPage;