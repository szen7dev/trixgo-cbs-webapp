import React, { FC } from "react";
import iconAssessment from "assets/images/icons8-assessments-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import demoSignature from "assets/images/demo-signature.png";
import { Task } from "typings/task";

type Props = {
    task: Task;
}

export const TaskDetailOpenedBidding: FC<Props> = ({ task }) => {
    if(!task.openedUsers || !task.openedUsers?.length) return <></>;

    return (
        <div className={"task-signature flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconAssessment} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-[16px] font-bold"}>Mở thầu</div>
                <div className={"mt-2 w-1/3"}>
                    {!!task.openedUsers?.length && task.openedUsers.map(item => (
                        <div key={item._id} className={"user-sign flex items-center mb-2"}>
                            <img alt={"----"} src={item?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"} />
                            <div className={"flex-1 ml-2"}>
                                <p>{item.bizfullname}</p>
                            </div>
                            <img
                                className={"h-[50px] object-contain"}
                                src={item?.signature ? `${process.env.REACT_APP_URL_S3_USER}/${item?.signature}` : demoSignature}
                                alt={item?.bizfullname}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}