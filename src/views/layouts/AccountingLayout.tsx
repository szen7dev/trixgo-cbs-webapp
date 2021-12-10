import {FC, ReactNode, useEffect} from "react";
import "../pages/accounting/style.module.css";
import cn from "classnames";
import {NavLink, useLocation} from "react-router-dom";
import {map as _map} from "lodash";
import { NavLinksAccounting } from "assets/contents/common";
type Props = {
    children: ReactNode;
    showActionButton?: boolean;
    showAddNewButton?: boolean;
};

const AccountingLayout: FC<Props> = ({children,showActionButton, showAddNewButton}) => {
    useEffect(() => {
        document.title = "KẾ TOÁN";
    }, []);

    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const page = paths[paths.length-1];

    return (
        <div className="w-full">
            <div className="overflow-y-auto flex-1 h-full">
                <div className="flex border-b border-gray-200 align-items-center pl-4 pr-4">
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
                        showAddNewButton?
                            <button className="btn btn-primary">
                                Tạo mới
                            </button>
                            :null
                    }
                    {
                        showActionButton?
                            <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
                                <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16ZM4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9ZM4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.895428 0.89543 -3.8147e-06 2 -3.8147e-06C3.10457 -3.8147e-06 4 0.895428 4 2Z" fill="#70747C"/>
                                </svg>
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
