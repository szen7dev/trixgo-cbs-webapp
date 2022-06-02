import React, { FC, memo } from "react";
// import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink, useRouteMatch, generatePath, useParams } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import projectImage from "assets/images/project.jpg";

import drawingImage from "assets/menu/project/drawing.png";
import biddingImage from "assets/menu/project/bidding.png";
import budgetImage from "assets/menu/project/budget.png";
import dashboardImage from "assets/menu/project/dashboard.png";
import directoryImage from "assets/menu/project/directory.png";
import documentImage from "assets/menu/project/document.png";
import folderImage from "assets/menu/project/folder.png";
import homeImage from "assets/menu/project/home.png";
import paymentImage from "assets/menu/project/payment.png";
import photoImage from "assets/menu/project/photo.png";
import resourceImage from "assets/menu/project/resource.png";
import scheduleImage from "assets/menu/project/schedule.png";
import subjectImage from "assets/menu/project/subject.png";

const ProjectLeftSideBar: FC = () => {
	const { user } = useAuth();
	const match = useRouteMatch<{ id: string }>();
	// Gọi lại hook department
	const { onFetchDetailDepartmentAsync, detailDepartment } = useQueryDetailDepartment();
	const { id: projectID } = useParams<{ id: string }>();

	const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.PCM.id, parentID: APP_ID.PCM.menuPcmProject.id });
	const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.PCM.id, type: "2", companyID: detailDepartment?.company?._id }, detailDepartment?.company?._id ? true : false); 
	
	React.useEffect(() => {
		if (projectID) {
			onFetchDetailDepartmentAsync(projectID);
		}
	}, [onFetchDetailDepartmentAsync, projectID]);

	const imgUrl = detailDepartment?.image
	? (detailDepartment?.image?.startsWith('files/db')
		? `${process.env.REACT_APP_URL_S3}/${detailDepartment?.image}`
		: `${process.env.REACT_APP_URL_S3_PROJECT}/${detailDepartment?.image}`)
	: projectImage;

	return (
		<div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
			<div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
				{/* title */}
				<div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
					<img src={imgUrl} alt="Thumbnail" className="w-10 h-10 mr-3" />
					<span className="truncate" title={detailDepartment?.sign + "." + detailDepartment?.name}>{detailDepartment?.sign}.{detailDepartment?.name}</span>
				</div>

				{/* menu block */}
				<div className="t-link-menu-container">
					{!detailDepartment?.admins?.includes(user?._id || "") ? <></> :
						<NavLink
							to={{ pathname: generatePath('/pcm/project/:id/admin/members', match.params) }}
							className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-medium"
						>
							<img className="w-6 h-6 object-contain mr-3" src={'/images/pcm/admin.png'} alt="Menu item" />
							<span className="truncate">Quản trị viên</span>
						</NavLink>
					}
					<NavLink
						to={{ pathname: generatePath('/pcm/project/:id/home', match.params) }}
						className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-medium"
					>
						<img className="w-6 h-6 object-contain mr-3" src={homeImage} alt="Menu item" />
						<span className="truncate">Trang chủ</span>
					</NavLink>
					{/* <NavLink
						to={{ pathname: generatePath('/pcm/project/:id/subject', match.params) }}
						className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-medium"
					>
						<img className="w-6 h-6 object-contain mr-3" src={'/images/pcm/folder.png'} alt="Menu item" />
						<span className="truncate">Quản lý công việc</span>
					</NavLink> */}
					{listAppMenu && listAppMenu.length ?
						<>
							{listAppMenu.map((item: any, index: number) => {
								const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
								if (roleApp && roleApp.read >= 1) {
									return (
										<NavLink
											key={index}
											to={{ pathname: generatePath(`/pcm/project/:id/${item.slug}`, match.params) }}
											className="t-link-menu-item flex items-center text-primary-gray py-2 pl-8 pr-3 text-medium"
										>
											<img className="w-6 h-6 object-contain mr-3" src={getIconFromSlug(item.slug)} alt="Menu item" />
											<span className="truncate">{item.name}</span>
										</NavLink>
									)
								};
								return <div key={index}></div>
							})
							}
						</> : <></>
					}
				</div>
			</div>
		</div>
	)
};

const getIconFromSlug = (slug: string) => {
	switch (slug) {
		case 'bidding':
			return biddingImage;
		case 'budget':
			return budgetImage;
		case 'dashboard':
			return dashboardImage;
		case 'directory':
			return directoryImage;
		case 'document':
			return documentImage;
		case 'drawing':
			return drawingImage;
		case 'folder':
			return folderImage;
		case 'home':
			return homeImage;
		case 'payment':
			return paymentImage;
		case 'photo':
			return photoImage;
		case 'resource':
			return resourceImage;
		case 'schedule':
			return scheduleImage;
		case 'subject':
			return subjectImage;
		default:
			return '/images/pcm/folder.png';
	}
};

export default ProjectLeftSideBar;