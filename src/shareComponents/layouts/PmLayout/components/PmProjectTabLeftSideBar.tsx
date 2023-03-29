/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import financialLogo from "assets/logos/financial.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import projectIcon from "assets/images/icons-project.svg";
import addnewIcon from "assets/images/icons8-inspection-96 1.svg";
import userIcon from "assets/images/icons8-user-shield-48.svg";
import pageIcon from "assets/images/image326.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/
export const PmProjectTabLeftSideBar: FC = () => {

  const { user } = useAuth();
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.FINANCIAL.id });
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.FINANCIAL.id, parentID: APP_ID.FINANCIAL.menuFinancialApp.id });
  const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.FINANCIAL.id, type: "1" });

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
        <button
          // onClick={() =>
          //     openModal(
          //         <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
          //             <ModalAddNewTask />
          //         </div>
          //     )
          // }
          className={"bg-cbs-blue-button rounded-lg flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
          <img src={addnewIcon} alt={"Tạo mới"} />
          <span className={"ml-2"}>Tạo mới</span>
        </button>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to={` `}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img width={'20px'} src={userIcon} alt="Menu item" />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
          </NavLink>
          <NavLink
            to={` `}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={pageIcon}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Gói thầu</span>
          </NavLink>
          <NavLink
            to={`#`}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={pageIcon}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Báo cáo quản trị</span>
          </NavLink>
        </div>
      </div>
    </div>
  );

};
