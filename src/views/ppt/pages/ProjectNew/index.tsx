import React,{ FC, useEffect, useMemo, useState } from "react";

import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

import { TableOptions, useExpanded, useTable } from "react-table";
import { TableWithoutContext } from "shareComponents/common/Table";
import classNames from "classnames";
import FilterProjectNew from "./FilterProjectNew";
import arrowDownIcon from "assets/images/Polygon 3.svg";
import arrowRightIcon from "assets/images/arrowRight.svg";
import defaultAva from "assets/images/image 166.jpg";
import { height } from "@mui/system";

const ProjectNew: FC = () => {
    const [clickSelect, setClickSelect] = React.useState(false)
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
                        <img src={defaultAva} alt="" className="rounded-full" />
                        <span className="font-bold text-sm">Việc của tôi</span>
                    </div>
                    <div className="text-xs	">
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Tổng</div>
                            <div className="bg-cbs-primary rounded-lg px-2 text-white">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Quan trọng</div>
                            <div className="bg-cbs-purple rounded-lg px-2 text-white">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Quá hạn</div>
                            <div className="bg-cbs-schedule-expired rounded-lg px-2 text-white">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Tuần tới</div>
                            <div className="bg-cbs-schedule-nextweek rounded-lg px-2 text-white">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Sau tuần tới</div>
                            <div className="bg-cbs-schedule-after-7days rounded-lg px-2 text-white">100</div>
                        </div>
                    </div>
                </div>
                <div className="w-[250px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo đơn vị giao việc <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo người giao việc <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a className="cursor-pointer" onClick={() => setClickSelect(!clickSelect)}>
                            <div className="flex gap-2">
                                <img src={defaultAva} 
                                className={"w-[20px] h-[20px] rounded-full border-0.5 "+(clickSelect ? "border-cbs-primary" : "border-white") }
                                />
                                <span className="text-cbs-subtext"> Phạm Thế Trường-FCT</span>
                            </div>
                            </a>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a className="cursor-pointer" onClick={() => setClickSelect(!clickSelect)}>
                            <div className="flex gap-2">
                                <img src={defaultAva} 
                                className={"w-[20px] h-[20px] rounded-full border-0.5 "+(clickSelect ? "border-cbs-primary" : "border-white") }
                                />
                                <span  className="text-cbs-subtext"> Phạm Thế Trường-FCT</span>
                            </div>
                            </a>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a className="cursor-pointer" onClick={() => setClickSelect(!clickSelect)}>
                            <div className="flex gap-2">
                                <img src={defaultAva} 
                                className={"w-[20px] h-[20px] rounded-full border-0.5 "+(clickSelect ? "border-cbs-primary" : "border-white") }
                                />
                                <span  className="text-cbs-subtext"> Phạm Thế Trường-FCT</span>
                            </div>
                            </a>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a className="cursor-pointer" onClick={() => setClickSelect(!clickSelect)}>
                            <div className="flex gap-2">
                                <img src={defaultAva} 
                                className={"w-[20px] h-[20px] rounded-full border-0.5 "+(clickSelect ? "border-cbs-primary" : "border-white") }
                                />
                                <span  className="text-cbs-subtext"> Phạm Thế Trường-FCT</span>
                            </div>
                            </a>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>

                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href=""  className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo dự án <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT.P3-Chung cư FPT Plaza 2</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT.P3-Chung cư FPT Plaza 2 P3-Chung cư FPT Plaza 2</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT.P3-Chung cư FPT Plaza 2 P3-Chung cư FPT Plaza 2</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />FCT.P3-Chung cư FPT Plaza 2 P3-Chung cư FPT Plaza 2</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
                <div className="w-[250px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm	">Theo tính chất <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Việc thông thường</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Việc thông thường</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Việc thông thường</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Việc thông thường</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <FilterProjectNew />
            </div>
        </div>
    );
};

export default ProjectNew;
