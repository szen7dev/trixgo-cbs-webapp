import {FC, useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import { CreateSubmitDetail } from "./CreateSubmitDetail";
import { useBudgetSubmittal } from 'services/hooks/budget/useBudgetSubmittal';
import { Task } from "typings/task";
import { formatNumberMoney } from "utils/cmcs";
import iconNote from "assets/images/icons8-note-48.svg";
import { ModalHumanInformation } from 'shareComponents/common/ModalHumanInformation';
import { ModalContactInformation } from 'shareComponents/common/ModalContactInformation';
import { ModalGoodsInformation } from 'shareComponents/common/ModalGoodsInformation';

type Props = {
    task: Task;
    userId?: string;
}

export const TaskDetailSubmit:FC<Props> = ({ task, userId }) => {
    const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
    const [visibleDrawer2, setVisibleDrawer2] = useState<boolean>(false);
    const [visibleDrawer3, setVisibleDrawer3] = useState<boolean>(false);
	const [optionPopup, setOptionPopup] = useState();
	const [staffPopup, setStaffPopup] = useState();
	const [contactPopup, setContactPopup] = useState();
	const [goodsPopup, setGoodsPopup] = useState();
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
                path: "work staff contact goods",
                select: "name fullname phone sign unit quantity unitPrice amount impleQuantity impleUnitPrice impleAmount numberOnLeave"
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

    const toggleVisible = ({ option, staffID, contactID, goodsID }: any) => {
		setVisibleDrawer(!visibleDrawer)
        setOptionPopup(option)
		setStaffPopup(staffID)
		setContactPopup(contactID)
		setGoodsPopup(goodsID)
	}

    const toggleVisible2 = ({ option, staffID, contactID, goodsID }: any) => {
		setVisibleDrawer2(!visibleDrawer2)
        setOptionPopup(option)
		setStaffPopup(staffID)
		setContactPopup(contactID)
		setGoodsPopup(goodsID)
	}

    const toggleVisible3 = ({ option, staffID, contactID, goodsID }: any) => {
		setVisibleDrawer3(!visibleDrawer3)
        setOptionPopup(option)
		setStaffPopup(staffID)
		setContactPopup(contactID)
		setGoodsPopup(goodsID)
	}

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
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">SL trình</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Thành tiền (1)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Còn lại được sử dụng (2)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Chênh lệch (2-1)</th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 border-t-0.5">Ghi chú</th>
                                </tr>
                                <tr className="whitespace-nowrap align-middle text-left">
                                    <th className="w-1pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5"></th>
                                    <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">Tổng</th>
                                    <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                    <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                    <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 text-right">
                                        {totalAmountSubmit.toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                    </th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                    <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                </tr>
                            </thead>
                        : <></>
                    }
                    <tbody className="text-small">
                        {(listSubmittals && listSubmittals.map((item, index) => {
                            let strNotice = '', strColor = 'green'

                            let quantityRetain = 0, amountRetain = 0, amountCheck = 0, quantityCheck = 0
                            if(item?.work){
                                quantityRetain = Number(item?.work?.quantity) - Number(item?.work?.impleQuantity)
                                amountRetain = Number(item?.work?.amount) - Number(item?.work?.impleAmount)
                                
                                amountCheck = Number(amountRetain) - Number(item.amount)
                                quantityCheck = Number(quantityRetain) - Number(item.quantity)
                            }

                            if(amountCheck <0){
                                strNotice = strNotice + 'Vượt giá trị'
                                strColor = 'red'
                                
                                if(quantityCheck <0){
                                    strNotice = strNotice + '+Vượt khối lượng'
                                }                                
                            }else{
                                if(quantityCheck <0){
                                    strNotice = 'Vượt khối lượng'
                                    strColor = 'orange'
                                }
                            }

                            return (
                                <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5">{Number(index + 1)}</td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item.name}
                                        {item?.work ? <p className="text-cbs-highlight-color"><i>{item?.work?.sign}-{item?.work?.name}</i></p> : <></>}
                                        {item?.work ? <p>SL ({formatNumberMoney(item?.work?.quantity)})-Thực hiện ({formatNumberMoney(item?.work?.impleQuantity)})-Còn (<b style={{color: "green"}}>{formatNumberMoney(quantityRetain)}</b>)</p> : <></>}
                                        {item?.work ? <p>Giá trị ({formatNumberMoney(item?.work?.amount)})-Thực hiện ({formatNumberMoney(item?.work?.impleAmount)})-Còn (<b style={{color: "green"}}>{formatNumberMoney(amountRetain)}</b>)</p> : <></>}
                                        {item?.staff ? <p onClick={() => toggleVisible({ option: 1, staffID: item?.staff?._id})} className="mt-2 text-cbs-highlight-color">Nhân sự: {item?.staff?.fullname} | Số nghỉ phép lũy kế: ({item?.staff?.numberOnLeave})</p> : <></>}
                                        {item?.contact ? <p onClick={() => toggleVisible2({ option: 2, contactID: item?.contact?._id})} className="mt-2 text-cbs-highlight-color">Mã khách: {item?.contact?.name}</p> : <></>}
                                        {item?.goods ? <p onClick={() => toggleVisible3({ option: 3, goodsID: item?.goods?._id})} className="mt-2 text-cbs-highlight-color">Vật tư: {item?.goods?.name}</p> : <></>}
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
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5  text-right" style={{color: strColor}}>
                                        {Number(amountCheck).toLocaleString("vi", {
                                            maximumFractionDigits: 0,
                                        })}
                                    </td>
                                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">
                                        {item.note}
                                        <p style={{color: strColor}}>{strNotice}</p>
                                    </td>
                                </tr>
                            )

                        }))}

                        {
                            listSubmittals.length ? 
                            <tr className="whitespace-nowrap align-middle text-left">
                                <th className="w-1pt-2.5 pb-3 px-2 border-b border-cbs-border border-l-0.5 border-r-0.5"></th>
                                <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5">Tổng duyệt</th>
                                <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                <th className="pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5 text-right" style={{color: "green"}}>
                                    {task?.amount.toLocaleString("vi", {
                                        maximumFractionDigits: 0,
                                    })}
                                </th>
                                <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                                <th className="font-normal pt-2.5 pb-3 px-2 border-b border-cbs-border border-r-0.5"></th>
                            </tr>
                            : <></>
                        }
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

                <ModalHumanInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ optionPopup, staffPopup, contactPopup, goodsPopup }}/>
                <ModalContactInformation open={visibleDrawer2} onClose={toggleVisible2} dataPopup={{ optionPopup, staffPopup, contactPopup, goodsPopup }}/>
                <ModalGoodsInformation open={visibleDrawer3} onClose={toggleVisible3} dataPopup={{ optionPopup, staffPopup, contactPopup, goodsPopup }}/>
            </div>
        </div>
    )
}