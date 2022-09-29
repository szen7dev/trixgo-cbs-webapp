import { FC, ReactNode, useEffect, useState } from "react";
import cn from "classnames";
import { useParams, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

import { HomeRightSideBar } from "shareComponents/layouts";
import { LeftNavigate, MainHeader, MainHeaderV2 } from "shareComponents/common";
import menuIcon from "assets/images/icon-mobile-menu-black.png";

import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";
import ProjectLeftSideBar from "./components/ProjectLeftSideBar";
import { useAuth } from 'services/hooks/auth/useAuth';
import { useQueryDetailDepartment } from 'services/hooks/items/useDepartment';
import { HomeHeaderContent } from "shareComponents/layouts/HomeLayout/components";

type Props = {
	children: ReactNode;
};

const LayoutProjectSecondaryV2: FC<Props> = ({ children }) => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const { user } = useAuth();
	const { onFetchDetailDepartmentAsync } = useQueryDetailDepartment();
	const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
	const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
	const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

	useEffect(() => {
		(async () => {
			const infoProject = await onFetchDetailDepartmentAsync(id);

			if (user && (!infoProject || !infoProject.members?.includes(user._id?.toString()))) {
				toast.error('Bạn không có quyền truy cập vào dự án này');
				history.push('/');
			}
		})();
	}, [id])

	const handleHeaderEvent = () => {
		setIsHeaderCollapse(!isHeaderCollapse);
	};
	const handleMenuEvent = () => {
		setIsLeftMenuCollapse(!isLeftMenuCollapse);
	};
	const handleRightSideBarEvent = () => {
		setIsRightSideBarCollapse(!isRightSideBarCollapse);
	};

	return (
		<section
			className={cn("home-layout relative bg-primary-light", {
				"collapse-left": isLeftMenuCollapse,
				"active-right": isRightSideBarCollapse,
				"collapse-header": isHeaderCollapse,
			})}
		>
			<div className={"flex"}>
				<LeftNavigate handleMenuEvent={handleMenuEvent} />
				<section className={"main-content-wrapper flex-1"}>
					{/*  Main header */}
					<MainHeaderV2 headerTitle={"Project"}>
						<HomeHeaderContent />
					</MainHeaderV2>

					{/* Left navigation */}
					<ProjectLeftSideBar />

					{/* Content area */}
					<main className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative">
						{children}
					</main>

				</section>
			</div>
		</section>
	);
}

export default LayoutProjectSecondaryV2