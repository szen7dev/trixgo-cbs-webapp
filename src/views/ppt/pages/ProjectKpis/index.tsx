import React, { FC, useEffect, useMemo, useState } from "react";

import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

import { TableOptions, useExpanded, useTable } from "react-table";
import { TableWithoutContext } from "shareComponents/common/Table";
import classNames from "classnames";
import FilterProjectKpis from "./FilterProject";
import arrowDownIcon from "assets/images/Polygon 3.svg";
import arrowRightIcon from "assets/images/arrowRight.svg";
import defaultAva from "assets/images/image 166.jpg";
import { height } from "@mui/system";
import Chartkpis from "./Chartkpis";

const ProjectKpis: FC = () => {
    const [clickSelect, setClickSelect] = React.useState(false)
    return (
        <div className="py-4 px-3 bg-cbs-bg-gray">
            <div className="flex text-lg mb-5">
                <a href="" className="mr-[60px]">
                    <div className="flex gap-2 font-bold text-primary-gray">
                        <span>Tổng quan</span> <img src={arrowDownIcon} alt="" />
                    </div>
                </a>
            </div>
            <div className="flex gap-2 mb-3.5">
                <div className="w-[200px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo năm <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />2022</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />2022</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />2022</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />2022</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
                <div className="w-550 bg-white border-0.5 border-cbs-border rounded-md">
                    {/* biểu đồ */}
                    <Chartkpis />
                </div>
                <div className="w-[350px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm">Theo dự án <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input type="checkbox" className="mr-2" />Nhà ở thương mại cho chiến sỹ
                            </div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input type="checkbox" className="mr-2" />Nhà ở thương mại cho chiến sỹ
                            </div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input type="checkbox" className="mr-2" />Nhà ở thương mại cho chiến sỹ
                            </div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate ">
                                <input type="checkbox" className="mr-2" />Nhà ở thương mại cho chiến sỹ
                            </div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
                <div className="w-[350px] bg-white py-3.5 px-4  border-0.5 border-cbs-border rounded-md">
                    <div className=" font-bold text-sm	">Theo phòng ban <span>(16)</span></div>
                    <div className="overflow-y-auto" style={{ height: "140px" }}>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Phòng kiến trúc 1</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Phòng kiến trúc 1</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Phòng kiến trúc 1</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between pt-2">
                            <div className="text-cbs-subtext truncate "><input type="checkbox" className="mr-2" />Phòng kiến trúc 1</div>
                            <div className="bg-cbs-gray rounded-lg px-2">100.000.000</div>
                        </div>
                        <div className="flex gap-2 justify-between px-3 pt-2">
                            <a href="" className="text-cbs-subtext">Xem thêm <span>(12)</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <FilterProjectKpis />
            </div>
        </div>
    );
};

export default ProjectKpis;
