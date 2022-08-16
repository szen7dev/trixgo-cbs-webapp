import React, {FC, useRef, useState} from "react"
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import Close from "assets/icons/Close";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";

export const SubtaskItem:FC = () => {
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowOption(false));
    return (
        <div className={"flex items-start justify-between mt-4"}>
            <input checked className="form-check-input" type="checkbox" value="" id="check"/>
            <div className={"mx-2"}>
                <p>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
            </div>
            <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-2"}>
                <img src={iconClock} alt={"----"} className={"mr-2"}/>
                <span>17/2/22</span>
            </div>
            <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mr-2"}/>
            <div ref={wrapperClass} className={"relative inline-block"}>
                <button onClick={() => setShowOption(!showOption)} className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                    <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                </button>
                {
                    showOption &&
                    <div className={"absolute left-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                        <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                            <div className={"flex-1"}>Thao tác</div>
                            <button onClick={() => setShowOption(false)}>
                                <Close/>
                            </button>
                        </div>

                        <div className={"mb-4"}>
                            <button
                                className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                            >
                                Cập nhật thời hạn
                            </button>
                            <button
                                className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                            >
                                Cập nhật trạng thái
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}