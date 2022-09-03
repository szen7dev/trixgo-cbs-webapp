import React, {FC} from "react";
import {useModal} from "services/hooks/useModal";
import {ModalAddNewTask} from "../../../../common";
import {NavLink, useParams, useRouteMatch, generatePath} from 'react-router-dom';
import projectIcon from "assets/images/icons-project.svg";
import shieldIcon from "assets/images/icons8-user-shield-48.svg";
import reportIcon from "assets/images/icons8-report.svg";

import drawingImage from "assets/menu/project/icons-project-drawing.svg";
import biddingImage from "assets/menu/project/icons-project-bidding.svg";
import budgetImage from "assets/menu/project/icons-project-budget.svg";
import dashboardImage from "assets/menu/project/icons-project-dashboard.svg";
import directoryImage from "assets/menu/project/icons-project-directory.svg";
import documentImage from "assets/menu/project/icons-project-document.svg";
import folderImage from "assets/menu/project/icons-project-folder.svg";
import homeImage from "assets/menu/project/icons-project-home.svg";
import paymentImage from "assets/menu/project/icons-project-payment.svg";
import photoImage from "assets/menu/project/icons-project-photo.svg";
import scheduleImage from "assets/menu/project/icons-project-schedule.svg";
import subjectImage from "assets/menu/project/icons-project-subject.svg";
// import resourceImage from "assets/menu/project/resource.png";
import adminIcon from "assets/images/icons8-user-shield-48.svg"

import { useAuth } from "services/hooks/auth/useAuth";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import projectImage from "assets/images/project.jpg";

export const PmProjectLeftMenuContent:FC = () => {

    const { user } = useAuth();

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
            // case 'resource':
            //     return resourceImage;
            case 'schedule':
                return scheduleImage;
            case 'subject':
                return subjectImage;
            default:
                return '/images/pcm/folder.png';
        }
    };

    const { openModal } = useModal();
    const {id} = useParams<{id: string}>();

    // Cây menu project
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
        <>
            {/* <button
                onClick={() =>
                    openModal(
                        <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                            <ModalAddNewTask />
                        </div>
                    )
                }
                className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={projectIcon} alt={"Tạo mới"}/>
                <span className={"ml-2"}>Tạo mới</span>
            </button> */}
            {/* title */}

            <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
                <img src={imgUrl} alt="Thumbnail" className="w-10 h-10 mr-3" />
                <span className="truncate" title={detailDepartment?.sign + "." + detailDepartment?.name}>{detailDepartment?.sign}.{detailDepartment?.name}</span>
            </div>

            <div className={"mt-1"}>
                {!detailDepartment?.admins?.includes(user?._id || "") ? <></> :
                    <NavLink to={`/pm/project/${projectID}/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray text-[14px]"}>
                        <img width={'20px'} src={adminIcon}/>
                        <span className={"flex-1 ml-2 text-left"}>Quản trị viên dự án</span>
                    </NavLink>
				}
                <NavLink to={`/pm/project/${projectID}/home`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray text-[14px]"}>
                    <img width={'20px'} src={getIconFromSlug('home')}/>
                    <span className={"flex-1 ml-2 text-left"}>Home</span>
                </NavLink>
                {listAppMenu && listAppMenu.length ?
                    <>
                        {listAppMenu.map((item: any, index: number) => {
                            const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                            if (roleApp && roleApp.read >= 1) {
                                return (
                                    <NavLink key={index} to={{ pathname: generatePath(`/pm/project/:id/${item.slug}`, match.params) }} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray text-[14px]"}>
                                        <img width={'20px'} src={getIconFromSlug(item.slug)}/>
                                        <span className={"flex-1 ml-2 text-left"}>{item.name}</span>
                                    </NavLink>
                                )
                            };
                            return <div key={index}></div>
                        })
                        }
                    </> : <></>
                }
            </div>
        </>
    )
}