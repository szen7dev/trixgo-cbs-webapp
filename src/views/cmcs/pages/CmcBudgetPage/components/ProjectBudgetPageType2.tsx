import React, {FC, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import { useContract } from "services/hooks/items/useContract";
import {Project} from "typings/items/project";
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import {formatNumberMoney} from "utils/cmcs";

function daysdifference(currentDate: any, inputDate: any) {
    const currentDay = new Date(currentDate);
    const inputDay = new Date(inputDate);

    const millisBetween = inputDay.getTime() - currentDay.getTime();
    const days = millisBetween / (1000 * 3600 * 24);
    return Math.round(days);
}

type Props = {
    projectInfo: Project
}
export const ProjectBudgetPageType2:FC<Props> = ({ projectInfo }) => {
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const {
        isLoading, totalRecord, totalPage, hasNextPage, listContractWithPager
    } = useContract({
        params: {
            projectID: projectInfo._id, isExpiredAg: 1, limit: 20,
            populates: JSON.stringify({
                path: 'project',
                select: 'name sign',
            })
        },
        isFetch: true
    })
    return (
        <>
            <div className={"sticky top-0 z-10 block"}>
                <div className={"flex items-center px-4 py-2"}>
                   
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
                    {/* <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={pencilIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <div className={"flex-1 flex items-center justify-end"}>
                        <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                            <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                        </button>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                            <img src={nextIcon} alt={"----"}/>
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                        </th>
                        <th className={"w-5/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Hợp đồng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Thời hạn bảo lãnh
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Số ngày còn lại
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Giá trị bảo lãnh
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ghi chú
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (listContractWithPager[pageIndex]??[]).map((item: any, index: number) => (
                            <tr key={index}>
                                <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                    <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    <p>{item?.project?.sign}.{item?.name}</p>
                                    <p className={"text-primary-gray text-xs"}>{item?.sign} | Ngày ký: { moment( item?.date).format("L")}</p>
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {moment( item?.expiredAg).format("L")}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {daysdifference(new Date(), new Date(item?.expiredAg))  < 0 ? 0 : daysdifference(new Date(), new Date(item?.expiredAg)) }
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(item?.agValue)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {item?.note}
                                </td>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
            </div>
        </>
    )
}