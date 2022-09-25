import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import { useAuth } from "services/hooks/auth/useAuth";
import SidebarTreeViewList from "shareComponents/common/Sidebar/SidebarTreeViewList";

export const routes = [
  {
    path: "/workshop/home",
    label: "Trang chủ",
  },
  // {
  //   path: "/workshop/list",
  //   label: "Workshop yêu thích",
  //   isGroup: true,
  //   children: [
  //     { path: "/workshop/list/category/1", label: "Workshop 1" },
  //     { path: "/workshop/list/category/2", label: "Workshop 1" },
  //   ],
  // },
  // {
  //   path: "/workshop/list",
  //   label: "Workshop yêu thích",
  //   isGroup: true,
  //   children: [
  //     { path: "/workshop/list/category/1", label: "Workshop 1" },
  //     { path: "/workshop/list/category/2", label: "Workshop 1" },
  //   ],
  // },
];

const WorkshopLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
        {/* title */}
        <div className="flex items-center py-2 px-8 text-[14px] font-bold">
          <img
            src={
              user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail
            }
            alt="Thumbnail"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span>Workshop</span>
        </div>

        {/* menu block */}
        <SidebarTreeViewList list={routes} />
      </div>
    </div>
  );
};

export default WorkshopLeftSideBar;
