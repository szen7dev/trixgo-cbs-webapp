import React, {FC} from "react";
import iconTickBox from "assets/images/icons8-tick-box-48.svg";
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import iconMessageLink from "assets/images/icons8-message-link-48.svg";

export const TaskDetailRelatedTask:FC = () => {
    return (
        <div className={"subtask mt-8 w-9/12"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center"}>
                    <img src={iconMessageLink} alt={'-----'} className={"mr-4"}/>
                    <span className={"text-primary-gray text-lg font-bold"}>
                        Việc liên quan
                    </span>
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                <div className={"flex items-start justify-between mt-4"}>
                    <input checked className="form-check-input" type="checkbox" value="" id="check"/>
                    <div className={"mx-2"}>
                        <p>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                        <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
                    </div>
                    <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-6"}>
                        <img src={iconClock} alt={"----"} className={"mr-2"}/>
                        <span>17/2/22</span>
                    </div>
                    <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-2"}/>
                    <button className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                        <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                    </button>
                </div>
                <div className={"flex items-start justify-between mt-4"}>
                    <input checked className="form-check-input" type="checkbox" value="" id="check"/>
                    <div className={"mx-2"}>
                        <p>1. PGI.BLD.Lập, phê duyệt thực hiện quy chế kế tài chính của PGI để trình cổ đông xem xét phê duyệt</p>
                        <p className={"text-xs text-cbs-highlight-color"}>Ngô Trọng Quyền-CPMI</p>
                    </div>
                    <div className={"flex items-center justify-center px-4 py-1 rounded text-white bg-cbs-completed mr-6"}>
                        <img src={iconClock} alt={"----"} className={"mr-2"}/>
                        <span>17/2/22</span>
                    </div>
                    <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-2"}/>
                    <button className={"rounded w-[24px] h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                        <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                    </button>
                </div>

                <button className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4"}>
                    Thêm việc liên quan
                </button>
            </div>
        </div>
    )
}