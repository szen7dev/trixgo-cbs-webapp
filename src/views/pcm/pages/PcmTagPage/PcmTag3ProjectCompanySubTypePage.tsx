import { FC, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Loader } from "shareComponents/common";

import iconBack from "assets/images/icon-back-gray.svg";
import { DepartmentRepository } from "apis/item";
import { useQuery } from "react-query";
import DatahubRepository from "apis/datahub";
import { PCM_PROPOSAL_TASK, PCM_STATUS_TASK } from "apis/localdb/index";
import { useTask } from "services/hooks/useTask";
import moment from "moment";
import PaginateV2 from "shareComponents/common/PaginateV2";

const PcmTag3ProjectCompanySubTypePage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const { projectID } = useParams<{ projectID: string }>();
    const { companyID } = useParams<{ companyID: string }>();
    const { subtype } = useParams<{ subtype: string }>();
    const history = useHistory();
    const [pageIndex, setPageIndex] = useState(0);
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = useRef<PaginateHandle>(null);

    const { data: infoDepartment } =
        useQuery(`department_info.${projectID}`, () => DepartmentRepository.fetchDetailDepartment({
            departmentID: projectID
        }), {
            refetchOnWindowFocus: false,
            enabled: true,
        });

    const { data: infoCompany }: any =
        useQuery(`company_info.${companyID}`, () => DatahubRepository.companiesList({
            companyID: companyID
        }), {
            refetchOnWindowFocus: false,
            enabled: companyID ? true : false,
        });
        
        const {
            listTasksWithPager,
            totalRecord,
            totalPages,
            hasNextPage,
            nextPageListTask,
            isFetchingListTask,
            isLoadingListTask
        } = useTask({
            params: {
                subtype: subtype,
                projectID: projectID,
                companyOfAuthor: tab === "3" ? companyID : "",
                companyOfAssignee: tab === "4" ? companyID : "",
            },
            isFetch: true
        });
    
    const getTitleFromSubtype = () => {
        const item = PCM_PROPOSAL_TASK.find((e: any) => e.value == subtype);
        if (item?.text) {
            return item?.text;
        }
        return "";
    };

    return (
        <main className="h-full overflow-auto">
            {(isLoadingListTask) && <Loader className="border-primary" />}
            <div className={"header-table flex w-full top-0 bg-white pt-4 pb-2"}>
                <button onClick={() => history.goBack()} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg "}>
                    <img src={iconBack} alt={"----"} className={"w-[18px]"} />
                </button>
                {companyID ?
                    <span className={"flex-1 flex items-center text-[15px] ml-2"}>
                        {infoDepartment?.data?.sign}.{infoDepartment?.data?.name}/{infoCompany?.data?.name}/{getTitleFromSubtype()}
                    </span> :
                    <span className={"flex-1 flex items-center text-[15px] ml-2"}>
                        {infoDepartment?.data?.sign}.{infoDepartment?.data?.name}
                    </span>
                }
                <div className={"flex-1 flex items-center justify-end"}>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPages}
                        limit={50}
                        hasNextPage={hasNextPage}
                        isFetching={isFetchingListTask}
                        nextPageAction={() => {
                            nextPageListTask();
                            setPageIndex((oldState) => oldState + 1);
                        }}
                        prevPageAction={() => {
                            setPageIndex((oldState) => oldState - 1);
                        }}
                    />
                </div>
            </div>
            <div className={"table-task-sheet"}>
                <table className={"w-full table-fixed tasks border-collapse"}>

                    <thead className={"bg-cbs-table-header sticky top-0 z-10"}>
                        <th className={"w-[46px]"}>
                            <div className={"flex items-center justify-center py-3"}>
                                <input className="form-check-input" type="checkbox" value="" id="check" />
                            </div>
                        </th>
                        <th className={"w-6/12"}>
                            Nội dung
                        </th>
                        <th className={"w-1/12"}>
                            Thời hạn
                        </th>
                        <th className={"w-2/12"}>
                            Thực hiện
                        </th>
                        <th className={"w-2/12"}>
                            Trạng thái
                        </th>
                        <th className={"w-2/12"}>
                            Tiến trình
                        </th>
                    </thead>

                    <tbody>
                        {(listTasksWithPager[pageIndex] ?? []).map((item: any) => {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <div className={"flex items-center justify-center py-3"}>
                                            <input className="form-check-input" type="checkbox" value="" id="check" />
                                        </div>
                                    </td>
                                    <td className="text-[14px]">
                                        <Link to={"/pcm/detail/" + (item._id)}>
                                            {item.project.sign}.{item.name}
                                        </Link>
                                    </td>
                                    <td className="text-[14px]">
                                        {moment(item.actualFinishTime).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="text-[14px]">
                                        <div className={"flex items-center"}>
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${item.assignee.image}`} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"} />
                                            <div className={"ml-2"}>{item.assignee.fullname ?? item.assignee.fullname}</div>
                                        </div>
                                    </td>
                                    <td className={"break-all"} style={{color: `#${PCM_STATUS_TASK[item.status - 1].backgroud}`}}>
                                        {PCM_STATUS_TASK[item.status - 1].text}
                                    </td>
                                    <td>
                                        <p className={"mb-1 text-right text-secondary-gray"}>{item.percentage}%</p>
                                        <div className={"relative w-full h-[4px] rounded-full border-0.5 border-primary-border bg-cbs-task-assign-progress-bg"}>
                                            <div className={"absolute h-full left-0 top-0 bg-cbs-schedule-expired"} style={{ width: `${item.percentage}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PcmTag3ProjectCompanySubTypePage;