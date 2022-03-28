import { FC } from "react";

import { NavLink, useParams } from "react-router-dom";

import { useAuth } from "services/hooks/auth/useAuth";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

export const CmcsContractLeftSideBar: FC = () => {
  const { user } = useAuth();
  const { id: contractID } = useParams<{ id: string }>();
  const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.CMCS.id, parentID: APP_ID.CMCS.menuCmcsContract.id });
	const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.CMCS.id, type: "3" });
  console.log("listAppMenu", listAppMenu);
  console.log("listAppRoleMenu", listAppRoleMenu);

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <NavLink to="/cmcs/home">
          <div className="t-leftsidebar-title flex items-center py-5 pl-8 pr-3 text-[14px] font-bold">
            <img
              src={
                user?.image
                  ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}`
                  : fakeThumbnail
              }
              alt="Thumbnail"
              className="w-10 h-10 rounded-full mr-3"
            />
            <span>Quản lý hợp đồng</span>
          </div>
        </NavLink>

        {/* menu block */}
        <div className="t-link-menu-container">
          {listAppMenu && listAppMenu.length ?
            <>
              {listAppMenu.map((item: any, index: number) => {
                const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                if (roleApp && roleApp.read >= 1) {
                  return (
                    <NavLink
                      to={`/cmcs/contract/${contractID}/${item.slug}`}
                      className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
                    >
                      <img
                        className="w-6 h-6 object-contain mr-3"
                        src={iconFolder}
                        alt="Menu item"
                      />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  )
                };
                return <div key={index}></div>
              })
              }
            </> : <></>
          }
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/admin`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Quản trị thành viên</span>
          </NavLink>
          <NavLink
            to={`/cmcs/contract/${contractID}/home`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Trang chủ hợp đồng</span>
          </NavLink>
          <NavLink
            to={`/cmcs/contract/${contractID}/dashboard`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Báo cáo quản trị</span>
          </NavLink> */}
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/editor`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Biên soạn hợp đồng</span>
          </NavLink> */}
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/bill`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Biểu khối lượng</span>
          </NavLink> */}
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/budget`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Ngân sách</span>
          </NavLink> */}
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/produce`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Sản lượng</span>
          </NavLink>
          <NavLink
            to={`/cmcs/contract/${contractID}/ipc`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Nghiệm thu hoàn thành</span>
          </NavLink> */}
          {/* <NavLink
            to={`/cmcs/contract/${contractID}/product`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Hồ sơ, sản phẩm</span>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};
