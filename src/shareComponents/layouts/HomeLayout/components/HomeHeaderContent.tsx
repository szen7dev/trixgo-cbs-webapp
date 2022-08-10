import React, {FC, Fragment, useState} from "react";
import {Menu, Transition} from '@headlessui/react';
import trigangleDown from "assets/images/triangle-down.svg";
import searchIcon from "assets/images/icons8-search-120.png";
import BlueCheck from "assets/images/blue-check.svg";

export const HomeHeaderContent:FC = () => {
    const [tab, setTab] = useState(1);
    const [filter, setFilter] = useState("all");

    const menuFilter : {
        text: string,
        filter: string
    }[] = [
        {
            text: "Tất cả",
            filter: "all"
        },
        {
            text: "Chưa đọc",
            filter: "unread"
        },
        {
            text: "Đã đọc",
            filter: "read"
        },
    ]
    return (
        <div className={"flex items-center justify-between"}>
            <div className={"flex-1 relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-lg text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none"} placeholder={"Tìm trong chủ đề"}/>
            </div>
            <div className={"flex border-collapse ml-3 mr-3"}>
                <button
                    onClick={() => setTab(1)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 1 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Chủ đề
                </button>
                <button
                    onClick={() => setTab(2)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 2 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Phản hồi
                </button>
                <button
                    onClick={() => setTab(3)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 3 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    File
                </button>
            </div>
            <div className={"ml-10 mr-4"}>
                <Menu as="div" className="relative inline-block text-left">
                    <div className="flex items-center justify-center">
                        <Menu.Button className={"border border-primary-border rounded-full px-4 py-2 flex items-center justify-center"}>
                            <span className={"flex-1 mr-2"}>Lọc theo</span>
                            <img src={trigangleDown} alt={"----"}/>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 origin-top-right w-[281px] bg-primary-light rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none mt-2">
                            {
                                menuFilter.map(menu => (
                                    <Menu.Item
                                        key={menu.filter}
                                        onClick={() => setFilter(menu.filter)}
                                    >
                                        <div className={"w-full"}>
                                            <Menu.Button
                                                className={"w-full flex items-center px-4 py-2 hover:bg-cbs-dropdown-hover"}>
                                                <img className={menu.filter === filter ? "visible" : "invisible"} src={BlueCheck} alt={"check"}/>
                                                <span className={"ml-2"}>{menu.text}</span>
                                            </Menu.Button>
                                        </div>
                                    </Menu.Item>
                                ))
                            }
                            <Menu.Item>
                                <div className={"w-full border-t-0.5 border-primary-border"}>
                                    <Menu.Button className={"w-full flex items-center pl-10 px-4 py-2 hover:bg-cbs-dropdown-hover"}>
                                        Đánh dấu tất cả đã đọc
                                    </Menu.Button>
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}