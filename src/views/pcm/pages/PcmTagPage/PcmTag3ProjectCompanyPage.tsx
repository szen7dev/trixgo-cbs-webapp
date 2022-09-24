import { FC, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Loader } from "shareComponents/common";
import tagIcon from "assets/images/icons8-tag-100.svg"

import iconBack from "assets/images/icon-back-gray.svg";
import { DepartmentRepository } from "apis/item";
import { useQuery } from "react-query";
import DatahubRepository from "apis/datahub";
import { PCM_PROPOSAL_TASK } from "apis/localdb/index";
import { usePcmPlanTaskGetListByProperty } from "services/hooks/pcm/usePcmDashboardV2";

const PcmTag3ProjectCompanyPage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const { projectID } = useParams<{ projectID: string }>();
    const { companyID } = useParams<{ companyID: string }>();
    const history = useHistory();
    // Danh sách các response

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
        
        const { isLoading, dataTotal } = usePcmPlanTaskGetListByProperty({
            option: tab === "3" ? 3 : 4,
            projectID: projectID,
            companyID: companyID,
            enabled: true,
        });
    const dataFromTaskGetListByProperty = dataTotal?.data && dataTotal.data.length ? dataTotal.data : [];
    
    const getAmountFromSubtype = (subtype: number) => {
        const item = dataFromTaskGetListByProperty.find((e: any) => e._id?.subtype == subtype);
        if (item?.amount) {
            return item?.amount;
        }
        return 0;
    };

    return (
        <main className="h-full overflow-auto">
            {(isLoading) && <Loader className="border-primary" />}
            <div className={"header-table flex w-full top-0 bg-white pt-4 pb-2"}>
                <button onClick={() => history.goBack()} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg "}>
                    <img src={iconBack} alt={"----"} className={"w-[18px]"} />
                </button>
                {companyID ?
                    <span className={"flex-1 flex items-center text-[15px] ml-2"}>
                        {infoDepartment?.data?.sign}.{infoDepartment?.data?.name}/{infoCompany?.data?.name}
                    </span> :
                    <span className={"flex-1 flex items-center text-[15px] ml-2"}>
                        {infoDepartment?.data?.sign}.{infoDepartment?.data?.name}
                    </span>
                }
            </div>
            <div className={"flex-1 overflow-y-auto"}>
                <table className={"w-full table-fixed tasks"}>
                    <tbody>
                        {PCM_PROPOSAL_TASK.map(
                            (item: any, index: number) => {
                                const amount = getAmountFromSubtype(item.value);
                                return (
                                    <tr
                                        key={index}
                                        className={"border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative"}
                                    >
                                        <td className={"w-[55px]"}>
                                            <img
                                                src={tagIcon}
                                                alt={"tags"}
                                                className={
                                                    "w-[24px] h-[24px]"
                                                }
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/pcm/tags/${tab}/${projectID}/${companyID}/${item.value}`}>
                                                <p className={"text-[14px]"}>
                                                    {item.text}
                                                </p>
                                            </Link>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    "task-date text-right pr-20"
                                                }
                                            >
                                                {amount}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PcmTag3ProjectCompanyPage;