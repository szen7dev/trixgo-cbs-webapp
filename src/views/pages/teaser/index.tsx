import {FC, useState} from "react";
import { Menu } from '@headlessui/react';

import ChatInfo from "./information";

import searchIcon from "assets/images/icon-search.png";
import searchIcon2 from "assets/images/icons8-search-50.png";
import messageIcon from "assets/images/icons8-edit-chat-history-48.png";
import expandIcon from "assets/images/icon-expand-arrow.png";
import expandRightIcon from "assets/images/icon-expand-arrow-right.png";
import expandLeftIcon from "assets/images/icon-expand-arrow-left.png";
import checkIcon from "assets/images/icons8-checkmark-48.png";
import avatar from "assets/images/avatar.jpg";
import pinIcon from "assets/images/icons8-push-pin-64.png";
import doubleTickIcon from "assets/images/icons8-double-tick-48.png";
import reportIcon from "assets/images/icons8-report-file-64.png";
import optionIcon from "assets/images/icon-3dots.png";
import optionIcon2 from "assets/images/icon-3dots-vertical.svg";
import removeIcon from "assets/images/icons8-remove-48.png";
import toggleIcon from "assets/images/icons8-toggle-on-50.png";
import cancelIcon from "assets/images/icons8-cancel-50.png";
import showInformationIcon from "assets/images/icons8-restaurant-menu-64.png";

import iconOption1 from "assets/images/TaskManagementHeaderOptions/icons8-add-user-group-man-man-48.png";
import iconOption2 from "assets/images/TaskManagementHeaderOptions/icons8-edit-128.png";
import iconOption3 from "assets/images/TaskManagementHeaderOptions/icons8-push-pin-64.png";
import iconOption4 from "assets/images/TaskManagementHeaderOptions/icons8-report-file-64.png";
import iconOption5 from "assets/images/TaskManagementHeaderOptions/icons8-exit-64.png";

