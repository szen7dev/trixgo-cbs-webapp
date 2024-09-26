import React, { FC } from "react";
import iconAssessment from "assets/images/icons8-assessments-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import demoSignature from "assets/images/demo-signature.png";
import { Task } from "typings/task";
import moment from "moment";
import { Popover } from "@mui/material";

type Props = {
    task: Task;
}

export const TaskDetailSignature: FC<Props> = ({ task }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <div className={"task-signature flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconAssessment} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-[16px] font-bold"}>Ký xác nhận</div>
                <div className={"mt-2 w-1/3"}>
                    {!!task.signatures?.length && task.signatures.map(item => (
                        <div key={item._id} className={"user-sign flex items-center mb-2"}>
                            <img alt={"----"} src={item.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.author?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px]"}
                                aria-owns={open ? "mouse-over-popover" : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            />
                            <div className={"flex-1 ml-2"}>
                                <p>{item.author?.fullname}</p>
                                <p className={"text-primary-gray text-xs"}>
                                    {moment(item.createAt).format('HH:mm DD/M/YYYY')} ({moment(item.createAt).fromNow()})
                                </p>
                            </div>
                            <img
                                className={"h-[50px] object-contain"}
                                src={item.author?.signature ? `${process.env.REACT_APP_URL_S3_USER}/${item.author?.signature}` : demoSignature}
                                alt={item.author?.fullname}
                            />
                        </div>
                    ))}
                    {/* popover */}
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: "none"
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        PaperProps={{ onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose }}
                    >
                        <div className="w-350">
                            <div>
                                <div className="border-b-0.5 border-cbs-border	 flex gap-5 p-3 ">
                                    <div>
                                        <img alt={"----"} src={task?.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.author?.image}` : taskUserAvt} className={" rounded-full overflow-hidden h-[60px] w-[60px] min-h-[36px] min-w-[36px] max-h-[60px] max-w-[60px] mx-1"} />
                                    </div>
                                    <div>
                                        <div className="text-lg	">Người ký</div>
                                        <div className="text-primary-gray">{task?.author?.email}</div>
                                        <div className="text-primary-gray">{task?.author?.phone}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
}