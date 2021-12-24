import {FC, ReactNode, useEffect} from "react";
import "../pages/accounting/style.module.css";
import cn from "classnames";
import {NavLink, useLocation} from "react-router-dom";
import {map as _map} from "lodash";
import { NavLinksTaskDashboard } from "assets/contents/common";

const TaskDashboardNavigation: FC = () => {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const page = paths[paths.length-1];

    return (
        <div className="flex border-b h-[50px] border-gray-200 align-items-center pl-4 pr-4 sticky top-0 bg-white z-3">
            <ul className="nav flex flex-1 h-full">
                {_map(NavLinksTaskDashboard, (link, index) => (
                    <li
                        key={link.id}
                        className={cn("flex px-3 last:mb-0 acc-tab min-w-[130px] justify-center sticky left-"+(index*130+16)+"px", {
                            "acc-active-tab": page === link.pathname,
                        })}
                    >
                        <NavLink
                            exact
                            to={link.url}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TaskDashboardNavigation;
