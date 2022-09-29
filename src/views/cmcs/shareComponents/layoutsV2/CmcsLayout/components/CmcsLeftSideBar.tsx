import { FC } from "react";

import { NavLink } from "react-router-dom";

import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import contractLogo from "assets/images/contract.png";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

export const CmcsLeftSideBar: FC = () => {
  const { user } = useAuth();
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.CMCS.id });
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.CMCS.id, parentID: APP_ID.CMCS.menuCmcsApp.id });
  const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.CMCS.id, type: "1" });

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
        {/* title */}
        {/* <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 font-bold">
          <img src={contractLogo } alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Quản lý hợp đồng</span>
        </div> */}

        {/* menu block */}
        <div className="t-link-menu-container">
          {hasPermission && dataUserAccess?.level == 0 ?
            <NavLink
              to={`/cmcs/admin`}
              className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
            >
              <img width={'20px'} src={'/images/pcm/admin.png'} alt="Menu item" />
              <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
            </NavLink> : <></>
          }
          <NavLink
            to={`/cmcs/dashboard`}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={iconFolder}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Dashboard</span>
          </NavLink>
          <NavLink
            to={`/cmcs/home`}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={iconFolder}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
          </NavLink>

          {listAppMenu && listAppMenu.length ?
            <>
              {listAppMenu.map((item: any, index: number) => {
                const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                if (roleApp && roleApp.read >= 1) {
                  return (
                    <NavLink
                      key={index}
                      to={`/cmcs/${item.slug}`}
                      className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                    >
                      <img
                        width={'20px'}
                        src={iconFolder}
                        alt="Menu item"
                      />
                      <span className={"flex-1 ml-2 text-left text-[14px]"}>{item.name}</span>
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
  );

};
