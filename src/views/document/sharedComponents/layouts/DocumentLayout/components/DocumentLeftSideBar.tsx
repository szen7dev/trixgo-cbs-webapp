import { FC } from "react";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink } from 'react-router-dom';
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import documentlLogo from "assets/logos/document.png";

export const DocumentLeftSideBar: FC = () => {
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.DOCUMENT.id });
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.DOCUMENT.id, parentID: APP_ID.DOCUMENT.menuDocumentApp.id });
  const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.DOCUMENT.id, type: "1" });
  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
          <img src={documentlLogo} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Hồ sơ văn bản</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink to={`/document/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Trang chủ</span>
          </NavLink>
          {listAppMenu && listAppMenu.length ?
            <>
              {listAppMenu.map((item: any, index: number) => {
                const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                if (roleApp && roleApp.read >= 1) {
                  return (
                    <NavLink key={index} to={`/document/${item.slug}`}
                      className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
                      <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  )
                };
                return <div key={index}></div>
              })
              }
            </> : <></>
          }
          {hasPermission && dataUserAccess?.level == 0 ?
            <NavLink to={`/document/admin`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản trị viên</span>
            </NavLink> : <></>
          }
        </div>
      </div>
    </div>
  )
}