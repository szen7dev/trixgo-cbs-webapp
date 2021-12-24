import React, {FC} from "react";
import {useLocation} from "react-router-dom";
import TaskDashboardNavigation from "../../../layouts/TaskDashboardNavigation";
import TriangleDown from "assets/icons/TriangleDown";

const TaskDashboardType2:FC = () => {
    const location = useLocation();
    const { pathname } = location;
    const paths = pathname.split("/");
    const page = paths[paths.length-1];
    console.log(page)
    return (
        <div className={"tasks-dashboard-table"}>
            <div className={"relative table border-separate w-full"}>
                <div className={"header flex table-row sticky z-2 top-0"}>
                    <div className={"px-2 sticky z-2 left-0 top-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                            <TriangleDown/>
                            <div className={"w-[1px] h-[25px] bg-gray-300 ml-3"}/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-2 left-70px top-0 table-cell box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        Nhân sự
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        MAR.HAR.Court Yard By OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        CHG.THT.Trường trung học OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        CHG.THT.Trường trung học OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                    <div className={"px-2 sticky z-1 top-0 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        ARM.CAL.Calla Apartment OMG
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
                <div className={"row flex table-row"}>
                    <div className={"px-2 sticky z-1 left-0 table-cell box-border border-b border-r-0 border-l leading-[40px] min-w-[70px] max-w-[70px] truncate bg-cbs-light-blue border-gray-300 align-middle bg-gray-100"}>
                        <div className={"flex items-center"}>
                            <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div className={"px-2 sticky z-1 left-70px table-cell bg-cbs-light-blue box-border border-b border-r border-l-0 leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle"}>
                        Phan Văn Trường-PGI
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white"}>
                        <div className={"flex items-center justify-around"}>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-negative mr-1"}></div>
                                <span>8</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-warning mr-1"}></div>
                                <span>13</span>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"w-[8px] h-[8px] rounded-full bg-positive mr-1"}></div>
                                <span>41</span>
                            </div>
                        </div>
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                    <div className={"px-2 table-cell box-border border-b border-r leading-[40px] min-w-[200px] max-w-[200px] truncate border-gray-300 align-middle bg-white text-primary text-center"}>
                        62
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDashboardType2;
