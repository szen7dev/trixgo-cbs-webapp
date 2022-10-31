import React,{ FC, useEffect, useMemo, useState } from "react";
import FilterProjectNew from "./FilterProjectNew";
import arrowDownIcon from "assets/images/Polygon 3.svg";
import arrowRightIcon from "assets/images/arrowRight.svg";
import defaultAva from "assets/images/image 166.jpg";
import { usePcmPlanTaskNotification, usePcmDynamicReport } from "services/hooks/pcm/usePcmDashboardV2";
import { useAuth } from "services/hooks/auth/useAuth";
import { PCM_PROPOSAL_TASK } from 'apis/localdb';

const ProjectNew: FC = () => {
  const { user } = useAuth();
    const [clickSelect, setClickSelect] = React.useState(false);
    const { data } = usePcmPlanTaskNotification({ enabled: true });
    const {dataForCompanies, dataForAuthors, dataForProject, dataForProposal } = usePcmDynamicReport();
    const dataMyTask = data?.data;
    const listDataCompany = dataForCompanies?.data?.listDataCompany || [];
    const listDataUser = dataForAuthors?.data?.listDataUser || [];
    const listDataProject = dataForProject?.data?.listDataProject || [];
    const listDataSubtype = dataForProposal?.data?.listDataSubtype || [];

    return (
        <div className="py-4 px-3 bg-cbs-bg-gray	">
            <div className="flex text-lg mb-5">
                <a href="" className="mr-[60px]">
                    <div className="flex gap-2 font-bold text-primary-gray">
                        <span>Tổng quan</span> <img src={arrowDownIcon} alt="" />
                    </div>
                </a>
                <a href="" className="mr-[60px]">
                    <div className="flex gap-2 font-bold text-primary-gray">
                        <span>Tổng quan</span> <img src={arrowRightIcon} alt="" />
                    </div>
                </a>
            </div>
            <div className="flex gap-2 mb-3.5">
                <div className="w-[250px] bg-white py-1 px-2 border-0.5 border-cbs-border rounded-md">
                    <div className="flex items-center gap-2 pb-1">
                        <img src={`${process.env.REACT_APP_URL_S3_USER}/${user?.image}`} alt="" className="w-8 h-8 rounded-full" />
                        <span className="font-bold text-sm">Việc của tôi</span>
                    </div>
                    <div className="text-xs	">
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Tổng</div>
                            <div className="bg-cbs-primary rounded-lg px-2 text-white">
                            {(dataMyTask?.amountMyTask1 || 0) + (dataMyTask?.amountMyTask2 || 0) + (dataMyTask?.amountMyTask3 || 0)}
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Quan trọng</div>
                            <div className="bg-cbs-purple rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask4 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Quá hạn</div>
                            <div className="bg-cbs-schedule-expired rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask1 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Tuần tới</div>
                            <div className="bg-cbs-schedule-nextweek rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask2 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Sau tuần tới</div>
                            <div className="bg-cbs-schedule-after-7days rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask3 || 0)}</div>
                        </div>
                    </div>
                </div>
                <div className="w-[250px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo đơn vị giao việc <span>({listDataCompany.length})</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        {listDataCompany.map((item: any, index: number) => {
                            if (!item?._id?.companyOfAuthor?.sign) return (
                                <div key={index}></div>
                            )
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />{item?._id?.companyOfAuthor?.sign}</div>
                                <div className="bg-cbs-gray rounded-lg px-2">{item.amount}</div>
                            </div>
                            )
                        })
                        }
                        {/* <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div> */}
                    </div>
                </div>
                <div className="w-[300px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo người giao việc <span>({listDataUser.length})</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        {listDataUser.map((item: any, index: number) => {
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                    <a className="cursor-pointer" onClick={() => setClickSelect(!clickSelect)}>
                                        <div className="flex gap-2">
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${item?._id?.author?.image}`}
                                                className={"w-[20px] h-[20px] rounded-full border-0.5 " + (clickSelect ? "border-cbs-primary" : "border-white")}
                                            />
                                            <span className="text-cbs-subtext"> {item?._id?.author?.fullname}</span>
                                        </div>
                                    </a>
                                    <div className="bg-cbs-gray rounded-lg px-2">{item?.amount}</div>
                                </div>
                            )
                        })
                        }

                        {/* <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href=""  className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div> */}
                    </div>
                </div>
                <div className="w-[300px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo dự án <span>({listDataProject.length})</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        {listDataProject.map((item: any, index: number) => (
                            <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />
                                {item?._id?.project?.sign}.{item?._id?.project?.name}
                                </div>
                                <div className="bg-cbs-gray rounded-lg px-2">{item?.amount}</div>
                            </div>
                        ))
                        }
{/*                       
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div> */}
                    </div>
                </div>
                <div className="w-[250px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm	">Theo tính chất <span>({listDataSubtype.length})</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                       {listDataSubtype.map((item: any, index: number) => (
                        <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />{PCM_PROPOSAL_TASK[item._id?.subtype]?.text}</div>
                            <div className="bg-cbs-gray rounded-lg px-2">{item?.amount}</div>
                        </div>
                       ))
                       }
                        {/* <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div>
                <FilterProjectNew   
                />
            </div>
        </div>
    );
};

export default ProjectNew;
