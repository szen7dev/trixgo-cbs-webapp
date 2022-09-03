import React, {FC, useRef, useState} from "react";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import { Link } from 'react-router-dom';
import { Task } from "typings/task";

type Props = {
    task: Task;
}

export const OtherActions:FC<Props> = ({ task }) => {
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowOption(false));
    return (
        <div ref={wrapperClass} className={"relative z-5 inline-block"}>
            <button onClick={() => setShowOption(!showOption)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                <DotsVerticalIcon/>
            </button>
            {
                showOption &&
                <div className={"absolute right-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>Chức năng khác</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>

                    <div className={"mb-4"}>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Di chuyển tới việc cha
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Di chuyển tới nhóm dữ liệu
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán tính chất
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán phân loại cột mốc
                        </button>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            Gán hợp đồng
                        </button>
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/1`}
                        >
                            In ấn - Mẫu biên bản họp
                        </Link>
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/2`}
                        >
                            In ấn - Mẫu báo cáo
                        </Link>
                        <Link
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header block"}
                            to={`/pcm/detail/${task._id}/print/3`}
                        >
                            In ấn - Mẫu phụ lục ảnh
                        </Link>
                        <button
                            className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                        >
                            In ấn - Yêu cầu, đệ trình
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}