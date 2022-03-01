import { FC } from "react";
import { Menu } from '@headlessui/react';
import { NavLink } from "react-router-dom";

import caretDown from "assets/images/icon-caret-down.png";
import iconLabels from "assets/images/icon-labels.png";
import iconOption from "assets/images/icon-3dots-vertical.svg";
import iconOption1 from "assets/images/000/TaskManagementHeaderOptions/icons8-add-user-group-man-man-48.png";
import iconOption2 from "assets/images/000/TaskManagementHeaderOptions/icons8-edit-128.png";
import iconOption3 from "assets/images/000/TaskManagementHeaderOptions/icons8-push-pin-64.png";
import iconOption4 from "assets/images/000/TaskManagementHeaderOptions/icons8-report-file-64.png";
import iconOption5 from "assets/images/000/TaskManagementHeaderOptions/icons8-exit-64.png";
import iconLink from "assets/images/icon-linking.png";
import chevronLeft from "assets/images/icon-chevron-left.png";
import chevronRight from "assets/images/icon-chevron-right.png";
import avatar from "assets/images/avatar.jpg";
import attachImg from "assets/images/icons8-image-48.png";
import attachWord from "assets/images/icons8-microsoft-word-96.png";
import attachExcel from "assets/images/icons8-microsoft-excel-2019-48.png";
import iconStar from "assets/images/icon-star-filled.png";

