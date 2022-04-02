import React, { FC } from "react";
// import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink, useRouteMatch, generatePath, useParams } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

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

	return (
		<div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
			<div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
				{/* title */}
				<div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
					<img src={detailDepartment?.image ? `${process.env.REACT_APP_URL_S3}/${detailDepartment?.image}` : "/static/media/project.8fd16481.jpg"} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
					<span className="truncate" title={detailDepartment?.sign + "." + detailDepartment?.name}>{detailDepartment?.sign}.{detailDepartment?.name}</span>
				</div>

				{/* menu block */}
				<div className="t-link-menu-container">
					{!detailDepartment?.admins?.includes(user?._id || "") ? <></> :
						<NavLink
							to={{ pathname: generatePath('/pcm/project/:id/admin', match.params) }}
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
						<img className="w-6 h-6 object-contain mr-3" src={'/images/pcm/folder.png'} alt="Menu item" />
						<span className="truncate">Trang chủ</span>
					</NavLink>
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
											<img className="w-6 h-6 object-contain mr-3" src={'/images/pcm/folder.png'} alt="Menu item" />
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
}

export default ProjectLeftSideBar;