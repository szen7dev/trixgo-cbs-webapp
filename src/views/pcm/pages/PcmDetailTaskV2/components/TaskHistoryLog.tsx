import React, {FC, Fragment, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import iconChecklist from "assets/images/icons8-checklist-64.svg";
import {DropdownSearchableV2, TimeRangeDropdown} from "shareComponents/common";
import nextIcon from "assets/images/icons-arrow-next.svg";
import userIcon from "assets/images/icon-user-avatar.svg";
import TriangleDown from "assets/icons/TriangleDown";

export const TaskHistoryLog:FC = () => {
    const [isShow, setIsShow] = useState(false);
    const focusElementRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <button onClick={() => setIsShow(!isShow)} className={"rounded bg-cbs-form-input-bg h-[36px] text-primary-gray flex items-center justify-center px-3"}>
                <img src={iconChecklist} alt={"----"} className={"w-[24px] mr-2"}/>
                <span>Lịch sử hoạt động</span>
            </button>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                    onClose={() => {
                        setIsShow(false)
                    }}
                    initialFocus={focusElementRef}
                >
                    <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={"max-w-[768px] min-w-[768px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <div className={"flex items-center flex-1"}>
                                        <img src={iconChecklist} alt={"----"} className={"w-[24px] mr-4"}/>
                                        <span className={"text-xl font-bold"}>Lịch sử hoạt động</span>
                                    </div>
                                    <button
                                        className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                        onClick={() => {
                                            setIsShow(false)
                                        }}
                                    >
                                        <Close/>
                                    </button>
                                </div>
                                <div className={"history-header flex items-center border-b-0.5 border-primary-border mt-4 pb-2"}>
                                    <DropdownSearchableV2
                                        placeholder={"Lọc theo phân loại"}
                                        showTriangle={true}
                                        className={"rounded-full border border-primary-border w-fit"}
                                        disableSearch={true}
                                        data={[
                                            {
                                                id: 1,
                                                text: "Tất cả"
                                            },
                                            {
                                                id: 2,
                                                text: "Thay đổi thời hạn công việc"
                                            },
                                            {
                                                id: 3,
                                                text: "Thay đổi người thực hiện"
                                            },
                                            {
                                                id: 4,
                                                text: "Thêm người liên quan"
                                            },
                                            {
                                                id: 5,
                                                text: "Gửi email thông báo"
                                            },
                                            {
                                                id: 6,
                                                text: "Chuyển tiếp chủ đề"
                                            },
                                            {
                                                id: 7,
                                                text: "Ký xác nhận phê duyệt"
                                            },
                                        ]}
                                    />
                                    <TimeRangeDropdown
                                        className={"rounded-full border border-primary-border w-fit p-1.5 ml-2"}
                                        placeholder={"Lọc theo thời gian"}
                                        iconBack={<TriangleDown/>}
                                        onValueChange={val => console.log(val)}
                                        options={[
                                            {
                                                text: "Tất cả",
                                                fromDate: "00/00/0000",
                                                toDate: "31/12/2999"
                                            },
                                            {
                                                text: "Cách đây 1 tuần",
                                                fromDate: "12/08/2022",
                                                toDate: "05/08/2022"
                                            },
                                            {
                                                text: "Cách đây 1 tháng",
                                                fromDate: "12/08/2022",
                                                toDate: "12/07/2022"
                                            }
                                        ]}
                                    />
                                    <div className={"flex-1 flex items-center justify-end"}>
                                        <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                                            <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                                        </button>
                                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                                            <img src={nextIcon} alt={"----"}/>
                                        </button>
                                    </div>
                                </div>
                                <div className={"max-h-[500px] min-h-[320px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                    <div className={"flex items-center py-2"}>
                                        <img src={userIcon} alt={"user"} className={"rounded-full overflow-hidden w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]"}/>
                                        <div className={"log-content text-primary-gray pl-4"}>
                                            <p><b>Vũ Thanh Bình-CPMI</b> thay đổi thời hạn công việc từ 15/2/2020 tới 12/6/2022 ông việc từ ngày hôm đó tới ngày hôm nay</p>
                                            <p>15:30 22/12/2012 (10 day ago)</p>
                                        </div>
                                    </div>
                                    <div className={"flex items-center py-2"}>
                                        <img src={userIcon} alt={"user"} className={"rounded-full overflow-hidden w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]"}/>
                                        <div className={"log-content text-primary-gray pl-4"}>
                                            <p><b>Vũ Thanh Bình-CPMI</b> thay đổi thời hạn công việc từ 15/2/2020 tới 12/6/2022 ông việc từ ngày hôm đó tới ngày hôm nay</p>
                                            <p>15:30 22/12/2012 (10 day ago)</p>
                                        </div>
                                    </div>
                                    <div className={"flex items-center py-2"}>
                                        <img src={userIcon} alt={"user"} className={"rounded-full overflow-hidden w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]"}/>
                                        <div className={"log-content text-primary-gray pl-4"}>
                                            <p><b>Vũ Thanh Bình-CPMI</b> thay đổi thời hạn công việc từ 15/2/2020 tới 12/6/2022 ông việc từ ngày hôm đó tới ngày hôm nay</p>
                                            <p>15:30 22/12/2012 (10 day ago)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}