export const PcmTasks: FC = () => {
    return (
        <>
            {/*_____________header______________*/}
            <div className="task-management-header flex items-center justify-between pt-3 pb-3 pl-5 pr-5 border-b border-secondary-light">
                {/*___________________________*/}
                <div className="task-management-header-left-block flex items-center">
                    <input type="checkbox" className="w-5 h-5 mr-1" />
                    <div className="relative">
                        <Menu>
                            <Menu.Button className="block"><img className="w-4" src={caretDown} alt="Dropdown" /></Menu.Button>
                            <Menu.Items className="absolute top-full left-0 w-32 shadow-md bg-primary-light z-10">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} block pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Cập nhật
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} block pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <span className="ml-1 mr-1 text-primary-gray">|</span>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLabels} alt="Functional button" /></button>
                    <span className="ml-1 mr-1 text-primary-gray">|</span>
                    <div className="relative">
                        <Menu>
                            <Menu.Button className="block ml-3 mr-3"><img className="w-4" src={iconOption} alt="Options" /></Menu.Button>
                            <Menu.Items className="absolute top-full left-0 w-48 shadow-md bg-primary-light z-10">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption1} alt="Option" />
                                            Thêm
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption2} alt="Option" />
                                            Cập nhật
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption3} alt="Option" />
                                            Ghim
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            <img className="w-6 h-6 object-contain mr-2 opacity-60" src={iconOption4} alt="Option" />
                                            Xuất báo cáo
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} color-red flex items-center pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            <img className="w-6 h-6 object-contain mr-2 opacity-60 filter-red" src={iconOption5} alt="Option" />
                                            Xóa bỏ
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                    <span>Last account activity: 17 minutes ago</span>
                    <button className="ml-3 mr-3"><img className="w-6 opacity-60" src={iconLink} alt="Functional button" /></button>
                </div>
                {/*___________________________*/}
                <div className="task-management-header-right-block flex items-center">
                    <span className="text-sm mr-2">1-50 of 339</span>
                    <button className="ml-1 mr-1"><img className="w-5 opacity-60" src={chevronLeft} alt="Pagination prev" /></button>
                    <button className="ml-1 mr-1"><img className="w-5 opacity-60" src={chevronRight} alt="Pagination next" /></button>
                </div>
            </div>

            {/*_____________main content______________*/}
            <div className="task-management-content overflow-auto">
                {/*_____________tab title______________*/}
                <div className="task-management-tab pt-px pl-3 border-b border-accent-gray flex items-center">
                    <button className="task-management-tab-item pt-1.5 pb-1.5 pl-4 pr-4 mr-px relative top-px hover:bg-primary-light transition-all duration-200 ease-out bg-primary-light">Tab 1</button>
                    <button className="task-management-tab-item pt-1.5 pb-1.5 pl-4 pr-4 mr-px relative top-px hover:bg-primary-light transition-all duration-200 ease-out">Tab 2</button>
                    <button className="task-management-tab-item pt-1.5 pb-1.5 pl-4 pr-4 mr-px relative top-px hover:bg-primary-light transition-all duration-200 ease-out">Tab 3</button>
                    <div className="relative ml-auto">
                        <Menu>
                            <Menu.Button className="flex items-center pt-1.5 pb-1.5 hover:bg-secondary-light pl-3 pr-3">More tools <img className="w-4 ml-1 inline-block" src={caretDown} alt="Dropdown" /></Menu.Button>
                            <Menu.Items className="absolute top-full right-0 w-36 shadow-md bg-primary-light z-10">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} block pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Menu 1
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-lighter-gray'} block pl-3 pr-3 pt-2 pb-2 w-full text-left text-sm`}
                                        >
                                            Menu 2
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div className="functional-table pb-16">
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <NavLink to={"/pcm/detail/12345"}>
                                    <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                                </NavLink>
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-yellow inline-block text-primary-light pl-1 pr-1 mr-3">Tuần tới</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <NavLink to={"/pcm/detail/12345"}>
                                    <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                                </NavLink>
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-red inline-block text-primary-light pl-1 pr-1 mr-3">Quá hạn</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-green inline-block text-primary-light pl-1 pr-1 mr-3">+7 ngày</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star tpf-param-star-active">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-yellow inline-block text-primary-light pl-1 pr-1 mr-3">Tuần tới</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-red inline-block text-primary-light pl-1 pr-1 mr-3">Quá hạn</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-green inline-block text-primary-light pl-1 pr-1 mr-3">+7 ngày</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star tpf-param-star-active">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-yellow inline-block text-primary-light pl-1 pr-1 mr-3">Tuần tới</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-red inline-block text-primary-light pl-1 pr-1 mr-3">Quá hạn</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-green inline-block text-primary-light pl-1 pr-1 mr-3">+7 ngày</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star tpf-param-star-active">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-yellow inline-block text-primary-light pl-1 pr-1 mr-3">Tuần tới</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-red inline-block text-primary-light pl-1 pr-1 mr-3">Quá hạn</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                    {/*_____________table row item______________*/}
                    <div className="functional-table-item flex border-b border-secondary-light pt-3 pr-4 pb-3 pl-5">
                        <div className="functional-table-col-checkbox pt-3 pr-4">
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="functional-table-col-avatar pr-4 pb-2">
                            <div className="avatar-group relative w-12 h-12">
                                <img className="w-9 h-9 rounded-full absolute top-0 right-0 object-contain z-10" src={avatar} alt="avatar" />
                                <img className="w-8 h-8 rounded-full absolute bottom-0 left-0 object-contain z-20 border-2 border-primary-light" src={avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="functional-table-col-content pr-4">
                            <div className="functional-table-col-content-title font-bold mb-1">
                                <span className="text-secondary-gray">TRX.PRD.BA.</span>Đối chiếu công nợ tài khoản giữa CPMI, PCO và TRIXO năm 2020 và năm 2021
                            </div>
                            <div className="text-sm mb-2 italic text-primary-gray">Created: Nguyễn Hữu Hiệp-PGI - 28/04/2021 15:30</div>
                            <div className="tpf-attach flex flex-wrap">
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.png">
                                    <img className="h-6 w-6 object-contain" src={attachImg} alt="Attachment" /> TrixgoHomepage.png
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.docx">
                                    <img className="h-6 w-6 object-contain" src={attachWord} alt="Attachment" /> TrixgoHomepage.docx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl" title="TrixgoHomepage.xlsx">
                                    <img className="h-6 w-6 object-contain" src={attachExcel} alt="Attachment" /> TrixgoHomepage.xlsx
                                </button>
                                <button className="tpf-attach-item bg-primary-light border border-secondary-gray flex items-center pt-1 pr-3 pb-1 pl-3 whitespace-nowrap overflow-hidden overflow-ellipsis mr-2 max-w-3xl tpf-attach-item-plus" title="+3">+3</button>
                            </div>
                        </div>
                        <div className="functional-table-col-parameter flex items-start ml-auto text-right text-sm w-60 justify-end">
                            {/* label type: tpf-label-green, tpf-label-yellow, tpf-label-red */}
                            <span className="tpf-label tpf-label-green inline-block text-primary-light pl-1 pr-1 mr-3">+7 ngày</span>
                            <div className="tpf-param-content mr-3">
                                <div className="font-bold">12/07/2020 15:00</div>
                                <div className="font-bold">15:43</div>
                            </div>
                            <div className="tpf-param-star tpf-param-star-active">
                                <img className="h-6 w-6" src={iconStar} alt="Star"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
