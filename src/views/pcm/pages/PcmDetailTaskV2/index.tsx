import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';

import { ActionTaskDetailBar } from "./components/ActionBar";
import { TaskDetailTitle } from "./components/TaskTitle";
import { TaskDetailFolder } from "./components/TaskDetailFolder";
import { TaskDetailCompleteStatus } from "./components/TaskDetailCompleteStatus";
import { TaskDetailMember } from "./components/TaskDetailMember";
import { TaskDetailSignature } from "./components/TaskDetailSignature";
import { TaskDetailDescription } from "./components/TaskDetailDescription";
import { TaskDetailSubtask } from "./components/TaskDetailSubtask";
import { TaskDetailRelatedTask } from "./components/TaskDetailRelatedTask";
import { TaskDetailComment } from "./components/TaskDetailComment";
import { useTask } from 'services/hooks/useTask';
import { Loader } from "shareComponents/common";
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';
import { toast } from "react-toastify";
import { useAuth } from "services/hooks/auth/useAuth";
import { TaskDetailOpenedBidding } from "./components/TaskDetailOpenedBidding";
import { calculateExpireTime } from 'utils/time';

const PcmDetailTaskV2: FC = () => {
    const [collapse, setCollapse] = useState(false);
    const [permissions, setPermissions] = useState({
        hasPermissionUpdateTask: false,
        hasPermissionAddSignature: false,
        hasPermissionAddRelatedUser: false,
        hasPermissionViewRelatedUser: false,
        hasPermissionCreatorAddFile: false,
        hasPermissionAssigneeAddFile: false,
        hasPermissionViewCreatorFile: false,
        hasPermissionViewAssigneeFile: false,
        hasPermissionCreateRelatedResponse: false,
        hasPermissionViewRelatedResponse: false,
        hasPermissionCreateComment: false,
        hasPermissionViewComment: false,
        hasPermissionCreateCheckListAndChildTask: false,
        hasPermissionViewCheckList: false,
        hasPermissionViewChildTask: false,
        hasPermissionOpenBidding: false,
        hasPermissionViewBidding: false,
    });

    const { id: taskId } = useParams<{ id: string }>();

    const history = useHistory();
    const { user } = useAuth();

    const { info: taskInfo, isLoadingInfo, refetchInfo, updateStatusMultipleAsync } = useTask({
        params: {
            taskID: taskId
        },
        isFetchInfo: true
    });

    useEffect(() => {
        (async () => {
            await updateStatusMultipleAsync({
                taskIDs: [taskId],
                option: 1
            });
        })()
    }, [])

    useEffect(() => {
        if (taskInfo?.message === "permission_denied") {
            toast.warn('Bạn không có quyền truy cập công việc này');
            return history.push(`/pcm/home`);
        }
    }, [taskInfo?.message]);

    useEffect(() => {
        if (!taskInfo || !user) return;

        const {
            subtype, actualFinishTime, openedUsers,
            author, assignee, related, group
        } = taskInfo;

        const relatedsID = related?.map((user: any) => user._id) ?? [];
        const authorAndAssigneeID = [author?._id, assignee?._id].filter(Boolean);
        const groupMembersID = group?.members?.map(user => user._id) ?? [];
        const authorAndAssigneeAndRelatedID = [...authorAndAssigneeID, ...relatedsID].filter(Boolean);

        /**
         * Phân quyền theo phân loại
         * 4: Lựa chọn đấu thầu
         * default: Các loại còn lại
         */
        switch (subtype) {
            case 4: {
                const diff = calculateExpireTime(Date.now(), actualFinishTime, 'days', false);
                let allUsersRelatedIsOpenBidding = false;

                if (openedUsers && relatedsID.length === openedUsers.length) {
                    allUsersRelatedIsOpenBidding = openedUsers.every((user: any) => relatedsID.includes(user._id));
                }

                if (!allUsersRelatedIsOpenBidding) {
                    const hasPermissionUpdateTask = author?._id === user?._id;
                    const hasPermissionAddSignature = assignee?._id === user?._id;

                    const hasPermissionAddRelatedUser = author?._id === user?._id;
                    const hasPermissionViewRelatedUser = [author?._id, ...relatedsID].includes(user?._id);

                    const hasPermissionAssigneeAddFile = assignee?._id === user?._id;
                    const hasPermissionCreatorAddFile = author?._id === user?._id;
                    const hasPermissionViewAssigneeFile = assignee?._id === user?._id;
                    const hasPermissionViewCreatorFile = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);
                    const hasPermissionViewRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateComment = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);
                    const hasPermissionViewComment = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateCheckListAndChildTask = false;
                    const hasPermissionViewCheckList = false;
                    const hasPermissionViewChildTask = false;
                    const hasPermissionOpenBidding = relatedsID.includes(user?._id);
                    const hasPermissionViewBidding = [author?._id, ...relatedsID].includes(user?._id);

                    const dataPermissions = {
                        hasPermissionUpdateTask,
                        hasPermissionAddSignature,
                        hasPermissionAddRelatedUser,
                        hasPermissionViewRelatedUser,
                        hasPermissionCreatorAddFile,
                        hasPermissionAssigneeAddFile,
                        hasPermissionViewCreatorFile,
                        hasPermissionViewAssigneeFile,
                        hasPermissionCreateRelatedResponse,
                        hasPermissionViewRelatedResponse,
                        hasPermissionCreateComment,
                        hasPermissionViewComment,
                        hasPermissionCreateCheckListAndChildTask,
                        hasPermissionViewCheckList,
                        hasPermissionViewChildTask,
                        hasPermissionOpenBidding,
                        hasPermissionViewBidding,
                    }

                    // Trước deadline
                    if (diff > 0) {
                        setPermissions({
                            ...dataPermissions,
                            hasPermissionOpenBidding: false,
                            hasPermissionViewBidding: false,
                        });
                    }

                    // Sau deadline
                    if (diff === 0 || diff < 0) {
                        setPermissions(dataPermissions);
                    }

                } else { // Sau deadline + tất cả người liên quan đã mở thầu
                    const hasPermissionUpdateTask = false;
                    const hasPermissionAddSignature = assignee?._id === user?._id;

                    const hasPermissionAddRelatedUser = author?._id === user?._id;
                    const hasPermissionViewRelatedUser = [author?._id, ...relatedsID].includes(user?._id);

                    const hasPermissionCreatorAddFile = author?._id === user?._id;
                    const hasPermissionAssigneeAddFile = assignee?._id === user?._id;
                    const hasPermissionViewCreatorFile = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);
                    const hasPermissionViewAssigneeFile = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);
                    const hasPermissionViewRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateComment = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);
                    const hasPermissionViewComment = authorAndAssigneeAndRelatedID.includes(user?._id) || groupMembersID.includes(user?._id);

                    const hasPermissionCreateCheckListAndChildTask = false;
                    const hasPermissionViewCheckList = false;
                    const hasPermissionViewChildTask = false;
                    const hasPermissionOpenBidding = relatedsID.includes(user?._id);
                    const hasPermissionViewBidding = [author?._id, ...relatedsID].includes(user?._id);

                    setPermissions({
                        hasPermissionUpdateTask,
                        hasPermissionAddSignature,
                        hasPermissionAddRelatedUser,
                        hasPermissionViewRelatedUser,
                        hasPermissionCreatorAddFile,
                        hasPermissionAssigneeAddFile,
                        hasPermissionViewCreatorFile,
                        hasPermissionViewAssigneeFile,
                        hasPermissionCreateRelatedResponse,
                        hasPermissionViewRelatedResponse,
                        hasPermissionCreateComment,
                        hasPermissionViewComment,
                        hasPermissionCreateCheckListAndChildTask,
                        hasPermissionViewCheckList,
                        hasPermissionViewChildTask,
                        hasPermissionOpenBidding,
                        hasPermissionViewBidding,
                    })
                }

                break;
            }
            default: {
                const hasPermissionUpdateTask = author?._id === user?._id;
                const hasPermissionAddRelatedUser = authorAndAssigneeID.includes(user?._id);
                const hasPermissionCreatorAddFile = author?._id === user?._id;
                const hasPermissionAssigneeAddFile = assignee?._id === user?._id;

                const hasPermissionCreateCheckListAndChildTask = authorAndAssigneeID.includes(user?._id);
                const hasPermissionCreateRelatedResponse = authorAndAssigneeAndRelatedID.includes(user?._id)
                const hasPermissionCreateComment = [...authorAndAssigneeAndRelatedID, ...groupMembersID].includes(user?._id);

                setPermissions({
                    hasPermissionUpdateTask,
                    hasPermissionAddSignature: true,
                    hasPermissionAddRelatedUser,
                    hasPermissionViewRelatedUser: true,
                    hasPermissionCreatorAddFile,
                    hasPermissionAssigneeAddFile,
                    hasPermissionViewCreatorFile: true,
                    hasPermissionViewAssigneeFile: true,
                    hasPermissionCreateRelatedResponse,
                    hasPermissionViewRelatedResponse: true,
                    hasPermissionCreateComment,
                    hasPermissionViewComment: true,
                    hasPermissionCreateCheckListAndChildTask,
                    hasPermissionViewCheckList: true,
                    hasPermissionViewChildTask: true,
                    hasPermissionOpenBidding: false,
                    hasPermissionViewBidding: false,
                })
                break;
            }
        }
    }, [taskInfo]);

    const handleCollapse = () => {
        setCollapse(!collapse);
    }

    if (isLoadingInfo) {
        return <Loader className="border-primary" />
    }

    return (
        <div className={"task-detail"}>
            <ActionTaskDetailBar
                collapse={collapse}
                handleCollapse={handleCollapse}
                refetchTaskInfo={refetchInfo}
                task={taskInfo}
            />
            <div className={"task-content p-4"}>
                <div className={collapse ? "hidden" : "block"}>
                    <TaskDetailTitle task={taskInfo} />
                    <TaskDetailFolder
                        task={taskInfo}
                        user={user}
                        onConfirmSign={refetchInfo}
                        onOpenBidding={refetchInfo}
                        hasPermissionAddSignature={permissions.hasPermissionAddSignature}
                        hasPermissionOpenBidding={permissions.hasPermissionOpenBidding}
                    />
                    <TaskDetailCompleteStatus task={taskInfo} />
                    <TaskDetailMember task={taskInfo} />
                    <TaskDetailSignature task={taskInfo} />
                    <TaskDetailOpenedBidding task={taskInfo} />
                    <TaskDetailDescription task={taskInfo} refetchInfo={refetchInfo} />
                    <TaskDetailSubtask task={taskInfo} />
                    <TaskDetailRelatedTask task={taskInfo} refetchInfo={refetchInfo} />
                </div>
                <CommentProvider>
                    <TaskDetailComment task={taskInfo} userId={user?._id} refetchInfo={refetchInfo} />
                </CommentProvider>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2