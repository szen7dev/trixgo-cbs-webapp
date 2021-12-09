import {FC, ReactNode, useEffect} from "react";
import "./style.module.css";
import cn from "classnames";
import {NavLink, useLocation} from "react-router-dom";
import {map as _map} from "lodash";
import { NavLinksAccounting } from "assets/contents/common";
type Props = {
    children: ReactNode;
    showActionButton?: boolean;
};

const AccountingLayout: FC<Props> = ({children,showActionButton}) => {
    useEffect(() => {
        document.title = "KẾ TOÁN";
    }, []);

    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const page = paths[paths.length-1];

    return (
        <div className="w-full">
            <div className="overflow-y-auto p-4 pt-0 flex-1 h-full">
                <div className="flex border-b border-gray-200 align-items-center">
                    <ul className="nav flex flex-1 ">
                        {_map(NavLinksAccounting, (link) => (
                            <li
                                key={link.id}
                                className={cn("flex px-3 py-2 last:mb-0 acc-tab", {
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
                    {
                        showActionButton?
                            <button className="btn btn-primary">
                                Tạo mới
                            </button>
                            :null
                    }
                </div>
                {children}
            </div>
        </div>
    )
};

export default AccountingLayout;
