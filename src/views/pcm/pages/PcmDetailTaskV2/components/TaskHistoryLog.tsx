import React, {FC, Fragment, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import iconChecklist from "assets/images/icons8-checklist-64.svg";
import {DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import nextIcon from "assets/images/icons-arrow-next.svg";
import userIcon from "assets/images/icon-user-avatar.svg";
import TriangleDown from "assets/icons/TriangleDown";
import { UseHistoryLogs } from "services/hooks/analysis/useHistoryLogs";
import { Task } from "typings/task";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { Loader } from "shareComponents/common";
import moment from "moment";
moment.locale('vi');
type Props = {
    task: Task;
    userId?: string;
    refetchTaskInfo?: ()=> void
}
export const TaskHistoryLog:FC<Props> = ({ task, userId, refetchTaskInfo }) => {
    // Phân trang
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = React.useState(0);

    const [isShow, setIsShow] = useState(false);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const  {   
        isLoading,
        list,
        listHistoryLogsWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        hasNextPage,
        refetch,
        fetchNextPage,
        isFetching
    } = UseHistoryLogs({ params: { taskID: task._id, limit: 20 }, isFetchList: true});
    return (
        <>
            {(isLoading) && <Loader className="border-primary" />}
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
                                    {/* <DropdownSearchableV2
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
                                    /> */}
                                    {/* <TimeRangeDropdown
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
                                    /> */}
                                    <div className={"flex-1 flex items-center justify-end"}>
                                    <PaginateV2
                                        ref={ref}
                                        totalRecord={totalRecord}
                                        totalPages={totalPage}
                                        limit={20}
                                        hasNextPage={hasNextPage}
                                        isFetching={isFetching}
                                        nextPageAction={() => {
                                            fetchNextPage();
                                            setPageIndex((oldState) => oldState + 1);
                                        }}
                                        prevPageAction={() => {
                                            setPageIndex((oldState) => oldState - 1);
                                        }}
                                    />
                                    </div>
                                </div>
                                <div className={"max-h-[500px] min-h-[320px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                    {(listHistoryLogsWithPager[pageIndex] ?? []).map((item: any, index: number) => {
                                        return (
                                            <div className={"flex items-center py-2"} key={index}>
                                                <img src={item.userCreate.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.userCreate?.image}` : userIcon} alt={"user"} className={"rounded-full overflow-hidden w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]"}/>
                                                <div className={"log-content text-primary-gray pl-4"}>
                                                    <p>
                                                        <b> {item?.userCreate?.fullname} </b>
                                                        {item?.content}
                                                    </p>    
                                                    <p> {moment(item?.createAt).format("LT")} {moment(item?.createAt).format("L")} ({moment(item?.createAt).startOf('minute').fromNow()})</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}