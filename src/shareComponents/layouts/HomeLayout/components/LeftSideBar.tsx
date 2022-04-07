/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import dollarIcon from "assets/images/icons8-us-dollar-80.png";
import chevronRight from "assets/images/icon-expand-arrow-right.png";
import iconFolder from "assets/images/icons8-application-window-100.png";
import iconBigFolder from "assets/images/icons8-opened-folder-240.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/

export const LeftSideBar: FC = () => {
  const { user } = useAuth();
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.PCM.id, parentID: APP_ID.PCM.menuPcmApp.id });
  const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.PCM.id, type: "1" });

  return (
    <div className="t-leftsidebar-navigation fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* user */}
        <div className="t-leftsidebar-user flex items-center mb-2">
          <img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <div className="t-leftsidebar-user-text">
            <p className="t-leftsidebar-user-text-name font-bold mb-1">{user?.fullname}</p>
            <div className="t-leftsidebar-user-text-price flex items-center">
              <img className="t-leftsidebar-user-text-price-currency mr-3 h-6 w-6" src={dollarIcon} alt="Dollar" />
              <span>đ 0.000 </span>
              <img className="t-leftsidebar-user-text-price-arrow h-3 ml-2" src={chevronRight} alt="Dollar" />
            </div>
          </div>
        </div>

        {/* menu block */}
        <div className="t-leftsidebar-menu-block mb-6">
          {/* <p className="t-leftsidebar-menu-title mb-5">Quản lý dự án</p> */}
          {hasPermission && dataUserAccess?.level == 0 ?
            <NavLink to={`/pcm/admin`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
              <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
              <span className="truncate">Quản trị viên</span>
            </NavLink> : <></>
          }

          {listAppMenu && listAppMenu.length ?
            <>
              {listAppMenu.map((item: any, index: number) => {
                const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                if (roleApp && roleApp.read >= 1) {
                  return (
                    <NavLink key={index} to={`/pcm/${item.slug}`} 
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

          <p className="t-leftsidebar-menu-title mb-1 mt-2">Công việc</p>
          <NavLink to={`/pcm/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Việc của tôi</span>
          </NavLink>
          <NavLink to={`/pcm/assign`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Việc giao người khác</span>
          </NavLink>
          <NavLink to={`/pcm/bookmark`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Việc quan tâm</span>
          </NavLink>
          <NavLink to={`/pcm/report`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
            <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
            <span className="truncate">Báo cáo động</span>
          </NavLink>

          {/* <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div> */}
        </div>

        {/* menu block */}
        {/* <div className="t-leftsidebar-menu-block mb-6">
          <p className="t-leftsidebar-menu-title mb-5">Danh sách dự án</p>
          <div className="t-leftsidebar-menu-container">
            <a className="t-leftsidebar-menu-item flex items-center mb-6 text-primary-gray" href="/">
              <img className="w-6 h-6 object-contain mr-3" src={iconMissile} alt="Menu item" />
              <span className="truncate">CHG.THT.Xây dựng cụmm thông tin truyền thông và thiết bị</span>
            </a>
          </div>
          <div className="t-leftsidebar-menu-showmore">
            <button className="t-leftsidebar-menu-showmore-btn flex items-center">
              <img className="h-1 mr-3" src={icon3dots} alt="Show more" /> Xem thêm
            </button>
          </div>
        </div> */}

        {/* customize data block */}
        <div className="t-leftsidebar-customize-data text-center">
          <img className="block ml-auto mr-auto mb-4 w-16 h-16" src={iconBigFolder} alt="Folder" />
          <div className="font-bold text-2xl text-dark mb-4" role="none">Tùy chỉnh dữ liệu?</div>
          <p className="text-secondary-gray mb-6">Tạo và sắp xếp các dữ liệu theo cách mà bạn mong muốn</p>
          <NavLink to="/">
            <button className="font-bold text-[14px] bg-primary pt-3 pb-3 pl-4 pr-4 text-primary-light rounded">Thực hiện ngay</button>
          </NavLink>
        </div>

      </div>
    </div>
  );
};