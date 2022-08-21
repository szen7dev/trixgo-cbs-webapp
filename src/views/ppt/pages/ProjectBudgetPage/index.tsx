import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import {DropdownSearchableV2} from "shareComponents/common";
import { useProject } from 'services/hooks/items/useProject';
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import nextIcon from "assets/images/icons-arrow-next.svg";
import { Link } from "react-router-dom";
import {ProjectBudgetPageType1} from "./components/ProjectBudgetPageType1";
import {ProjectBudgetPageType2} from "./components/ProjectBudgetPageType2";

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
			select: "budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractProduce contractVatProduce contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance contractAmountPaid contractRemainingPayment",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = "Dự án-Ngân sách"
	}, []);

	if(!projectInfo) {
		return <></>;
	}

	return (
	<main className="flex flex-col h-full overflow-hidden">
		<div className={"sticky top-0 z-10 " + (collapse?"hidden":"block")}>
			<div className={"flex items-center px-4 py-2"}>
				<div className={"flex items-center flex-1"}>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Loại gói thầu"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Hình thức"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Loại hợp đồng"}
						prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Trạng thái"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
				</div>
				<button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
					Tạo mới
				</button>
			</div>
			<div className={"flex items-center pb-2"}>
				<div className={"border-0.5 border-primary-border flex items-center"}>
					<Link to={`/pm/project/${projectID}/budget/type/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "1" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
						Ngân sách
					</Link>
					<Link to={`/pm/project/${projectID}/budget/type/2`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
						Bảo lãnh tạm ứng
					</Link>
					<Link to={`/pm/project/${projectID}/budget/type/3`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
						Bảo lãnh hợp đồng
					</Link>
					<Link to={`/pm/project/${projectID}/budget/type/4`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
						Kế hoạch chi
					</Link>
					<Link to={`/pm/project/${projectID}/budget/type/5`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "5" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
						Kế hoạch thu
					</Link>
				</div>
				<button className={"flex items-center justify-center mx-3 ml-6"}>
					<img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
				</button>
				<button className={"flex items-center justify-center mx-3 ml-6"}>
					<img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
				</button>
				<div className={"flex-1 flex items-center justify-end"}>
					<span className={"text-primary-gray"}>1-50 trong số 2.358</span>
					<button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
						<img src={nextIcon} alt={"----"} className={"rotate-180"}/>
					</button>
					<button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
						<img src={nextIcon} alt={"----"}/>
					</button>
				</div>
			</div>
		</div>
		<div className="flex-1 overflow-y-auto">
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
				<ProjectBudgetPageType2 />
			}
		</div>
	</main>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
 export default ProjectBudgetPage;