const TeaserPage: FC = () => {
    const [isChatboxSearchVisible, setIsChatboxSearchVisible] = useState(false);
    const [isShowInformation, setIsShowInformation] = useState(false);

    //________________show/hide search dropdown__________________
    const enableChatboxSearchVisible = () => {
        setIsChatboxSearchVisible(true);
    };
    const disableChatboxSearchVisible = () => {
        setIsChatboxSearchVisible(false);
    };

    //________________show/hide right column - chat box information_______________
    const toggleChatboxInformationVisible = () => {
        setIsShowInformation(!isShowInformation);
    };

    return (
        <div className="chatbox-container flex">

            {/*_________________________left column_____________________________*/}
            <div className="chatbox-col-left border-r border-secondary-light overflow-auto relative">
                <div className="chatbox-search pr-4 pl-4 pt-3 pb-3 border-b border-secondary-light relative flex">
                    <input onFocus={enableChatboxSearchVisible} className="chatbox-search-input w-full border border-secondary-light bg-accent-gray" placeholder="Tìm kiếm" />
                    <button onClick={disableChatboxSearchVisible} className="chatbox-input-clear absolute top-5 right-16">
                        <img className="tm-right-sidebar-chat-icon w-5" src={cancelIcon} alt="Clear" />
                    </button>
                    <img className="w-4 absolute top-5 left-7" src={searchIcon} alt="Search" />
                    <button className="chatbox-new-message-btn">
                        <img className="tm-right-sidebar-chat-icon w-6" src={messageIcon} alt="Chat" />
                    </button>
                </div>
                <div className="flex justify-between pt-2 pb-2 pl-3 pr-3">
                    <div className="relative">
                        <Menu>
                            <Menu.Button className="chatbox-list-state-dropdown">Tình trạng <img className="w-4 ml-1 inline-block" src={expandIcon} alt="Dropdown" /></Menu.Button>
                            <Menu.Items className="absolute top-full left-12 w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex justify-between pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Tất cả tin nhắn
                                            <img className="w-4 ml-1 inline-block filter-blue" src={checkIcon} alt="Check" />
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex justify-between pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Tin nhắn chưa đọc
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex justify-between pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Tin nhắn từ người lạ
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <button className="color-gray2">Đánh dấu đã đọc</button>
                </div>

                {/*________________search result - show when focusing the search input_________*/}
                <div className={`${!isChatboxSearchVisible && 'hidden'} chatbox-search-container absolute bg-primary-light z-10 bottom-0 left-0 right-0`}>
                    <div className="font-bold pt-3 pb-3 pl-4 pr-4 flex items-center">
                        <button onClick={disableChatboxSearchVisible} className="mr-3"><img className="w-6" src={expandLeftIcon} alt="Back" /></button>
                        Tìm kiếm gần đây
                    </div>
                    <div className="font-bold pt-3 pb-3 pl-4 pr-4 flex items-center">
                        Kết quả tìm kiếm (3)
                    </div>
                    <div className="chatbox-search-result overflow-auto">
                        {/*______________________search result item________________________*/}
                        <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                            <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                                <div className="chatbox-item-avatar relative">
                                    <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                </div>
                                <div className="chatbox-item-text text-sm pl-3">
                                    <div className="flex justify-between items-center whitespace-nowrap">
                                        <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">
                                            <span className="color-blue">VIỆC NỘI BỘ</span> TRIXGO KẾ HOẠCH TUẦN 7
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*______________________search result item________________________*/}
                        <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                            <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                                <div className="chatbox-item-avatar relative">
                                    <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                </div>
                                <div className="chatbox-item-text text-sm pl-3">
                                    <div className="flex justify-between items-center whitespace-nowrap">
                                        <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">
                                            VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*______________________search result item________________________*/}
                        <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                            <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                                <div className="chatbox-item-avatar relative">
                                    <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                </div>
                                <div className="chatbox-item-text text-sm pl-3">
                                    <div className="flex justify-between items-center whitespace-nowrap">
                                        <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">
                                            VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*_______________________chatbox list____________________*/}
                <div className="chatbox-item-container overflow-auto">
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-gray2">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                <span className="tm-right-sidebar-chat-item-online border border-accent-light w-3 h-3 absolute bottom-0 right-1 rounded-full"></span>
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                        {/*___________menu option___________*/}
                        <div className="chatbox-item-option absolute top-4 right-12 z-10 text-dark">
                            <Menu>
                                <Menu.Button className="w-7 h-7 rounded-full border border-secondary-light bg-primary-light">
                                    <img className="w-5 inline-block" src={optionIcon} alt="Option" />
                                </Menu.Button>
                                <Menu.Items className="fixed w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                    <div className="chatbox-item-option-level2 relative">
                                        <button className="hover:bg-lighter-gray flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm">
                                            <img className="w-6 mr-3 toggle-icon-active" src={toggleIcon} alt="Option item" />
                                            Tắt thông báo
                                            <img className="w-6 ml-auto" src={expandRightIcon} alt="Expand" />
                                        </button>
                                        <div className="chatbox-item-option-level2-content absolute top-0 left-full w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                    >
                                                        Trong 1 giờ
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                    >
                                                        Trong 4 giờ
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                    >
                                                        Cho đến 8:AM
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                    >
                                                        Cho đến khi mở lại
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={checkIcon} alt="Option item" /> Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={pinIcon} alt="Option item" /> Ghim hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={reportIcon} alt="Option item" /> Ẩn hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm color-red`}
                                            >
                                                <img className="w-6 mr-3 filter-red" src={removeIcon} alt="Option item" /> Xóa lịch sử
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-gray2">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                        {/*___________menu option___________*/}
                        <div className="chatbox-item-option absolute top-4 right-12 z-10 text-dark">
                            <Menu>
                                <Menu.Button className="w-7 h-7 rounded-full border border-secondary-light bg-primary-light">
                                    <img className="w-5 inline-block" src={optionIcon} alt="Option" />
                                </Menu.Button>
                                <Menu.Items className="fixed w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={toggleIcon} alt="Option item" />
                                                Bật thông báo
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={checkIcon} alt="Option item" /> Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={pinIcon} alt="Option item" /> Ghim hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={reportIcon} alt="Option item" /> Ẩn hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm color-red`}
                                            >
                                                <img className="w-6 mr-3 filter-red" src={removeIcon} alt="Option item" /> Xóa lịch sử
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-gray2">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                <span className="tm-right-sidebar-chat-item-online border border-accent-light w-3 h-3 absolute bottom-0 right-1 rounded-full"></span>
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                        {/*___________menu option___________*/}
                        <div className="chatbox-item-option absolute top-4 right-12 z-10 text-dark">
                            <Menu>
                                <Menu.Button className="w-7 h-7 rounded-full border border-secondary-light bg-primary-light">
                                    <img className="w-5 inline-block" src={optionIcon} alt="Option" />
                                </Menu.Button>
                                <Menu.Items className="fixed w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={toggleIcon} alt="Option item" />
                                                Bật thông báo
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={checkIcon} alt="Option item" /> Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={pinIcon} alt="Option item" /> Ghim hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={reportIcon} alt="Option item" /> Ẩn hội thoại
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm color-red`}
                                            >
                                                <img className="w-6 mr-3 filter-red" src={removeIcon} alt="Option item" /> Xóa lịch sử
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>

                    {/*______________________separate line________________________*/}
                    <div className="border-b border-secondary-light"></div>
                    {/*___________________________________________________________*/}

                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                <span className="tm-right-sidebar-chat-item-online border border-accent-light w-3 h-3 absolute bottom-0 right-1 rounded-full"></span>
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2 font-bold" title="Hongvv">Hongvv</p>
                                    <span className="chatbox-item-text-date">1 giờ</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <span className="bg-red inline-block rounded-full h-4 text-primary-light pl-1 pr-1 text-xs">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date color-red">Chưa gửi</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                                <span className="tm-right-sidebar-chat-item-online border border-accent-light w-3 h-3 absolute bottom-0 right-1 rounded-full"></span>
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date"><img className="w-6 inline-block" src={doubleTickIcon} alt="Checked" /> 2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200">
                        <div className="chatbox-item-content pt-2 pb-2 pr-3 pl-3 flex justify-center items-center">
                            <div className="chatbox-item-avatar relative">
                                <img className="w-12 h-12 rounded-full" src={avatar} alt="Avartar" />
                            </div>
                            <div className="chatbox-item-text text-sm pl-3">
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-name overflow-hidden overflow-ellipsis pr-2" title="VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7">VIỆC NỘI BỘ TRIXGO KẾ HOẠCH TUẦN 7</p>
                                    <span className="chatbox-item-text-date">2 ngày</span>
                                </div>
                                <div className="flex justify-between items-center whitespace-nowrap">
                                    <p className="chatbox-item-text-preview overflow-hidden overflow-ellipsis pr-2">Toan TRX join: đã tham gia 8 giờ trước</p>
                                    <img className="w-4 chatbox-item-text-pin" src={pinIcon} alt="Pin" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*_________________________left column_____________________________*/}
            <div className={`${isShowInformation && 'chatbox-col-main-show-info'} chatbox-col-main flex`}>
                <div className="chatbox-area w-full">
                    <div className="chatbox-area-title flex justify-between items-end pt-2 pb-2 pl-5 pr-4 border-b border-secondary-light">
                        <div>
                            <p className="text-lg font-bold">Vu Nam - Thông tin dự án</p>
                            <span className="color-gray2">7 thành viên</span>
                        </div>
                        <div className="flex items-center">
                            <button className="ml-6">
                                <img className="w-6" src={searchIcon2} alt="Search" />
                            </button>
                            <button className="ml-6" onClick={toggleChatboxInformationVisible}>
                                <img className={`${isShowInformation && 'filter-blue'} w-6`} src={showInformationIcon} alt="Info" />
                            </button>
                            <div className="relative">
                                <Menu>
                                    <Menu.Button className="ml-6 bg-gray1 w-7 h-7 rounded-full flex items-center justify-center">
                                        <img className="w-4 opacity-70" src={optionIcon2} alt="Option" />
                                    </Menu.Button>
                                    <Menu.Items className="absolute top-full right-0 w-48 shadow-md bg-primary-light z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                >
                                                    <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption1} alt="Option" />
                                                    Thêm thành viên
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                >
                                                    <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption2} alt="Option" />
                                                    Cập nhật thông tin
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                >
                                                    <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption3} alt="Option" />
                                                    Ghim hội thoại
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                >
                                                    <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption4} alt="Option" />
                                                    Ẩn hội thoại
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-lighter-gray'} color-red flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                                >
                                                    <img className="w-6 h-6 object-contain mr-2 opacity-60 filter-red" src={iconOption5} alt="Option" />
                                                    Rời hội thoại
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
                {isShowInformation && (
                    <ChatInfo handleInformationCb={setIsShowInformation} />
                )}
            </div>

            {/*_________________________left column_____________________________*/}
        </div>
    );
};

export default TeaserPage;
