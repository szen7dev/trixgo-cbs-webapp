import { FC, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Loader } from "shareComponents/common";
import { useListResponseFromSearch } from "services/hooks/pcm/usePcmDashboardV2";
import { showTime, subContentHtml } from "views/homepage/pages";
import userIcon from "assets/images/icon-user-avatar.svg";
import PaginateV2 from "shareComponents/common/PaginateV2";
import iconBack from "assets/images/icon-back-gray.svg";
import { DepartmentRepository } from "apis/item";
import { useQuery } from "react-query";
import DatahubRepository from "apis/datahub";

const PcmTagProjectPage: FC = () => {
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = useRef<PaginateHandle>(null);
    const { projectID } = useParams<{ projectID: string }>();
    const { companyID } = useParams<{ companyID: string }>();
    const [pageIndex, setPageIndex] = useState(0);
    const history = useHistory();
    // Danh sách các response
    const query: any = {
        draft: 0,
        projectsID: [projectID],
        enabled: true,
    };

    const {
        listDataForResponseWithPager: listDataForResponse,
        isLoadingResponse,
        totalRecord: totalRecordResponse,
        totalPage: totalPageResponse,
        hasNextPageSubject: hasNextPageResponse,
        nextPageSubject: nextPageResponse,
        isFetching: isFetchingResponse,
    } = useListResponseFromSearch(query);

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

    return (
        <main className="h-full overflow-auto">
            {(isLoadingResponse || isFetchingResponse) && <Loader className="border-primary" />}
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

                <div className={"flex-1 flex items-center justify-end"}>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecordResponse}
                        totalPages={totalPageResponse}
                        limit={20}
                        hasNextPage={hasNextPageResponse}
                        isFetching={isFetchingResponse}
                        nextPageAction={() => {
                            nextPageResponse();
                            setPageIndex((oldState) => oldState + 1);
                        }}
                        prevPageAction={() => {
                            setPageIndex((oldState) => oldState - 1);
                        }}
                    />
                </div>
            </div>
            <div className={"flex-1 overflow-y-auto"}>
                <table className={"w-full table-fixed tasks"}>
                    <tbody>
                        {(listDataForResponse[pageIndex] ?? []).map(
                            (item: any, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className={"read border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative"}
                                    >
                                        <td className={"w-[46px]"}>
                                            <div
                                                className={"flex items-center justify-center py-2"}
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="check"
                                                />
                                            </div>
                                        </td>
                                        <td className={"w-[55px]"}>
                                            <Link to={"/pcm/detail/" + item.task?._id}>
                                                <div className={"py-2"}>
                                                    <img
                                                        src={
                                                            item?.author?.image
                                                                ? `${process.env.REACT_APP_URL_S3_USER}/${item?.author?.image}`
                                                                : userIcon
                                                        }
                                                        alt={"avatar"}
                                                        className={
                                                            "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                                                        }
                                                    />
                                                </div>
                                            </Link>
                                        </td>
                                        <td className={"w-[170px]"}>
                                            <Link to={"/pcm/detail/" + item.task?._id}>
                                                <div className={"user-infor py-2"}>
                                                    <p
                                                        className={"truncate user-infor-name text-[14px]"}
                                                    >
                                                        {item.author.fullname}
                                                    </p>
                                                    <span className={"text-xs text-primary-gray py-2"}>
                                                        {item.task.related.length} liên quan
                                                    </span>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className={"w-td-dashboard"}>
                                            <Link to={"/pcm/detail/" + item.task?._id}>
                                                <p className={"task-title truncate text-[14px] mt-2"}>
                                                    {item.project?.sign}.{item.task?.name}
                                                </p>
                                                <p
                                                    className={
                                                        "crop-text truncate text-xs text-primary-gray py-2"
                                                    }
                                                >
                                                    {subContentHtml(item.content)}
                                                </p>
                                            </Link>
                                        </td>
                                        <td className={"w-[100px]"}>
                                            <div
                                                className={
                                                    "task-date whitespace-nowrap py-2 text-right pr-4"
                                                }
                                            >
                                                {showTime(item.createAt)}
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

export default PcmTagProjectPage;