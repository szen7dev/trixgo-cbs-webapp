import {FC, useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import { CreateSubmitDetail } from "./CreateSubmitDetail";
import { useBudgetSubmittal } from 'services/hooks/budget/useBudgetSubmittal';
import { Task } from "typings/task";
import { formatNumberMoney } from "utils/cmcs";
import iconNote from "assets/images/icons8-note-48.svg";
import { ModalHumanInformation } from 'shareComponents/common/ModalHumanInformation';

type Props = {
    task: Task;
    userId?: string;
}

export const TaskHumanDetailSubmit:FC<Props> = ({ task, userId }) => {
    const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [optionPopup, setOptionPopup] = useState();
	const [staffPopup, setStaffPopup] = useState();
	const [contactPopup, setContactPopup] = useState();
	const [goodsPopup, setGoodsPopup] = useState();
	const [assetsPopup, setAssetsPopup] = useState();
    const [showCreateSubmittal, setShowCreateSubmittal] = useState(false);

    const {
        list: listSubmittals,
        refetch,
        fetchNextPage,
        totalRecord,
        hasNextPage
    } = useBudgetSubmittal({
        params: {
            populates: JSON.stringify({
                path: "work staff contact goods assets",
                select: "name fullname phone sign unit quantity unitPrice amount impleQuantity impleUnitPrice impleAmount numberOnLeave numberOnLeavePlus department contacts",
                populate: {
                    path: "department contacts",
                    select: "name numberOnLeave numberOnLeavePlus"
                }
            }),
            taskID: task?._id
        },
        isFetchList: true,
    })

    let totalQuantitySubmit = 0, totalAmountSubmit = 0
    for(const item of listSubmittals){
        totalQuantitySubmit = Number(totalQuantitySubmit) + Number(item.quantity)
        totalAmountSubmit = Number(totalAmountSubmit) + Number(item.amount)
    }

    const toggleVisible = ({ option, staffID, contactID, goodsID, assetsID }: any) => {
		setVisibleDrawer(!visibleDrawer)
        setOptionPopup(option)
		setStaffPopup(staffID)
		setContactPopup(contactID)
		setGoodsPopup(goodsID)
		setAssetsPopup(assetsID)
	}

    return (
        <div className={"subtask mt-5"}>
            <div className={"flex items-center"}>
            <span className={"mr-4"}>
                <img src={iconNote} alt={'-----'} />
            </span>
                <div className={"flex items-center"}>
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Chi tiết trình duyệt
                    </span>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    {hasNextPage && (
                        <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"} onClick={fetchNextPage}>
                            Hiển thị thêm ({totalRecord - listSubmittals.length})
                        </button>
                    )}
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                <table
                    className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
                    style={{ borderSpacing: 0 }}
                    >
                    {
                        listSubmittals.length ? 
                            <thead className="">
                                <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                                    <th className="w-1 font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5 border-t-0.5">TT</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Nội dung</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Ghi chú</th>
                                </tr>
                            </thead>
                        : <></>
                    }
                    <tbody className="text-small">
                        {(listSubmittals && listSubmittals.map((item, index) => {
                            return (
                                <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5">{Number(index + 1)}</td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item?.name}
                                        <p onClick={() => toggleVisible({ option: 1, staffID: item?.staff?._id})} className="mt-2 text-cbs-highlight-color">
                                            Nhân sự: {item?.staff?.fullname} | {item?.staff?.department?.name}
                                            <p className="text-primary-gray">
                                                <p>
                                                    Bắt đầu làm việc từ tháng: <span className="font-bold">{Number(12 - item?.staff?.contacts[0]?.numberOnLeave + 1)}</span> |
                                                    Số phép được nghỉ trong năm: <span className="text-green-500 font-bold"> {item?.staff?.contacts[0]?.numberOnLeave}</span> | 
                                                    Số ngày nghỉ phép phát sinh (Hỉ, Sinh, Hiếu,..): <span className="text-green-500 font-bold"> {item?.staff?.contacts[0]?.numberOnLeavePlus}</span> | 
                                                    Tổng phép tối đa được nghỉ: <span className="text-green-500 font-bold"> {Number(item?.staff?.contacts[0]?.numberOnLeave + item?.staff?.contacts[0]?.numberOnLeavePlus)}</span> | 
                                                    Tổng số phép được nghỉ tới hiện tại: <span className="font-bold">{Number(new Date().getMonth()) - Number(12 - item?.staff?.contacts[0]?.numberOnLeave - item?.staff?.contacts[0]?.numberOnLeavePlus)}</span>
                                                </p>
                                                Số phép đã nghỉ: <span className="font-bold">{item?.staff?.numberOnLeave}</span> | 
                                                Số phép còn lại tới hiện tại:  
                                                <span className="text-red-500 font-bold ml-2"> 
                                                    {Number(new Date().getMonth() + 1) - Number(item?.staff?.numberOnLeave + 1) - (12 - Number(item?.staff?.contacts[0]?.numberOnLeave + item?.staff?.contacts[0]?.numberOnLeavePlus))}
                                                </span>
                                            </p>
                                        </p>
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item.note}
                                    </td>
                                </tr>
                            )

                        }))}
                    </tbody>
                </table>
                {showCreateSubmittal &&
                    <CreateSubmitDetail
                        task={task}
                        userId={userId}
                        cancelCreateSubmittal={() => setShowCreateSubmittal(false)}
                        confirmCreateSubmittal={refetch}
                    />
                }

                <button
                    className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}
                    onClick={() => setShowCreateSubmittal(true)}
                >
                    Thêm khoản mục
                </button>

                <ModalHumanInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ optionPopup, staffPopup, contactPopup, goodsPopup, assetsPopup }}/>
            </div>
        </div>
    )
}