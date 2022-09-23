import { FC, useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "shareComponents/common";
import { usePcmCommentGetListByProperty, usePcmPlanTaskGetListByProperty } from "services/hooks/pcm/usePcmDashboardV2";
import MenuTab from "./components/MenuTab";
import GroupComponent from "./components/GroupComponent";

const PcmTagPage: FC = () => {
	const { tab } = useParams<{ tab: string }>();
	const { isLoading, listDataProject, listDataProjectCompanyAuthor } = usePcmCommentGetListByProperty({
		option: 1,
		enabled: !tab || tab === "1" || tab === "2",
		fromDate: tab === "2" ? "00:00" : "",
		toDate: tab === "2" ? "23:59" : "",
	});

	const { isLoading: isLoading2, listDataProject: listDataProject2, listDataProjectCompany } = usePcmPlanTaskGetListByProperty({
		option: tab === "3" ? 1 : 2,
		enabled: tab === "3" || tab === "4",
	});

	return (
		<main className="h-full overflow-auto">
			{(isLoading || isLoading2) && <Loader className="border-primary" />}
			{/* <MenuTab tab={tab} />
			<GroupComponent
				tab={tab}
				listDataProject={listDataProject}
				listDataProject2={listDataProject2}
				listDataProjectCompanyAuthor={listDataProjectCompanyAuthor}
				listDataProjectCompany={listDataProjectCompany}
			/> */}
		</main>
	);
};

export default PcmTagPage