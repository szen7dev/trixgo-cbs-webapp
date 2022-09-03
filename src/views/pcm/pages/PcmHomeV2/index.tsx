import React, { FC, useCallback } from "react";
import {DropdownSearchable, DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import moment from "moment";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";

// import userIcon from "assets/images/icon-user-avatar.svg";
// import maleUserIcon from "assets/images/icons8-male-user-64.svg";
// import TriangleDown from "assets/icons/TriangleDown";
// import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
// import projectIcon from "assets/images/icons8-project-50.svg";
// import timeTableIcon from "assets/images/icons8-timetable-48.svg";
// import categoryIcon from "assets/images/icons8-category-48.svg";
// import downloadIcon from "assets/images/icons8-download-64.svg";
// import sendMailIcon from "assets/images/icons8-send-email-96.svg";
import nextIcon from "assets/images/icons-arrow-next.svg";
// import userAvt from "assets/images/task-user.svg";

import {PcmHomeTab1} from "./components/PcmHomeTab1";
import {PcmHomeTab2} from "./components/PcmHomeTab2";
import {PcmHomeTab3} from "./components/PcmHomeTab3";
import {PcmHomeTab4} from "./components/PcmHomeTab4";
import {PcmHomeTab5} from "./components/PcmHomeTab5";
import {PcmHomeTab6} from "./components/PcmHomeTab6";
import {PcmHomeTab7} from "./components/PcmHomeTab7";
import {PcmHomeTab8} from "./components/PcmHomeTab8";

import { useTask } from "services/hooks/useTask";

type Props = {
    type?: number,
    subtype?: number,
    option?: number,
    draft?: number
}

const PcmHomeV2: FC<Props> = ({ type = 1, subtype, option, draft }) => {

    // Khai báo active Tab
    const { tab } = useParams<{ tab: string}>();
    // console.log({tab})
    // console.log({option})
    console.log({draft})

    const getStatusValue = (tab?: any) => {
        switch(tab) {
            case '2':
                return 1;

            case '3':
                return 2;

            case '4':
                return 3;

            case '5':
                return 4;
            
          default:
            return 0;
        }
    }

    const typeStatus = getStatusValue(tab)
    // console.log({typeStatus})

    /**
     * Danh sách công việc của tôi (type=1)
     * - Trạng thái chưa hoàn thành
     */
    const {
        listTasks,
        totalRecord,
        nextPageListTask: nextPageTaskOutDate,
    } = useTask({
        params: {
            type, draft, subtype, typeStatus, statusNe: "3", isSortChildTask: "1",
        },
        isFetch: true
    });

    const subContentHtml = (html?: string) => {
        const removeHtmlTag = parse(
          (html || "").replace(/<[^>]*>?/gm, " ")
        ).toString();
    
        const result =
          removeHtmlTag.length > 75
            ? `${removeHtmlTag.slice(0, 75)}...`
            : removeHtmlTag;
        return result;
      };

    return (
        <div className={"task-home"}>
            <div className={"filter-bar flex flex-wrap px-4 py-2"}></div>

            <div className={"header-table flex px-4 w-full top-0 bg-white pb-4 flex-wrap"}>
                <div className={"border-0.5 border-primary-border flex items-center"}>
                    {
                        option == 1 &&
                        <PcmHomeTab1 tab={tab}/>
                    }
                    {
                        option == 2 &&
                        <PcmHomeTab2 tab={tab}/>
                    }
                    {
                        option == 3 &&
                        <PcmHomeTab3 tab={tab}/>
                    }
                    {
                        option == 4 &&
                        <PcmHomeTab4 tab={tab}/>
                    }
                    {
                        option == 5 &&
                        <PcmHomeTab5 tab={tab}/>
                    }
                    {
                        option == 6 &&
                        <PcmHomeTab6 tab={tab}/>
                    }
                    {
                        option == 7 &&
                        <PcmHomeTab7 tab={tab}/>
                    }
                    {
                        option == 8 &&
                        <PcmHomeTab8 tab={tab}/>
                    }
                </div>
                {/* <button className={"flex items-center justify-center mx-3"}>
                    <img src={downloadIcon} alt={"-----"}/>
                </button> */}
                {/* <button className={"flex items-center justify-center mx-3"}>
                    <img src={sendMailIcon} alt={"-----"}/>
                </button> */}
                <div className={"flex-1 flex items-center justify-end"}>
                    {/* <DropdownSearchable
                        showTriangle={true}
                        className={"border-0.5 border-primary-border rounded-full mr-2"}
                        placeholder={"Lọc theo đơn vị giao việc"}
                    /> */}
                    <span className={"text-primary-gray"}>1-20 trong số {totalRecord}</span>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                        <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                    </button>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                        <img src={nextIcon} alt={"----"}/>
                    </button>
                </div>
            </div>

            <div className={"table-task-sheet"}>
                <table className={"w-full table-fixed tasks border-collapse"}>

                    <thead className={"bg-cbs-table-header sticky top-0 z-10"}>
                        <th className={"w-[46px]"}>
                            <div className={"flex items-center justify-center py-3"}>
                                <input className="form-check-input" type="checkbox" value="" id="check"/>
                            </div>
                        </th>
                        <th className={"w-4/12"}>
                            Nội dung công việc
                        </th>
                        <th className={"w-1/12"}>
                            Thời hạn
                        </th>
                        <th className={"w-2/12"}>
                           Thực hiện
                        </th>
                        <th className={"w-1/12"}>
                            Tiến trình
                        </th>
                        <th className={""}>
                            Mô tả
                        </th>
                    </thead>

                    <tbody>
                        {listTasks?.map((item: any) => {
                            return (

                                <tr key={item._id}>
                                    <td>
                                        <div className={"flex items-center justify-center py-3"}>
                                            <input className="form-check-input" type="checkbox" value="" id="check"/>
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
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${item.assignee.image}`} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                            <div className={"ml-2"}>{item.assignee.fullname ?? item.assignee.fullname}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={"mb-1 text-right text-secondary-gray"}>{item.percentage}%</p>
                                        <div className={"relative w-full h-[4px] rounded-full border-0.5 border-primary-border bg-cbs-task-assign-progress-bg"}>
                                            <div className={"absolute h-full left-0 top-0 bg-cbs-schedule-expired"} style={{width: `${item.percentage}%`}}></div>
                                        </div>
                                    </td>
                                    <td>
                                        {subContentHtml(item.description)}
                                    </td>
                                </tr>
                            )
                        })
                        }
                        
                        {/* <tr>
                            <td>
                                <div className={"flex items-center justify-center py-3"}>
                                    <input className="form-check-input" type="checkbox" value="" id="check"/>
                                </div>
                            </td>
                            <td>
                                PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI
                            </td>
                            <td>
                                05/11/2021
                            </td>
                            <td>
                                <div className={"flex items-center"}>
                                    <img src={userAvt} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                    <div className={"ml-2"}>Nguyễn Phan Thanh Hương-CPMI</div>
                                </div>
                            </td>
                            <td>
                                <p className={"mb-1 text-right text-secondary-gray"}>30%</p>
                                <div className={"relative w-full h-[4px] rounded-full border-0.5 border-primary-border bg-cbs-task-assign-progress-bg"}>
                                    <div className={"absolute h-full left-0 top-0 bg-cbs-schedule-expired"} style={{width: "30%"}}></div>
                                </div>
                            </td>
                            <td>
                                Gửi Hiệp, Như đã trao đổi qua điện thoại, anh Kiên/ Tùng-Bạn anh Dương số điện thoại 0989771930 có t..
                            </td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PcmHomeV2;