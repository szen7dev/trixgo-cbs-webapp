import React, { FC } from "react";
import iconAssessment from "assets/images/icons8-assessments-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import demoSignature from "assets/images/demo-signature.png";
import { Task } from "typings/task";
import moment from "moment";

type Props = {
    task: Task;
}

export const TaskDetailSignature: FC<Props> = ({ task }) => {
    return (
        <div className={"task-signature flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconAssessment} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-lg font-bold"}>Ký xác nhận</div>
                <div className={"mt-2 w-1/3"}>
                    {!!task.signatures?.length && task.signatures.map(item => (
                        <div key={item._id} className={"user-sign flex items-center mb-2"}>
                            <img alt={"----"} src={item.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.author?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"} />
                            <div className={"flex-1 ml-2"}>
                                <p>{item.author?.bizfullname}</p>
                                <p className={"text-primary-gray text-xs"}>
                                    {moment(item.createAt).format('HH:mm DD/M/YYYY')} ({moment(item.createAt).fromNow()})
                                </p>
                            </div>
                            <img
                                className={"h-[50px] object-contain"}
                                src={item.author?.signature ? `${process.env.REACT_APP_URL_S3_USER}/${item.author?.signature}` : demoSignature}
                                alt={item.author?.bizfullname}
                            />
                        </div>
                    ))}

                    {/* <div className={"user-sign flex items-center mb-2"}>
                        <img alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"} />
                        <div className={"flex-1 ml-2"}>
                            <p>Trương Văn Doanh-DSP</p>
                            <p className={"text-primary-gray text-xs"}>15:00 20/2/2022 (cách đây 2 ngày)</p>
                        </div>
                        <img className={"h-[50px] object-contain"} src={demoSignature} alt={"----"} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}