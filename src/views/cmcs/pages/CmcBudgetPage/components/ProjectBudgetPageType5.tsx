import React, {FC, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96 1.png";
import {useCashFlowPlan} from "services/hooks/financial/useCashFlow";
import {Project} from "typings/items/project";
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import {formatNumberMoney} from "utils/cmcs";
import {Link} from "react-router-dom";
type Props = {
    projectInfo: Project
}
export const ProjectBudgetPageType5:FC<Props> = ({projectInfo}) => {
    const [recordSelected, setSelectRecord] = useState<any>({});

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const {isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage} = useCashFlowPlan({
        params: {
            projectID: projectInfo._id,
            outin: 2,
            type: 5,
            property: 3
        },
        isFetchList: true
    })

    return (
        <>
            <div className={"sticky top-0 z-10 block"}>
                <div className={"flex items-center px-4 py-2"}>
                    {/* <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại gói thầu"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Hình thức"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại hợp đồng"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Trạng thái"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                    </div>
                    <button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
                        Tạo mới
                    </button> */}
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
                    {/* <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button> */}
                    {
                        recordSelected._id&&
                        <button className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={pencilIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={20}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPage();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
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
                            Nội dung
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Kế hoạch
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Thực tế
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ghi chú
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Thành viên
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (listWithPager[pageIndex]??[]).map((plan,i) => (
                            <tr key={plan._id}>
                                <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                    <input className="form-check-input line mr-2" type="checkbox"
                                           checked={plan._id === recordSelected._id}
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   setSelectRecord(document);
                                                   return null;
                                               }
                                               setSelectRecord({});
                                               return null;
                                           }}
                                    />
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    <Link to={`/pm/project/${projectInfo._id}/budget/type/4/detail/${plan._id}`}>{plan.name}</Link>
                                    <p className={"text-primary-gray text-xs"}>{plan.userCreate.bizfullname} | Ngày ký: {moment(plan.createAt).format("DD/MM/YYYY HH:mm")}</p>
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(plan.value)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(plan.realValue)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.note}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.members.length}
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}