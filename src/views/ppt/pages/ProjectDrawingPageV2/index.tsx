import React, {FC} from "react";
import nextIcon from "assets/images/icons-arrow-next.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import userAvatar from "assets/images/task-user.svg";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import drawingIcon from "assets/images/icons8-google-drawing-100.svg";

const ProjectDrawingPageV2:FC = () => {
    return (
        <div className={"project-drawing"}>
            <div className={"nav-drawing flex items-center text-lg p-4 text-primary-gray"}>
                <span>Bản vẽ công trình</span>
                <img src={nextIcon} alt={"-----"} className={"mx-4 h-[12px] w-[12px]"}/>
                <span>Bản vẽ phần ngầm</span>
                <button className={"ml-6"}>
                    <img src={downloadIcon} alt={"-----"} className={"h-[24px] w-[24px]"}/>
                </button>
            </div>

            <div className={"project-drawing-table"}>
                <table className={"w-full table-fixed tasks border-collapse"}>
                    <thead className={"sticky bg-white top-0 z-10"}>
                        <tr>
                            <th className={"w-5/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Tên
                            </th>
                            <th className={"w-3/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Người tạo
                            </th>
                            <th className={"w-2/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Cập nhật lần cuối
                            </th>
                            <th className={"w-2/12 px-4 py-2 text-left font-normal text-primary-gray border-b-0.5 border-primary-border"}>
                                Dung lượng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...Array(12)].map((e, i) => (
                                <tr key={i}>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                        <div className={"flex items-center"}>
                                            <img src={drawingIcon} alt={"----"} className={"w-[24px] h-[24px]"}/>
                                            <p className={"ml-4"}>Bản vẽ kết cấu xây dựng phần ngầm</p>
                                        </div>
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border align-middle"}>
                                        <div className={"flex items-center"}>
                                            <img src={userAvatar} alt={"----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
                                            <p className={"ml-4"}>Nguyễn Phan Thanh Hương-CPMI</p>
                                        </div>
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                        15:30 22/12/2012 (2 day ago)
                                    </td>
                                    <td className={"px-4 py-2 text-left border-b-0.5 border-primary-border text-primary-gray align-middle"}>
                                        11,6 MB
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectDrawingPageV2;