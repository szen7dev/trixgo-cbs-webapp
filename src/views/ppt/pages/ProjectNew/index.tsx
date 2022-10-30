import React, { FC, useEffect, useMemo, useState } from "react";
import FilterProjectNew from "./FilterProjectNew";
import arrowDownIcon from "assets/images/Polygon 3.svg";
import arrowRightIcon from "assets/images/arrowRight.svg";
import defaultAva from "assets/images/image 166.jpg";
import { usePcmPlanTaskNotification, usePcmDynamicReport } from "services/hooks/pcm/usePcmDashboardV2";
import { useAuth } from "services/hooks/auth/useAuth";
import { PCM_PROPOSAL_TASK } from 'apis/localdb';
import { useAppSelector } from "redux/reducer";
import { useDispatch } from "react-redux";
import { setQueryPcmMine } from "redux/reducer/DashboardV2Slice";
import moment from "moment";

const ProjectNew: FC = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [clickSelect, setClickSelect] = React.useState(false);
    const { data } = usePcmPlanTaskNotification({ enabled: true });
    const { dataForCompanies, dataForAuthors, dataForProject, dataForProposal } = usePcmDynamicReport();
    const dataMyTask = data?.data;
    const listDataCompany = dataForCompanies?.data?.listDataCompany || [];
    const listDataUser = dataForAuthors?.data?.listDataUser || [];
    const listDataProject = dataForProject?.data?.listDataProject || [];
    const listDataSubtype = dataForProposal?.data?.listDataSubtype || [];

    const companiesOfAuthor = useAppSelector(state => state.dashboardV2.data.pcmMine.companiesOfAuthor);
    const authorsID = useAppSelector(state => state.dashboardV2.data.pcmMine.authorsID);
    const projectsID = useAppSelector(state => state.dashboardV2.data.pcmMine.projectsID);
    const subtypes = useAppSelector(state => state.dashboardV2.data.pcmMine.subtypes);
    const priority = useAppSelector(state => state.dashboardV2.data.pcmMine.priority);
    const isExpired = useAppSelector(state => state.dashboardV2.data.pcmMine.isExpired);
    const toDate = useAppSelector(state => state.dashboardV2.data.pcmMine.toDate);

    return (
        <div className="py-4 px-3 bg-cbs-bg-gray h-full	">
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
                            <div className="text-cbs-subtext truncate ">
                                <input
                                    type="checkbox"
                                    checked={priority === "3"}
                                    onChange={(value) => {
                                        if (value.target.checked) {
                                            dispatch(setQueryPcmMine({ key: "priority", data: "3" }))
                                        } else {
                                            dispatch(setQueryPcmMine({ key: "priority", data: "0" }))
                                        }
                                    }}
                                    className="mr-2" />
                                Quan trọng</div>
                            <div className="bg-cbs-purple rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask4 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input
                                    type="checkbox"
                                    checked={isExpired === "1"}
                                    onChange={(value) => {
                                        if (value.target.checked) {
                                            dispatch(setQueryPcmMine({ key: "isExpired", data: "1" }))
                                        } else {
                                            dispatch(setQueryPcmMine({ key: "isExpired", data: "0" }))
                                        }
                                    }}
                                    className="mr-2" />
                                Quá hạn</div>
                            <div className="bg-cbs-schedule-expired rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask1 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input
                                    type="checkbox"
                                    checked={toDate === moment().add(7, "days").format("YYYY-MM-DD 23:59")}
                                    onChange={(value) => {
                                        if (value.target.checked) {
                                            dispatch(setQueryPcmMine({ key: "fromDate", data: moment().format("YYYY-MM-DD 00:00") }))
                                            dispatch(setQueryPcmMine({ key: "toDate", data: moment().add(7, "days").format("YYYY-MM-DD 23:59") }))
                                        } else {
                                            dispatch(setQueryPcmMine({ key: "fromDate", data: "" }))
                                            dispatch(setQueryPcmMine({ key: "toDate", data: "" }))
                                        }
                                    }}
                                    className="mr-2" />
                                Tuần tới</div>
                            <div className="bg-cbs-schedule-nextweek rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask2 || 0)}</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input
                                    type="checkbox"
                                    checked={toDate === moment().add(365, "days").format("YYYY-MM-DD 23:59")}
                                    onChange={(value) => {
                                        if (value.target.checked) {
                                            dispatch(setQueryPcmMine({ key: "fromDate", data: moment().add(8, "days").format("YYYY-MM-DD 00:00") }))
                                            dispatch(setQueryPcmMine({ key: "toDate", data: moment().add(365, "days").format("YYYY-MM-DD 23:59") }))
                                        } else {
                                            dispatch(setQueryPcmMine({ key: "fromDate", data: "" }))
                                            dispatch(setQueryPcmMine({ key: "toDate", data: "" }))
                                        }
                                    }}
                                    className="mr-2" />
                                Sau tuần tới</div>
                            <div className="bg-cbs-schedule-after-7days rounded-lg px-2 text-white">{(dataMyTask?.amountMyTask3 || 0)}</div>
                        </div>
                    </div>
                </div>
                <div className="w-[250px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo đơn vị giao việc <span>({listDataCompany.length})</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        {listDataCompany.map((item: any, index: number) => {
                            const selected = companiesOfAuthor.find((e: any) => e.id === item?._id?.companyOfAuthor?._id) ? true : false;
                            if (!item?._id?.companyOfAuthor?.sign) return (
                                <div key={index}></div>
                            )
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                    <div className="text-cbs-subtext truncate ">
                                        <input
                                            checked={selected}
                                            onChange={(value) => {
                                                if (value.target.checked) {
                                                    const cloneIDs: any = [...companiesOfAuthor];
                                                    cloneIDs.push({
                                                        label: `${item?._id?.companyOfAuthor?.sign}.${item?._id?.companyOfAuthor?.name} (${item.amount})`,
                                                        id: item?._id?.companyOfAuthor?._id,
                                                    });
                                                    dispatch(setQueryPcmMine({ key: "companiesOfAuthor", data: cloneIDs }))
                                                } else {
                                                    const cloneIDs = [...companiesOfAuthor];
                                                    const newList = cloneIDs.filter(selectId => selectId.id !== item?._id?.companyOfAuthor?._id);
                                                    dispatch(setQueryPcmMine({ key: "companiesOfAuthor", data: newList }))
                                                }
                                            }}
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        {item?._id?.companyOfAuthor?.sign}
                                    </div>
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
                            const selected = authorsID.find((e: any) => e.id === item?._id?.author?._id) ? true : false;
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                    <button className="cursor-pointer" onClick={() => {
                                        if (!selected) {
                                            const cloneIDs: any = [...authorsID];
                                            cloneIDs.push({
                                                label: `${item?._id?.author?.fullname} (${item.amount})`,
                                                id: item?._id?.author?._id,
                                            });
                                            dispatch(setQueryPcmMine({ key: "authorsID", data: cloneIDs }))
                                        } else {
                                            const cloneIDs = [...authorsID];
                                            const newList = cloneIDs.filter(selectId => selectId.id !== item?._id?.author?._id);
                                            dispatch(setQueryPcmMine({ key: "authorsID", data: newList }))
                                        }
                                    }}>
                                        <div className="flex gap-2">
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${item?._id?.author?.image}`}
                                                className={"w-[20px] h-[20px] rounded-full border-2 " + (selected ? "border-cbs-primary" : "border-white")}
                                            />
                                            <span className="text-cbs-subtext"> {item?._id?.author?.fullname}</span>
                                        </div>
                                    </button>
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
                        {listDataProject.map((item: any, index: number) => {
                            const selected = projectsID.find((e: any) => e.id === item?._id?.project?._id) ? true : false;
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                    <div className="text-cbs-subtext truncate ">
                                        <input
                                            checked={selected}
                                            onChange={(value) => {
                                                if (value.target.checked) {
                                                    const cloneIDs: any = [...projectsID];
                                                    cloneIDs.push({
                                                        label: `${item?._id?.project?.sign}.${item?._id?.project?.name} (${item.amount})`,
                                                        id: item?._id?.project?._id,
                                                    });
                                                    dispatch(setQueryPcmMine({ key: "projectsID", data: cloneIDs }))
                                                } else {
                                                    const cloneIDs = [...projectsID];
                                                    const newList = cloneIDs.filter(selectId => selectId.id !== item?._id?.project?._id);
                                                    dispatch(setQueryPcmMine({ key: "projectsID", data: newList }))
                                                }
                                            }}
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        {item?._id?.project?.sign}.{item?._id?.project?.name}
                                    </div>
                                    <div className="bg-cbs-gray rounded-lg px-2">{item?.amount}</div>
                                </div>
                            )
                        })
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
                        {listDataSubtype.map((item: any, index: number) => {
                            const selected = subtypes.find((e: any) => e.id === item?._id?.subtype) ? true : false;
                            return (
                                <div className="flex gap-2 justify-between px-3 pt-2" key={index}>
                                    <div className="text-cbs-subtext truncate ">
                                        <input
                                            checked={selected}
                                            onChange={(value) => {
                                                if (value.target.checked) {
                                                    const cloneIDs: any = [...subtypes];
                                                    cloneIDs.push({
                                                        label: `${PCM_PROPOSAL_TASK[item?._id?.subtype]?.text} (${item.amount})`,
                                                        id: item?._id?.subtype,
                                                    });
                                                    dispatch(setQueryPcmMine({ key: "subtypes", data: cloneIDs }))
                                                } else {
                                                    const cloneIDs = [...subtypes];
                                                    const newList = cloneIDs.filter(selectId => selectId.id !== item?._id?.subtype);
                                                    dispatch(setQueryPcmMine({ key: "subtypes", data: newList }))
                                                }
                                            }}
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        {PCM_PROPOSAL_TASK[item._id?.subtype]?.text}</div>
                                    <div className="bg-cbs-gray rounded-lg px-2">{item?.amount}</div>
                                </div>
                            )
                        })
                        }
                        {/* <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div>
                <FilterProjectNew
                    listDataCompany={listDataCompany}
                    listDataUser={listDataUser}
                    listDataProject={listDataProject}
                    listDataSubtype={listDataSubtype}
                />
            </div>
        </div>
    );
};

export default ProjectNew;
