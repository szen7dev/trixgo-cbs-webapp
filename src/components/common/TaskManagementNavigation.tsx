import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import linkingIcon from "assets/images/icon-linking.png";

import cn from "classnames";
import { map as _map } from "lodash";

import { TaskManagementNavLinks } from "assets/contents/common";

const TaskManagementNavigation: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  return (
    <div className="task-management-navigation fixed w-56 left-0 top-16 bottom-0 overflow-hidden w-56 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-white">
      <div className="task-management-navigation-container overflow-auto w-56 transition-all duration-500 ease-out">
        {_map(TaskManagementNavLinks, (item, index) => (
          <div
            key={index}
            className="tm-left-sidebar-group border-b border-secondary-light mb-2"
          >
            <p
              className="tm-left-sidebar-group-title font-bold pt-2 pb-2 pl-3 pr-3 m-0 truncate h-9 transition-all duration-500 ease-out"
              title={item.title}
            >
              {item.title}
            </p>
            {_map(item.navLink, (link) => (
              <NavLink
                key={link.id}
                exact
                to={link.url}
                title={link.label}
                className={cn(
                  "tm-left-sidebar-item transition-all duration-500 ease-out pt-2 pb-2 pl-3 pr-3 mb-1 relative flex items-center",
                  {
                    active: page === link.pathname,
                  }
                )}
              >
                {link.icon}
                <span className="tm-left-sidebar-item-text transition-all duration-500 ease-out">
                  {link.label}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div className="tm-left-sidebar-footer w-56 transition-all duration-500 ease-out pt-2 pr-4 pl-4">
        <div className="tm-left-sidebar-progress h-1 rounded-lg mb-1">
          <div
            className="tm-left-sidebar-progress-value h-1 rounded-lg"
            style={{ width: "20%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <span>0.38 DB of 15 GB used</span>
          <a href="/">
            <img className="w-4" src={linkingIcon} alt="Linking" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementNavigation;
