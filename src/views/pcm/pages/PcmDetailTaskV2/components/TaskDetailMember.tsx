import React, {FC} from "react";
import iconAddGroup from "assets/images/icons8-add-user-group-man-man-64.svg";
import taskUserAvt from "assets/images/task-user.svg";

export const TaskDetailMember:FC = () => {
    return (
        <div className={"task-member flex items-start mt-8"}>
                    <span className={"mr-4"}>
                        <img src={iconAddGroup} alt={'-----'}/>
                    </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-lg font-bold"}>Thành viên</div>
                <div className={"flex items-center mt-2"}>
                    <div className={"create-user flex items-center"}>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                        <div className={"flex-1 ml-2"}>
                            <p>Trương Văn Doanh-DSP</p>
                            <p className={"text-primary-gray text-xs"}>Tạo việc 15:00 20/2/2022</p>
                        </div>
                    </div>
                    <div className={"assigned-user flex items-center ml-4"}>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}/>
                        <div className={"flex-1 ml-2"}>
                            <p>Trương Văn Doanh-DSP</p>
                            <p className={"text-primary-gray text-xs"}>Người thực hiện</p>
                        </div>
                    </div>
                    <div className={"flex items-center flex-1 justify-end"}>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1"}/>

                        <div className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                            15+
                        </div>
                        <button className={"text-xl rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}