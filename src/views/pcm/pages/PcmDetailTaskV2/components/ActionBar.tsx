import { FC, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import iconBack from "assets/images/icon-back-gray.svg";
import iconLinkCopy from "assets/images/icons8-link-96-v3.svg";
import { SendEmailNotification } from "./SendEmailNotification";
import iconCopy from "assets/images/icons8-copy-96.svg";
import iconPrint from "assets/images/icons8-print-96.svg";
// import iconRemove from "assets/images/icons8-remove-96.svg";
// import {SendToChat} from "./SendToChat";
// import iconMember from "assets/images/icons8-member-48-white.svg";
import { TaskHistoryLog } from "./TaskHistoryLog";
import { OtherActions } from "./OtherActions";
// import CollapseShow from "assets/images/CBS-Collapse-Show.svg";
// import CollapseHide from "assets/images/CBS-Collapse-Hide.svg";
import IconDownload from "assets/images/icons8-download-48_2.png";
import { Task } from "typings/task";
import { AddUserRelated } from "./AddUserRelated";
import { User } from "typings/user";
import { useModal } from "services/hooks/useModal";
import { ModalCloneTask } from "./ModalCloneTask";
import API from "apis/repository";
import { toast } from "react-toastify";

type Props = {
    handleCollapse?: () => void;
    checkAssigneeBid?: boolean;
    collapse?: boolean;
    task: Task;
    user: User | null;
    refetchTaskInfo: () => void;
}

export const ActionTaskDetailBar: FC<Props> = ({ task, user, refetchTaskInfo, handleCollapse, collapse }) => {
    const [activeCopyTextTooltip, setActiveCopyTextTooltip] = useState(false);
    const history = useHistory();

    const { openModal } = useModal();

    const copyLink = () => {
        const copyText = window.location.href;
        navigator.clipboard.writeText(copyText);
        setActiveCopyTextTooltip(true);
    }

    const mouseLeaveCopyTextButton = () => {
        setActiveCopyTextTooltip(false);
    }

    const handleDownloadFiles = async () => {
        try {
            toast.info('Quá trình download đang thực hiện, vui lòng không reload trang');

            const response = await API.get(
                `/api/subject_pcm/pcm_files/downloads?taskID=${task._id}`,
            );
            const { data, status } = response?.data;

            if (status !== 200) return;

            const a = document.createElement('a');
            a.href = data.Location;
            a.download = 'download';
            a.click();
            a.remove();
        } catch(error: any) {
            console.error(error);
            toast.error(error.message);
        }
    }

    if(!user) return null;

    return (
        <div className={"action-bar z-10 bg-white flex items-center px-2 py-1 border-primary-border sticky top-0"}>
            <div className={"flex items-center flex-1"}>
                <button
                    className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}
                    onClick={() => history.goBack()}
                >
                    <img src={iconBack} alt={"----"} className={"w-[18px]"} />
                </button>
                <button
                    onClick={copyLink}
                    onMouseOut={() => mouseLeaveCopyTextButton()}
                    className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3 relative"}>
                    <img src={iconLinkCopy} alt={"----"} className={"w-[18px]"} />
                    <div className={"absolute top-full bg-primary-gray p-2 rounded w-[170px] text-left text-white transition-all " + (activeCopyTextTooltip ? "visible opacity-100" : "invisible opacity-0")}>Đã sao chép đường liên kết</div>
                </button>
                {
                    (task.subtype == 4 && task.assignee._id.toString() == user?._id.toString()) ? <></> : <SendEmailNotification task={task} userId={user?._id} />
                }
                {
                    (task.subtype == 4 && task.assignee._id.toString() == user?._id.toString()) ? <></> :
                        <button
                            className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}
                            onClick={() =>
                                openModal(
                                    <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                                        <ModalCloneTask task={task} />
                                    </div>
                                )
                            }
                        >
                            <img src={iconCopy} alt={"----"} className={"w-[18px]"} />
                        </button>
                }

                {/* <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                    <img src={iconRemove} alt={"----"} className={"w-[18px]"}/>
                </button> */}
                <Link to={`/pcm/detail/${task._id}/print/1`}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                        <img src={iconPrint} alt={"----"} className={"w-[18px]"} />
                    </button>
                </Link>
                {/* <SendToChat/> */}
                {
                    (task.subtype == 4 && task.assignee._id.toString() == user?._id.toString()) ? <></> : <AddUserRelated task={task} onConfirmAddUserRelated={refetchTaskInfo} />
                }
                {
                    (task.subtype == 4) ? <></> : 
                    <button
                        onClick={handleDownloadFiles}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3 relative"}
                    >
                        <img src={IconDownload} alt={"----"} className={"w-[18px]"} />
                    </button>
                }
            </div>

            {/* <button onClick={() => {
                handleCollapse && handleCollapse()
            }} className={"flex items-center justify-center rounded bg-cbs-form-input-bg h-[36px] py-1 px-2 mx-3"}>
                <img src={CollapseShow} alt={"----"} className={"object-contain max-h-full " + (!collapse ? "hidden" : "block")} />
                <img src={CollapseHide} alt={"----"} className={"object-contain max-h-full " + (collapse ? "hidden" : "block")} />
                <div>
                    {
                        collapse ? "Mở rộng" : "Thu gọn"
                    }
                </div>
            </button> */}
            {/* <TaskHistoryLog/> */}
            {
                (task.subtype == 4) ? <></> :
                <TaskHistoryLog task={task} userId={user?._id} refetchTaskInfo={refetchTaskInfo}/>
            }
            {/* <button className={"rounded bg-cbs-green-medium h-[36px] text-white flex items-center justify-center px-3 mx-3"}>
                <img src={iconMember} alt={"----"} className={"w-[24px] mr-2"}/>
                <span>Chia sẻ</span>
            </button> */}
            <OtherActions task={task} userId={user?._id} refetchTaskInfo={refetchTaskInfo} />
        </div>
    )
}