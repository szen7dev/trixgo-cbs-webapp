import React, {FC} from "react";
import businessBuilding from "assets/images/icons8-business-building-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96.svg";
import {DropdownSearchableV2} from "shareComponents/common";
import nextIcon from "assets/images/icons-arrow-next.svg";
import userAvatar from "assets/images/task-user.svg";

const ProjectDirectoryPageV2:FC = () => {
    return (
        <div className={"project-directory"}>
            <div className={"flex px-4 py-2 items-center justify-between"}>
                <DropdownSearchableV2
                    className={"mr-4 border border-primary-border rounded-lg mb-2"}
                    placeholder={"Đơn vị"}
                    showTriangle={true}
                    data={[]}
                    prefixIcon={<img className={"mr-2"} src={businessBuilding} alt={"icon"}/>}
                />
                <button className={"bg-cbs-green rounded h-[32px] px-4 text-white font-bold"}>
                    Tạo mới
                </button>
            </div>
            <div className={"flex items-center mt-2"}>
                <div className={"flex items-center"}>
                    <button className={"mx-4"}>
                        <img src={downloadIcon} alt={"----"} className={"w-[18px] h-[18px] min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]"}/>
                    </button>
                    <button className={"mx-4"}>
                        <img src={pencilIcon} alt={"----"} className={"w-[18px] h-[18px] min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px]"}/>
                    </button>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                        <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                    </button>
                    <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                        <img src={nextIcon} alt={"----"}/>
                    </button>
                </div>
            </div>

            <div className={"table-project-directory mt-2"}>
                <table className={"w-full table-fixed tasks border-collapse"}>
                    <thead className={"bg-cbs-table-header sticky top-0 z-10"}>
                        <tr>
                            <th className={"w-[46px] border-0.5 border-primary-border px-2"}>
                                <div className={"flex items-center justify-center py-3"}>
                                    <input className="form-check-input" type="checkbox" value="" id="check"/>
                                </div>
                            </th>
                            <th className={"w-3/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Họ và tên
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Đơn vị
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Chức vụ trong dự án
                            </th>
                            <th className={"w-1/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Điện thoại
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Email
                            </th>
                            <th className={"w-2/12 font-normal text-left border-0.5 border-primary-border px-2"}>
                                Ghi chú
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(12)].map((e,i) => (
                            <tr key={i}>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <div className={"flex items-center justify-center py-3"}>
                                        <input className="form-check-input" type="checkbox" value="" id="check"/>
                                    </div>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <div className={"flex items-center py-2"}>
                                        <img src={userAvatar} alt={"---"} className={"w-[40px] h-[40px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full overflow-hidden"}/>
                                        <p className={"ml-2"}>Nguyễn Phan Thanh Hương-CPMI</p>
                                    </div>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        Trưởng ban QLDA
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p className={"truncate"}>
                                        0988115997
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p className={"break-words "}>
                                        thaison@conincopmi.com
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border px-2 align-middle"}>
                                    <p>
                                        Khóa
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectDirectoryPageV2;