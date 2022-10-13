import { FC, useRef, useState } from "react";
import moment from "moment";
import iconAddGroup from "assets/images/icons8-add-user-group-man-man-64.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconChat from "assets/images/icons8-chat-96 1.svg";
import iconTrash from "assets/images/icons8-delete-96 1.svg";
import { Task } from "typings/task";
import { User } from "typings/user";
import { ModalUpdateTaskAssignee } from './ModalUpdateTaskAssignee';
import { Popover } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import useModalPcm from "views/pcm/hooks/useModal";
import ModalViewUsersRelated from "../../PcmDetailTask/components/Modal/ModalViewUsersRelated";

type Props = {
    task: Task;
    user: User | null;
    refetchInfo: () => void;
}

const useStyles = makeStyles({
    popover: {
        pointerEvents: "none"
    },
    popoverContent: {
        pointerEvents: "auto"
    }
});

export const TaskDetailMember: FC<Props> = ({ task, user, refetchInfo }) => {

    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);

    const classes = useStyles();

    const popoverEnter = () => {
        setOpenedPopover(true);
    };

    const popoverLeave = () => {
        setOpenedPopover(false);
    };

    const [isShow, setIsShow] = useState(false);

    const [{ isShow: isShowModalUsersRelated }, {
        toggleModal,
        openAddUserRelation,
    }] = useModalPcm();

    const openModalUpdateAssignee = () => {
        const isAdmin = task.project?.admins?.includes?.(user?._id);
        if (isAdmin || task.draft === 1) {
            setIsShow(true);
        }
    }

    return (
        <div className={"task-member flex items-start mt-5"}>
            <span className={"mr-4"}>
                <img src={iconAddGroup} alt={'-----'} />
            </span>
            <div className={"flex-1"}>
                <div className={"text-primary-gray text-[16px] font-bold"}>Thành viên</div>
                <div className={"flex items-center mt-2"}>
                    <div className={"create-user flex items-center"}>
                        <img alt={"----"} src={task?.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.author?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] border-0.5 border-primary-border"}
                            ref={popoverAnchor}
                            aria-owns="mouse-over-popover"
                            aria-haspopup="true"
                            onMouseEnter={popoverEnter}
                            onMouseLeave={popoverLeave}
                        /> 
                        {/* popover */}
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.popoverContent
                            }}
                            open={openedPopover}
                            anchorEl={popoverAnchor.current}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
                        >
                            <div className="w-350">
                                <div>
                                    <div className="border-b-0.5 border-cbs-border	 flex gap-5 p-3 ">
                                        <div>
                                            <img alt={"----"} src={task?.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.author?.image}` : taskUserAvt} className={" rounded-full overflow-hidden h-[60px] w-[60px] min-h-[36px] min-w-[36px] max-h-[60px] max-w-[60px] mx-1"} />
                                        </div>
                                        <div>
                                            <div className="text-lg	">{task?.author?.fullname}</div>
                                            <div className="text-primary-gray">{task?.author?.email}</div>
                                            <div className="text-primary-gray">{task?.author?.phone}</div>
                                        </div>
                                    </div>
                                    <div className="flex py-2 px-3 items-center	justify-between	">
                                        <div className="text-cbs-primary bg-cbs-sub-primary rounded p-3">{task?.author?.position?.name}</div>
                                        <div className="flex gap-2 items-center	">
                                            {/* <a href=""><img src={iconChat} alt="" /></a>
                                            <a href=""><img src={iconTrash} alt="" /></a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover>

                        <div className={"flex-1 ml-2"}>
                            <p>{task.author?.bizfullname}</p>
                            <p className={"text-primary-gray text-xs"}>Tạo việc {moment(task.createAt).format('HH:mm DD/M/YYYY')}</p>
                        </div>
                    </div>
                    <div className={"assigned-user flex items-center ml-4 mr-4 cursor-pointer"} onClick={openModalUpdateAssignee}>

                        {
                            (task.viewedUsers?.map(vuser => vuser._id).includes?.(task.assignee?._id)) ?
                                <img title="Đã truy cập công việc" src={task?.assignee?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.assignee?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] border-0.5 border-primary-border border-2 border-pink-600"} 
                                /> :
                                <img alt={"----"} src={task?.assignee?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task?.assignee?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] border-0.5 border-primary-border"} 
                                />
                        }

                        <div className={"flex-1 ml-2"}>
                            <p>{task.assignee?.bizfullname}</p>
                            <p className={"text-primary-gray text-xs"}>Người thực hiện</p>
                        </div>
                    </div>
                    <ModalUpdateTaskAssignee
                        task={task}
                        isShow={isShow}
                        onClose={() => setIsShow(false)}
                        onConfirm={refetchInfo}
                    />

                    {
                        (task.subtype == 4 && task.assignee._id.toString() == user?._id.toString()) ?  <></> :
                        <div
                            className={"flex items-center flex-1 justify-start cursor-pointer"}
                            onClick={openAddUserRelation}
                        >
                            {!!task.related?.length && task.related.slice(0, 10).map(item => (
                              (task.viewedUsers?.map(vuser=>vuser._id).includes?.(item._id)) ? <img title={item.bizfullname+" - Đã truy cập công việc"} key={item._id} alt={"----"} src={item?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 border-0.5 border-primary-border border-2 border-pink-600"} />  : <img title={item.bizfullname} key={item._id} alt={"----"} src={item?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 border-0.5 border-primary-border"} />
                            ))}

                            <ModalLarge
                                show={isShowModalUsersRelated}
                                toggle={toggleModal}
                                className="inline-flex flex-col text-black w-[500px] my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
                            >
                                <ModalViewUsersRelated task={task} toggle={toggleModal} />
                            </ModalLarge>

                            {task.related?.length > 16 && (
                                <div className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                                    {task.related?.length - 15}+
                                </div>
                            )}
                            {/* <button className={"text-xl rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                                +
                            </button> */}
                            </div>
                    }
                </div>
                {/*UI DEMO*/}
                {/* <div className={"flex items-center flex-wrap mt-2"}>
                    {
                        [...Array(10)].map((e, i) => (
                            <img key={i} alt={"----"} src={taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mr-2 border-0.5 border-primary-border"} />
                        ))
                    }
                    <div className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mr-2 bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                        10+
                    </div>
                    <button className={"text-xl rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] bg-cbs-form-input-bg border-0.5 border-primary-border flex items-center justify-center text-primary-gray"}>
                            +
                    </button>
                </div> */}
            </div>
        </div>
    )
}