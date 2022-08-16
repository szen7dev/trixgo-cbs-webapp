import React, {FC} from "react";
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";

export const ReleatedTaskItem:FC = () => {
    return (
        <div className={"flex items-start justify-between mt-4"}>
            <input checked className="form-check-input" type="checkbox" value="" id="check"/>
            <div className={"mx-2"}>
                <p className={"text-base"}>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
            </div>
            <div className={"flex items-center"}>
                <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-6"}>
                    <img src={iconClock} alt={"----"} className={"mr-2"}/>
                    <span>17/2/22</span>
                </div>
                <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-2"}/>
                <button className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                    <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                </button>
            </div>
        </div>
    )
}