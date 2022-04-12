import { FC, useState } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";
import IconFolder from "shareComponents/common/Icon/IconFolder/IconFolder";
import IconFolderMinus from "shareComponents/common/Icon/IconFolder/IconFolderMinus";
import IconFolderPlus from "shareComponents/common/Icon/IconFolder/IconFolderPlus";

export const routes = [
  {
    path: "/workshop/home",
    label: "Trang chủ workshop",
  },
  {
    path: "/workshop/list",
    label: "Workshop yêu thích",
    isGroup: true,
    children: [
      { path: "/workshop/list/category/1", label: "Workshop 1" },
      { path: "/workshop/list/category/2", label: "Workshop 1" },
    ],
  },
  {
    path: "/workshop/list",
    label: "Workshop yêu thích",
    isGroup: true,
    children: [
      { path: "/workshop/list/category/1", label: "Workshop 1" },
      { path: "/workshop/list/category/2", label: "Workshop 1" },
    ],
  },
];

const WorkshopLeftSideBar: FC = () => {
  const [show, setShow] = useState<Record<number, boolean>>({});
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
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
        <ul className="pl-6 pr-2 text-large text-cbs-subtext">
          {routes.map((route, index) => {
            return route.isGroup ? (
              <li key={index}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({ ...show, [index]: !show[index] });
                  }}
                  className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block w-full"
                >
                  {show[index] ? (
                    <IconFolderMinus className="inline-block h-4 w-4 mr-1" />
                  ) : (
                    <IconFolderPlus className="inline-block h-4 w-4 mr-1" />
                  )}
                  {route.label}
                </a>
                {show[index] && (
                  <div className="border-l border-black border-dashed pl-2 ml-4">
                    {route.children.map((r) => (
                      <NavLink
                        key={r.path}
                        to={r.path}
                        className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block"
                      >
                        <IconFolder className="inline-block h-4 w-4 mr-1" />
                        <span>{r.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <NavLink
                key={index}
                to={"/workshop/home"}
                className="hover:text-black hover:bg-cbs-active-comment px-2 py-1.5 block"
              >
                <IconFolder className="inline-block h-4 w-4 mr-1" />
                <span>{route.label}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WorkshopLeftSideBar;
