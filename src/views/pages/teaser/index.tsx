import {FC, useState} from "react";
import { Menu, Popover } from '@headlessui/react';

import searchIcon from "assets/images/icon-search.png";
import messageIcon from "assets/images/RightSideBarIcon/icons8-edit-chat-history-48.png";
import expandIcon from "assets/images/icon-expand-arrow.png";
import checkIcon from "assets/images/icons8-checkmark-48.png";
import avatar from "assets/images/avatar.jpg";
import pinIcon from "assets/images/icons8-push-pin-64.png";
import doubleTickIcon from "assets/images/icons8-double-tick-48.png";
import reportIcon from "assets/images/icons8-report-file-64.png";
import optionIcon from "assets/images/icon-3dots.png";
import removeIcon from "assets/images/icons8-remove-48.png";
import toggleIcon from "assets/images/icons8-toggle-on-50.png";

const TeaserPage: FC = () => {

    return (
        <div className="chatbox-container flex">
            <div className="chatbox-col-left border-r border-secondary-light overflow-auto">
                <div className="chatbox-search pr-4 pl-4 pt-3 pb-3 border-b border-secondary-light relative flex">
                    <img className="w-4 absolute top-5 left-7" src={searchIcon} alt="Search" />
                    <input className="w-full border border-secondary-light bg-accent-gray" placeholder="Tìm kiếm" />
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

                <div className="chatbox-item-container overflow-auto">
                    {/*______________________chatbox item________________________*/}
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-grey2">
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
                                <Menu.Items className="absolute top-full right-0 w-48 shadow-md bg-primary-light z-10 pb-2 pt-2">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                            >
                                                <img className="w-6 mr-3" src={toggleIcon} alt="Option item" /> Tắt thông báo
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
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-grey2">
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
                    <div className="chatbox-item relative cursor-pointer transition-all duration-200 bg-grey2">
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
                                    <span className="chatbox-item-text-date"><img className="w-6 inline-block" src={doubleTickIcon} alt="Checked" /> 2 ngày</span>
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
        </div>
    );
};

export default TeaserPage;
