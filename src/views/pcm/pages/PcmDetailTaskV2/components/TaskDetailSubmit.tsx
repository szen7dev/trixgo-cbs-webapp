import {FC, useState, useEffect} from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { CreateSubmitDetail } from "./CreateSubmitDetail";
// import { SubmittalItem } from "./SubmittalItem";
import { useBudgetSubmittal } from 'services/hooks/budget/useBudgetSubmittal';
import { Task } from "typings/task";

type Props = {
    task: Task;
    userId?: string;
}

export const TaskDetailSubmit:FC<Props> = ({ task, userId }) => {
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
                path: "work",
                select: "name sign unit quantity unitPrice amount impleQuantity impleUnitPrice impleAmount"
            }),
            taskID: task?._id
        },
        isFetchList: true,
    })

    return (
        <div className={"subtask mt-5 w-2/3"}>
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
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Đơn vị</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Số lượng</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Thành tiền đệ trình (1)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Ngân sách còn lại (2)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Đánh giá (2-1)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Ghi chú</th>
                                </tr>
                            </thead>
                        : <></>
                    }
                    <tbody className="text-small">
                        {(listSubmittals && listSubmittals.map((item, index) => {
                            let amountRetain = 0, amountCheck = 0
                            if(item?.work){
                                amountRetain = Number(item?.work?.amount) - Number(item?.work?.impleAmount)
                                amountCheck = Number(amountRetain) - Number(item.amount)
                            }
                            return (
                                <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5">{Number(index + 1)}</td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item.name}
                                        <p className="text-cbs-highlight-color"><i>{item?.work?.sign}-{item?.work?.name}</i></p>
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item?.unit}
                                        {item?.work?.unit}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 text-right">
                                        {item.quantity.toLocaleString("vi", {
                                            maximumFractionDigits: 3,
                                        })}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 text-right">
                                        {item.amount.toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 text-right">
                                        {amountRetain.toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                        <p>-----------------</p>
                                        {item?.work?.impleAmount.toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}/
                                         {item?.work?.amount.toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5  text-right" style={{color: amountCheck < 0 ? "rgb(255, 0, 0)" : "#000000"}}>
                                        {Number(amountCheck).toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                        <p>-----------------</p>
                                        {amountCheck < 0 ? "Vượt" : ""}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">{item.note}</td>
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
            </div>
        </div>
    )
}